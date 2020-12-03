const Task = require('../models/Task');
const factory = require('./handlerFactory');
const catchAsync = require('../others/catchAsync');

exports.createTask = catchAsync( async (req,res,next) => {
    req.body.project = req.params.projectId;
    const doc = await Task.create(req.body);
    res.status(201).json({
        status: "success",
        data : doc
    });
    next();
});
exports.getTasks = catchAsync( async (req,res,next) => {
    const docs = await Task.find({project:req.params.projectId});
    res.status(200).json({
        status: "success",
        data : docs
    });
    next();
});
// exports.getTask = factory.getOne(Task);
exports.deleteTask = factory.deleteOne(Task);
exports.updateTask = factory.updateOne(Task);