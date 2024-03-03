const express =require("express");

const router =express.Router();
//import userRouter
const userRouter =require('./user')

router.use('/user' , userRouter);
//all the user requests go to userRouter(user.js)
module.exports= router;