import { Router } from "express"
import { addEducation, deleteEducation, updateEducation } from "../controllers/education.js";




export const educationRoute = Router();

educationRoute.post('/freelancer/education',addEducation)
educationRoute.patch('/freelancer/education/:educationId',updateEducation)
educationRoute.delete('/freelancer/education/:educationId',deleteEducation)