import { Router } from "express";
import { addProject, deleteProject, updateProject,  } from "../controllers/project.js";

export const projectRouter = Router()

projectRouter.post('/projects',addProject)
projectRouter.patch('/projects', updateProject)
projectRouter.delete('/projects',deleteProject)