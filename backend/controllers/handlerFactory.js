const catchAsync = require('../others/catchAsync');

exports.createOne = Model =>  catchAsync( async (req,res,next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: "success",
        data : doc
    });
    next();
});

exports.getAll = Model =>  catchAsync( async (req,res,next) => {
    const docs = await Model.find();
    res.status(200).json({
        status: "success",
        data : docs
    });
    next();
});

exports.getOne = Model =>  catchAsync( async (req,res,next) => {
    const doc = await Model.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data : doc
    });
    next();
});

exports.deleteOne = Model =>  catchAsync( async (req,res,next) => {
    await Model.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status : "success",
        data : null
    });
});

exports.updateOne = Model =>  catchAsync ( async (req,res,next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    });
    res.status(200).json({
        status: "success",
        data : doc
    });
});