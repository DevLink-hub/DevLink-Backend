import { Router } from "express";
import { addFreelancer, deleteFreelancer, getAllFreelancers, getFreelancerProfile, updateFreelancer} from "../controllers/freelancerContoller.js";
import { remoteUploads } from "../middleware/Devuploads.js";
import { isAuthenticated } from "../middleware/auth.js";

export const freelancerRouter= Router();


freelancerRouter.post('/freelancers/me',isAuthenticated,remoteUploads.fields([
    { name: "coverPhoto", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
]),addFreelancer);
freelancerRouter.patch('/freelancers/me',isAuthenticated,remoteUploads.fields([
    { name: "coverPhoto", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
]),updateFreelancer);
freelancerRouter.delete('/freelancers/me',isAuthenticated,deleteFreelancer)
freelancerRouter.get('/freelancers',getAllFreelancers)
freelancerRouter.get('/freelancers/me',isAuthenticated,getFreelancerProfile)

// freelancerRouter.get('/freelancers/filter', filterFreelancers);


