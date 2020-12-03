const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRoutes');

const globalErrorHandler = require('./controllers/errorHandler');

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'build')));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.get('/*',function(req,res,next){
    if(process.env.NODE_ENV == 'PROD')
    res.sendFile(path.join(__dirname,'build/index.html'));
    
});

app.use(globalErrorHandler);

module.exports = app;