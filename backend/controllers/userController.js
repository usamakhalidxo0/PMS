const User = require('../models/User');
const catchAsync = require('../others/catchAsync');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const CustomError = require('../others/CustomError');
const crypto = require('crypto');
const sendMail = require('../others/email');

exports.signUp = catchAsync( async (req,res,next) => {
    if(req.body.password && (req.body.password = req.body.passwordConfirm)){
        const user = await User.create(req.body);
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET);
        res.cookie('jwt',token,{
            httpOnly:true,
            maxAge:90*24*60*60*1000
        });
        res.status(201).json({
            status:'success',
            message:'Signed Up!',
            user
        });
        next();
    }
    else next(new CustomError("Couldn't sign up. Please check your data!"));
});

exports.getMe = catchAsync(async function(req,res,next) {
    if(req.user){
        res.status(200).json({
            status:"success",
            user:req.user
        });
        next();
    }
});

exports.authorize = catchAsync( async (req,res,next) => {
    let token;
    if(req.cookies && req.cookies.jwt)
        token = req.cookies.jwt;
    if(token){
        const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        const user = await User.findById(decode.id);
        if(user){
            req.user = user;
        }
    }
    next();
});

exports.loggedIn = catchAsync(async function(req,res,next){
    if(req.user)
    next();
    else next(new CustomError('Not logged in!',404));

})

exports.signIn = catchAsync( async (req, res, next) => {
    const user = await User.findOne({email:req.body.email}).select(`+password`);
    if(req.body.password && user && await user.correctPassword(req.body.password)){
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET);
        res.cookie('jwt', token, {
            httpOnly:true,
            maxAge:90*24*60*60*1000
        });
        res.status(200).json({
            status: "success",
            message: 'Signed In!'
        })
    }
    else next(new CustomError('user not found'));
});

exports.logOut = catchAsync( async function(req,res,next) {
    res.cookie('jwt', '', {
        httpOnly:true
    }).status(203).send('logged out!');
    next();
});

exports.forgotPassword=catchAsync(async function(req,res,next){
    const user = await User.findOne({email:req.body.email});
    if(user){
        const token = user.forgotPassword();
        await sendMail(req.body.email,token);
        user.save();
        res.status(200).send('token generated');
    }
    else next(new CustomError('User not Found!',404))
});

exports.passwordReset = catchAsync(async function(req,res,next){
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({email:req.params.email});
    if(user){
     if( user.passwordResetToken === hashedToken && Date.parse(user.passwordResetExpire) > Date.now()){
        if(req.body && req.body.password === req.body.passwordConfirm){
        user.passwordResetToken=null;
        user.passwordResetExpire=null;
        user.password=req.body.password;
        user.save();
        res.status(200).send('Password Updated!')
        }
        else next(new CustomError(`Passwords don't match or not provided!`))
     }
     else next(new CustomError(`Invalid or expired token!`))
    }
    else next(new CustomError(`User not found!`))
})