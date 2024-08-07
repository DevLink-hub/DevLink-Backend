import { Router } from "express"
import { addEducation, deleteEducation, getEducation, updateEducation } from "../controllers/education.js";




export const educationRoute = Router();

educationRoute.post('/education',addEducation)
educationRoute.get('/education',getEducation)
educationRoute.patch('/education/:educationId',updateEducation)
educationRoute.delete('/education/:educationId',deleteEducation)