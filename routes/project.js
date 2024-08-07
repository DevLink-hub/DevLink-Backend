import { Router } from "express";
import { addProject, deleteProject, getProjects, updateProject,  } from "../controllers/project.js";

export const projectRouter = Router()

projectRouter.post('/projects',addProject)
projectRouter.get('/projects',getProjects)
projectRouter.patch('/projects', updateProject)
projectRouter.delete('/projects',deleteProject)