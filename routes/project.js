import { Router } from "express";
import { addProject, deleteProject, getProjects, updateProject,  } from "../controllers/project.js";
import { remoteUploads } from "../middleware/Devuploads.js";

export const projectRouter = Router()

projectRouter.post('/projects',remoteUploads.single('image'),addProject)
projectRouter.get('/projects',getProjects)
projectRouter.patch('/projects',remoteUploads.single('image'), updateProject)
projectRouter.delete('/projects',deleteProject)