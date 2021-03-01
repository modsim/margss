const jobs = require('./job.controllers')

module.exports = function(router) {
    /**
     * @route POST /api/job
     * @returns {object} 200 - JSON object with ID of job created
     */
    router.post('/job/', jobs.create);

    /**
     * @route POST /api/job/:name
     * @param {string} name - name for new job
     * @returns {object} 200 - JSON object with ID of job created
     */
    router.post('/job/:name', jobs.create);

    /**
     * @route GET /api/job/:id
     * @param {string} id - id of job
     * @returns {object} 200 - JSON object with ID of job created
     */
    router.get('/job/:id', jobs.findOne);
    /**
     * @route GET /api/job
     * @param {string} id - id of job
     * @returns {object} 200 - JSON object with list of jobs
     */

    router.get('/job/', jobs.findAll);

    /**
     * @route DELETE /api/job
     * @returns {object} 200 - JSON object with list of deleted jobs
     */
    router.delete('/job/', jobs.deleteAll);

    /**
     * @route DELETE /api/job/:id
     * @returns {object} 200 - JSON object with id of deleted job
     */
    router.delete('/job/:id', jobs.delete);

    /**
     * @route GET /api/job/:id/model
     * @param {string} id - job-id
     * @returns {object} 200 - File download of rounded model
     */
    router.get('/job/:id/model', jobs.downloadModel );

    /**
     * @brief Downloads samples
     * @route GET /api/job/:id/samples
     * @param {string} id - job-id
     * @returns {object} 200 - File download of samples
     */
    router.get('/job/:id/samples', jobs.downloadSamples);
}
