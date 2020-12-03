const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err);
    process.exit(1);
  });

const DB = process.env.DATABASE;

mongoose
.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => console.log('DB connection successful!'));

const app = require('./app');

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`listening to port ${port}`);
})