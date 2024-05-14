var express = require('express');
var router = express.Router()

const User = require('../models/users');

exports.addUser = async (data) => {
    try {
        const newUser = await User.query().insert(data);
        return User.query();
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

