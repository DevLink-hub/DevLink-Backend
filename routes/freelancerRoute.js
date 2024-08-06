import { Router } from "express";
import { addFreelancer, deleteFreelancer, getAllFreelancers, getFreelancerProfile, updateFreelancer} from "../controllers/freelancerContoller.js";
import { remoteUploads } from "../middleware/Devuploads.js";

export const freelancerRouter= Router();


freelancerRouter.post('/freelancer/me',remoteUploads.fields([
    { name: "coverPhoto", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
]),addFreelancer);
freelancerRouter.patch('/freelancers/me',remoteUploads.fields([
    { name: "coverPhoto", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
]),updateFreelancer);
freelancerRouter.delete('/freelancer/me',deleteFreelancer)
freelancerRouter.get('/freelancers',getAllFreelancers)
freelancerRouter.get('/freelancers/me',getFreelancerProfile)

// freelancerRouter.get('/freelancers/filter', filterFreelancers);


