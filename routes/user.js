import {  getUsers, login, signup, token,logout ,getUser} from "../controllers/user.js";
import { Router } from "express";



export const userRouter= Router();

// userRouter.get('/users/getUser', getUsers)
userRouter.post('/users/signup',signup);
userRouter.get('/users/profile', getUser),

userRouter.post('/users/login',login)
userRouter.post("/users/logout", logout);
userRouter.post('/users/token',token)

