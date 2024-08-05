const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {userCredentialsMid,userCredMid_Register,tokenVerifyMid} = require('./src/middlewares/middlewares');
const todoRouter = require('./src/routers/todo.router')
const registerRouter = require('./src/routers/register.router');
const loginRouter = require('./src/routers/login.router');
const logoutRouter = require('./src/routers/logout.router');
const isLoggedInRouter = require('./src/routers/isLoggedIn.router');
const db = require('./db');

const application = express();
application.use(express.json());

application.use(cors());


application.listen(process.env.PORT,() => {
  console.log('sever is started at 3000 port');
});
application.get('/', (req,res) => {
  res.send('You are present on home page');
});

application.use('/todo',tokenVerifyMid ,todoRouter);
application.use('/register',userCredMid_Register,registerRouter);
application.use('/login', userCredentialsMid,loginRouter);
application.use('/logout',logoutRouter);
application.use('/isLoggedIn',isLoggedInRouter);


