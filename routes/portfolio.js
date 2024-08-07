import { Router } from "express";
import { addPortfolio, deletePortfolio, getPortfolio, updatePortfolio } from "../controllers/portfolio.js";

export const portfolioRouter = Router();

portfolioRouter.post('/portfolio', addPortfolio)
portfolioRouter.get('/portfolio',getPortfolio)
portfolioRouter.patch('/portfolio',updatePortfolio)
portfolioRouter.delete('/portfolio',deletePortfolio)
