var express = require('express');
var router = express.Router();
const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');

let Task = require('../models/tasks');
let User = require('../models/users');

// Get task by user id
router.get('/tasks/:userid?', async function (req, res, next) {
  try {
    let allUsers = await User.query();
    let tasks;
    if (req.params.userid) {
      tasks = await Task.query().where('UserID', req.params.userid);
    } else {
      tasks = await Task.query();
    }
    res.status(200);
    res.render('tasks', { tasksList: tasks, usersList: allUsers });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.end();
  }
});

/* Add Task */
router.post('/add-tasks', async function (req, res, next) {
  let data = {
    TaskName: req.body.TaskName,
    TaskType: req.body.TaskType,
    UserID: req.body.userId
  };
  try {
    const newTask = await Task.query().insert(data);
    return res.redirect(`/tasks/${req.body.userId}`);
  } catch (error) {
    console.error('Error posting data:', error);
  }
});

// Download data as excel
router.get('/download', (req, res) => {
  const dataArray = tasks.map(row => [row.TaskName, row.TaskType, row.TaskType]);
  console.log("Excel ", dataArray);
  const ws = xlsx.utils.aoa_to_sheet([
    ['TaskName', 'TaskType', 'TaskType'],
    ...dataArray
  ]);

  // Create a new workbook
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet 1');

  // Generate a temp file path
  const directoryPath = path.join(__dirname, 'temp');
  const filePath = path.join(directoryPath, 'data.xlsx');

  // Ensure the directory exists
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  // Write the workbook to the file
  xlsx.writeFile(wb, filePath);

  // Send the file as downloadable attachment
  res.download(filePath, 'data.xlsx', () => {
    // Delete the temp file after download
    fs.unlinkSync(filePath);
  });
  res.redirect('/tasks');
});

module.exports = router;
