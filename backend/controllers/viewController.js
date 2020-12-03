const catchAsync = require('../others/catchAsync');
const ejs = require('ejs');
const ip = require('ip');

exports.getRoot = catchAsync( async function (req,res,next) {
    res.render('hello', {ip:ip.address(), port: process.env.PORT});
    next();
});

exports.signUp = catchAsync( async function(req,res,next) {
    res.render('signUp');
    next();
})