const express = require('express');
const bodyParser = require('body-parser');

const placesRouter = require('./routes/places-routes');

const app = express();

app.use(placesRouter);

app.listen(5000);