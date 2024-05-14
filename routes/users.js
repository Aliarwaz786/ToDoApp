var express = require('express');
var router = express.Router();

let userController = require('../controllers/user.controllers');

// Get All Users
router.get('/', function (req, res, next) {
  userController.getUsers.then((users) => {
    res.status(200);
    res.render('users', { usersList: users });
  }).catch((err) => {
    res.status(500)
    res.end()
  });
});

// Add User
router.post('/add-user', function (req, res, next) {
  userController.addUser(req.body).then(data => {
    res.redirect('/');
    res.status(200);
  }).catch(err => {
    res.status(500);
    res.redirect('/');
    res.end();
  });
});

module.exports = router;
