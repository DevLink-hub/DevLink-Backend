import { Router } from "express";
import { addWorkExp, deleteWorkExp, updateWorkExp } from "../controllers/workExperience.js";


export const workExpRouter = Router();

workExpRouter.post('/workExperience',addWorkExp)
workExpRouter.patch('/workExperience/:workExpId',updateWorkExp)
workExpRouter.delete('/workExperience/:workExpId',deleteWorkExp)