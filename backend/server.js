const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const busboy = require('connect-busboy');
const log = require('morgan')('dev')
const jobRoutes = require('./job/job.routes');
const path = require('path')

const app = express();

app.use(cors());
app.use(busboy({highWaterMark: 4 * 1024 * 1024}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(log)
app.use(express.static(path.join(__dirname, 'views')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,  'views', 'index.html'));
});

const router = express.Router();
app.use('/api', router);
jobRoutes(router)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
