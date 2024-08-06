import {login, signup, token,logout } from "../controllers/userController.js";
import { Router } from "express";



export const userRouter= Router();

// userRouter.get('/users/getUser', getUsers)
userRouter.post('/users/signup',signup);

userRouter.post('/users/login',login)
userRouter.post("/users/logout", logout);
userRouter.post('/users/token',token)

