import { Router } from "express";
import { addWorkExp, deleteWorkExp, updateWorkExp } from "../controllers/workExperience.js";


export const workExpRouter = Router();

workExpRouter.post('/freelancer/workExperience',addWorkExp)
workExpRouter.patch('/freelancer/workExperience/:workExpId',updateWorkExp)
workExpRouter.delete('/freelancer/workExperience/:workExpId',deleteWorkExp)