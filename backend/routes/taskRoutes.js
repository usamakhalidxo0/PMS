const express = require('express');
const taskController = require('../controllers/taskController');

const router = new express.Router();

router.route('/')
.get(taskController.getTasks)
.post(taskController.createTask);

router.route('/:id')
.delete(taskController.deleteTask)
.patch(taskController.updateTask);

module.exports = router;