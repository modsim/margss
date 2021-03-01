"use strict";
const url = require('url')
const fs = require('fs-extra');
const path = require('path');
const uuid = require('uuid-random');
const rimraf = require('rimraf')
const spawn = require('child_process');
const archiver = require('archiver');

const jobsPath = path.join(__dirname, '..', 'workspace', 'jobs');
fs.ensureDir(jobsPath)

exports.create = (req, res) => {
    const id = uuid();
    const createJobPath = path.join(__dirname, '..', 'workspace', 'jobs', id)
    fs.ensureDirSync(createJobPath)
    if (req.params.name) {
        fs.writeFileSync(path.join(createJobPath, 'name'), req.params.name)
    }
    fs.writeFileSync(path.join(createJobPath, 'status_running'))

    req.pipe(req.busboy);
    const job = {
        'model': '',
        'settings': ''
    }

    req.busboy.on('file', (field, file, filename) => {
        const pathToWriteFileTo = path.join(createJobPath, filename)
        if (field === 'settings') {
            job.settings = pathToWriteFileTo;
        }
        if (field === 'model') {
            job.model = pathToWriteFileTo;
        }
        const fstream = fs.createWriteStream(pathToWriteFileTo);
        file.pipe(fstream);
        fstream.on('close', () => {
        });
    });

    req.busboy.on('finish', () => {
        start_subprocesses(job, createJobPath).then();
        res.json({'message': `created job ${id} successfully`, 'id': id});
    })
}

exports.findAll = (req, res) => {
    const ids = fs.readdirSync(path.join(__dirname, '..', 'workspace', 'jobs'));
    const margss_url = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    })
    const jobs = ids.map(id => getDataForJobId(id, margss_url));
    res.json({
        'message': 'get all jobs',
        jobs
    });
}

exports.findOne = (req, res) => {
    const margss_url = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    })
    res.json({
        'message': `get ${req.params.id}`,
        'job': getDataForJobId(req.params.id, margss_url)
    });
}

exports.downloadSamples = (req, res) => {
    const sampleFile = path.join(__dirname, '..', 'workspace', 'jobs', req.params.id, 'samples.zip');
    res.download(sampleFile);
}

exports.downloadModel = (req, res) => {
    const sampleFile = path.join(__dirname, '..', 'workspace', 'jobs', req.params.id, 'model.hdf5');
    res.download(sampleFile);
}

exports.delete = (req, res) => {
    console.log('call delete');
    rimraf.sync(path.join(__dirname, '..', 'workspace', 'jobs', req.params.id));
    res.json({'message': 'deleted', 'id': req.params.id});
}

exports.deleteAll = (req, res) => {
    const ids = fs.readdirSync(path.join(__dirname, '..', 'workspace', 'jobs'));
    ids.forEach(id => rimraf.sync(path.join(__dirname, '..', 'workspace', 'jobs', id)));

    res.json({'message': 'deleted all jobs', ids});
}

async function start_subprocesses(job, createJobPath) {
    console.log('start subprocesses')
    const settings = await readJsonWhenAvailable(job.settings);
    const modelFile = job.model;
    const parsedModelPath = path.parse(modelFile);
    const preprocessModelFile = path.join(parsedModelPath.dir, "model.hdf5")
    const out = fs.openSync(path.join(parsedModelPath.dir, 'out.log'), 'a');
    const err = fs.openSync(path.join(parsedModelPath.dir, 'out.log'), 'a');

    console.log('spawning round process')
    fs.unlinkSync(path.join(createJobPath, 'status_running'))
    fs.createFileSync(path.join(createJobPath, 'status_running_PolyRound'))
    const round_process = spawn.spawn(
        'python3',
        [
            path.join(__dirname, '..', '..', 'polyround.py'),
            '-i',
            modelFile,
            '-o',
            preprocessModelFile
        ],
        {
            detached: true, stdio: ['ignore', out, err]
        }
    )

    round_process.on('close', code => {
            console.log(`finished PolyRound with code ${code}`);
            console.log('starting HOPS');
            fs.unlinkSync(path.join(createJobPath, 'status_running_PolyRound'))
            fs.createFileSync(path.join(createJobPath, 'status_running_HOPS'))
            console.log(path.join(__dirname, '..', '..', 'hops', 'cmake-build-release', 'bin', 'hops-sampler'))
            const sample_process = spawn.spawn(
                path.join(__dirname, '..', '..', 'hops', 'cmake-build-release', 'bin', 'hops-sampler'),
                [
                    '-i',
                    preprocessModelFile,
                    '-o',
                    path.join(parsedModelPath.dir, 'samples.hdf5'),
                    '-n',
                    settings.HOPS.numberOfSamples || 10001,
                    '-t',
                    settings.HOPS.thinning || 10,
                    '-p',
                    2
                ],
                {
                    detached: true, stdio: ['ignore', out, err]
                });

            sample_process.on('close', code => {
                const archive = archiver('zip');
                const stream = fs.createWriteStream(path.join(parsedModelPath.dir, 'samples.zip'));
                new Promise((resolve, reject) => {
                    archive.append(
                        fs.createReadStream(path.join(parsedModelPath.dir, 'chain_0_samples.hdf5')),
                        {name: 'chain_0_samples.hdf5'}
                    ).append(
                        fs.createReadStream(
                            path.join(parsedModelPath.dir, 'chain_1_samples.hdf5')
                        ),
                        {name: 'chain_1_samples.hdf5'}
                    ).pipe(stream);

                    stream.on('close', () => resolve());
                    archive.finalize();
                });
                console.log(`finished HOPS with code ${code}`);
                fs.unlinkSync(path.join(createJobPath, 'status_running_HOPS'))
                fs.createFileSync(path.join(createJobPath, 'status_running_diagnostics'))
                console.log(path.join(__dirname, '..', '..', 'hops', 'cmake-build-release', 'bin', 'hops-sampler'))
                const diagnostics_process = spawn.spawn(
                    'python3',
                    [
                        path.join(__dirname, '..', '..', 'diagnostics_hops.py'),
                        '-i',
                        parsedModelPath.dir
                    ],
                    {
                        detached: true, stdio: ['ignore', out, err]
                    });
                diagnostics_process.on('close', code => {
                    fs.unlinkSync(path.join(createJobPath, 'status_running_diagnostics'))
                    fs.createFileSync(path.join(createJobPath, 'status_done'))
                });
            })
        }
    );
}

async function readJsonWhenAvailable(jsonPath, iteration = 0) {
    console.log('waiting for ' + jsonPath)
    if (iteration > 300) {
        throw `JSON ${jsonPath} doesn't exist after 300 seconds.`
    }
    try {
        return await fs.readJsonSync(jsonPath);
    } catch (error) {
        console.log('error')
        console.log(error)
        await timeout(5000);
        return readJsonWhenAvailable(jsonPath, iteration++);
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDataForJobId(id, url = undefined) {
    const jobPath = path.join(__dirname, '..', 'workspace', 'jobs', id);
    let status = undefined;
    if (fs.existsSync(path.join(jobPath, 'status_done'))) {
        status = 'done';
    } else if (fs.existsSync(path.join(jobPath, 'status_running'))) {
        status = 'running';
    } else if (fs.existsSync(path.join(jobPath, 'status_running_PolyRound'))) {
        status = 'running PolyRound';
    } else if (fs.existsSync(path.join(jobPath, 'status_running_HOPS'))) {
        status = 'running HOPS';
    } else if (fs.existsSync(path.join(jobPath, 'status_running_diagnostics'))) {
        status = 'running diagnostics';
    }

    let name = undefined;
    if (fs.existsSync(path.join(jobPath, 'name'))) {
        name = fs.readFileSync(path.join(jobPath, 'name'), 'utf-8');
    }

    let diagnostics = "No diagnostics yet";
    if (fs.existsSync(path.join(jobPath, 'diagnostic_results'))) {
        diagnostics = fs.readFileSync(path.join(jobPath, 'diagnostic_results'))
        if (diagnostics <= 1.1) {
            diagnostics = 'Ok (PRSF=' + Math.round(diagnostics*1000)  / 1000 + ' <= 1.1)';
        } else {
            diagnostics = 'Not converged (PSRF=' + Math.round(diagnostics * 1000) / 1000 + ' <= 1.1)';
        }
    }

    return {
        'name': name || "no name",
        'ID': id,
        'status': status,
        'rounded_model': status === "running diagnostics" || status === "running HOPS" || status === "done" ? url + '/' + id + '/model' : "Model not preprocessed yet",
        'samples': status === "done" || status === 'running diagnostics' ? url + '/' + id + '/samples' : "No samples yet",
        'diagnostics': diagnostics
    }
}

