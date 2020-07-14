const express = require('express');
const bodyParser = require('body-parser');

const placesRouter = require('./routes/places-routes');
const usersRouter = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRouter); // => /api/places/...
app.use('/api/users', usersRouter); // => /api/users/...

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknow error occurred!'});
});

app.listen(5000);