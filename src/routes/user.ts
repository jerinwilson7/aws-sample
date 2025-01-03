import { Request, Response } from "express";

const express = require('express');
const userRouter = express.Router()


userRouter.get('/',(req:Request,res:Response)=>{
    res.send('You just created a user')
}) 

export default userRouter;