const { v4: uuidv4 } = require('uuid');
const {validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const { use } = require('../routes/users-routes');

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Marko Spasic',
        email: 'marko@gmail.com',
        password: 'marko123'
    }
];

// Not in vide
const getUserById = (req, res, next) => {
    const userId = req.params.uid; // { uid: u1}
    const user = DUMMY_USERS.find(u => {
        return u.id === userId;
    });

    if(!user){
        throw new HttpError('Could not find a user for the provided id.', 404);
    }

    res.json({user}); // => { user } => { user: user}
}

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS});
};

const signup = (req, res, next) => {
    const errors =  validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }

    const { name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if(hasUser){
        throw new HttpError('Could not create user. Email alredy exists', 422);
    }

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 404);
    }

    res.json({message: 'Logged in'});
}

exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;