const jobs = require('./job.controllers')

module.exports = function(router) {
    router.post('/job/', jobs.create);
    router.post('/job/:name/', jobs.create);
    router.get('/job/:id', jobs.findOne);
    router.get('/job/', jobs.findAll);
    router.delete('/job/:id', jobs.delete);
    router.delete('/job/', jobs.deleteAll);
    router.get('/job/:id/model', jobs.downloadModel );
    router.get('/job/:id/samples', jobs.downloadSamples);
    router.get('/job/:id/mcmc_diagnostics',);
}