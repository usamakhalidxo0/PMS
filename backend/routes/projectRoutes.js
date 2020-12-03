const express = require('express');
const projectController = require('../controllers/projectController');
const taskRouter = require('./taskRoutes');
const userController = require('../controllers/userController');

const router = new express.Router();

router.use(userController.loggedIn);

router.use('/:projectId/tasks', taskRouter);

router
.route('/')
.get(projectController.getProjects)
.post(projectController.createProject);

router.route('/:id')
.get(projectController.getProject)
.patch(projectController.updateProject)
.delete(projectController.deleteProject);

module.exports = router;