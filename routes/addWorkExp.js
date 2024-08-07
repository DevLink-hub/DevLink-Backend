import { Router } from "express";
import { addWorkExp, deleteWorkExp, getWorkExp, updateWorkExp } from "../controllers/workExperience.js";


export const workExpRouter = Router();

workExpRouter.post('/workExperience',addWorkExp)
workExpRouter.get('/workExperience',getWorkExp)
workExpRouter.patch('/workExperience/:workExpId',updateWorkExp)
workExpRouter.delete('/workExperience/:workExpId',deleteWorkExp)