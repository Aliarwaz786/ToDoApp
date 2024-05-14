var express = require('express');
var router = express.Router()

// Now you can use Objection models
const User = require('../models/users');

exports.getUsers = User.query().then(users => {
    return users
}).catch(err => {
    return err;
});

exports.addUser = async (data) => {
    try {
        const newUser = await User.query().insert(data);
        return User.query();
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

