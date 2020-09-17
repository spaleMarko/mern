const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', usersControllers.getUsers);
router.get('/:uid', usersControllers.getUserById); // Not in Video

router.post(
    '/signup',
    [
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail()   // Marko@gmail.com => marko@gmail.com
            .isEmail(),
        check('password')
        .isLength({min: 6})
    ],
    usersControllers.signup);

router.post('/login', usersControllers.login);

module.exports =  router;