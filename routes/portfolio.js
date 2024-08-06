import { Router } from "express";
import { addPortfolio, deletePortfolio, updatePortfolio } from "../controllers/portfolio.js";

export const portfolioRouter = Router();

portfolioRouter.post('/portfolio', addPortfolio)
portfolioRouter.patch('/portfolio',updatePortfolio)
portfolioRouter.delete('/portfolio',deletePortfolio)
