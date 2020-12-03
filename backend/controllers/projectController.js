const Project = require('../models/Project');
const catchAsync = require('../others/catchAsync');
const factory = require('./handlerFactory');

exports.createProject = catchAsync( async function(req,res,next) {
    req.body.owner = req.user._id;
    const doc = await Project.create(req.body);
    res.status(201).json({
        status: "success",
        data : doc
    });
    next();
});
exports.getProjects = catchAsync( async (req,res,next) => {
    const docs = await Project.find({owner:req.user._id});
    res.status(200).json({
        status: "success",
        data : docs
    });
    next();
});
exports.getProject = catchAsync( async (req,res,next) => {
    const doc = await Project.findById(req.params.id).populate('tasks');
    res.status(200).json({
        status: "success",
        data : doc
    });
    next();
});
exports.deleteProject = factory.deleteOne(Project);
exports.updateProject = factory.updateOne(Project);
