const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');
const { use } = require('../routes/users-routes');

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Marko',
        email: 'marko@gmail.com',
        password: 'marko123',
        image: 'add.jpg'
    }
];

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

exports.getUserById = getUserById;