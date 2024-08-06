import { Router } from "express";
import { addClient, deleteClient, getClient, updateClient } from "../controllers/clients.js";
import { remoteUploads } from "../middleware/Devuploads.js";

export const clientRouter = Router();

clientRouter.post('/clients/me',
    remoteUploads.fields([
        { name: "coverPhoto", maxCount: 1 },
        { name: "profilePhoto", maxCount: 1 },
    ]) ,addClient),


    clientRouter.patch('/clients/me', remoteUploads.fields([
        { name: "coverPhoto", maxCount: 1 },
        { name: "profilePhoto", maxCount: 1 },
    ]),updateClient)

    clientRouter.delete('/clients/me',deleteClient),

    clientRouter.get('/clients/me',getClient)
