// var express = require('express');
// var router = express.Router()

// const Task = require('../models/tasks');

// exports.getTasks = Task.query().then(tasks => {
//     return tasks
// }).catch(err => {
//     return err;
// });

// exports.addTask = async (data) => {
//     try {
//         const newTask = await Task.query().insert(data);
//         return Task.query();
//     } catch (error) {
//         console.error('Error posting data:', error);
//     }
// }