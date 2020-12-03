module.exports = (err,req,res,next) => {
    console.log(err);
    if (err.isOperational)
        res.status(err.statusCode).json({
            status:err.status,
            error:err.message
        });
    else res.status(500).json({
        status: 'error',
        error: "something went very wrong"
    });

    next();
}