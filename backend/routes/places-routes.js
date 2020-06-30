const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET PLACES');
    res.json({message: 'Work GET PLACES'});
});

module.exports =  router;