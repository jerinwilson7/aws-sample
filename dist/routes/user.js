"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const userRouter = express.Router();
userRouter.get('/', (req, res) => {
    res.send('You just created a user');
});
exports.default = userRouter;
