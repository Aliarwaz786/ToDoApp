var express = require('express');
var router = express.Router();
const fs = require('fs');
const xlsx = require('xlsx');

let taskController = require('../controllers/task.controllers');
let tasks = []

/* GET All Tasks */
router.get('/tasks', function (req, res, next) {
  taskController.getTasks.then((data) => {
    res.status(200);
    tasks = data;
    res.render('tasks', { tasksList: data });
  }).catch((err) => {
    res.status(500)
    res.end()
  });
});

/* Add Task */
router.post('/add-tasks', function (req, res, next) {
  let data = {
    TaskName: req.body.TaskName,
    TaskType: req.body.TaskType,
    UserID: 1
  };
  taskController.addTask(data).then(data => {
    res.redirect('/tasks');
    res.status(200);
  }).catch(err => {
    res.status(500);

    res.redirect('/tasks');
    res.end();
  });
});

// Download data as excel
router.get('/download', (req, res) => {
  const wb = xlsx.utils.book_new();
  console.log("Excel ", tasks);
  const ws = xlsx.utils.aoa_to_sheet(tasks);


  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

  const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

  res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.set('Content-Disposition', 'attachment; filename="table.xlsx"');

  res.send(buffer);
  res.redirect('/tasks');
});

module.exports = router;
