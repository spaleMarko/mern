const { v4: uuidv4 } = require('uuid');
const {validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const user = require('../models/user');

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Marko Spasic',
        email: 'marko@gmail.com',
        password: 'marko123'
    }
];

// Not in video
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

const getUsers = async (req, res, next) => {
    let users;
    try{
        users = await User.find({}, '-password'); // ({}, 'name email') // same
    }catch(err){
        const error = new HttpError(
            'Fetching users failde, please try again later', 500
        );
        return next(error);
    }

    res.json({users: users.map(user => user.toObject({getters: true}))});
};

const signup = async (req, res, next) => {
    const errors =  validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors);
        return  next(HttpError('Invalid inputs passed, please check your data', 422));
    }

    const { name, email, password, places} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    }catch(err){
        const error = new HttpError(
            'Signing up failed, please try again later', 500
        );
        return next(error);
    }

    if(existingUser){
        const error = new HttpError(
            'User exists already, please login instead', 422
        );
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxHWFss7T4f3QifjwCTUJ-VGqffPBBDI1VlQ&usqp=CAU',
        password,
        places
    });

    try{
        await createdUser.save();
    }catch(err){
        const error = new HttpError(
            'Signing up failed, please try again later', 500
        );
        return next(error);
    }

    res.status(201).json({user: createdUser.toObject({getters: true})});
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    }catch(err){
        const error = new HttpError(
            'Login in failed, please try again later', 500
        );
        return next(error);
    }

    if(!existingUser || existingUser.password !== password){
        const error = new HttpError(
            'Invalid credentials, could not log you in.', 401
        );
        return next(error);
    }

    res.json({message: 'Logged in'});
}

exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;