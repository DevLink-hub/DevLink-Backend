import { Router } from "express"
import { addEducation, deleteEducation, updateEducation } from "../controllers/education.js";




export const educationRoute = Router();

educationRoute.post('/education',addEducation)
educationRoute.patch('/education/:educationId',updateEducation)
educationRoute.delete('/education/:educationId',deleteEducation)