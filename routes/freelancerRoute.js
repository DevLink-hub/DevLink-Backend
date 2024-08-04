import { Router } from "express";
import { addFreelancer, deleteFreelancer, updateFreelancer} from "../controllers/freelancerContoller.js";
import { remoteUploads } from "../middleware/Devuploads.js";

export const freelancerRouter= Router();


freelancerRouter.post('/freelancer/profile',remoteUploads.fields([
    { name: "coverPhoto", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
]),addFreelancer);
freelancerRouter.patch('/freelancer/profile/:freelancerId',remoteUploads.fields([
    { name: "coverPhoto", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
]),updateFreelancer);
freelancerRouter.delete('/freelancer/profile/:freelancerId',deleteFreelancer)


