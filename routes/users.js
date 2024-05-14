var express = require('express');
var router = express.Router();

const User = require('../models/users');
let userController = require('../controllers/user.controllers');

// Get All Users
router.get('/', async function (req, res, next) {
  try {
    const users = await User.query();
    return res.render('users', { usersList: users });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.end();
  }
});

// Add User
router.post('/add-user', async function (req, res, next) {
  try {
    const data = await userController.addUser(req.body);
    return res.redirect('/');
  } catch (err) {
    res.status(500);
    return res.redirect('/');
  }
});

module.exports = router;
