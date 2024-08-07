import { freelancerModel } from "../model/freelancerModel.js";
import { portfolioModel } from "../model/portfolioModel.js";
import { portfolioSchema } from "../schema/portfolio.js";

// Add Portfolio
export const addPortfolio = async (req, res) => {
    try {
        // Validate the incoming request data
        const { error, value } = portfolioSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Retrieve the user ID from the session or request
        const id = req.session?.user?.id || req?.user?.id;
        if (!id) {
            return res.status(400).send('User ID is missing');
        }

        // Find the freelancer profile by user ID
        const freelancer = await freelancerModel.findOne({ user: id });
        if (!freelancer) {
            return res.status(404).send('Freelancer not found');
        }

        // Create a new portfolio entry with freelancer reference
        const newPortfolio = await portfolioModel.create({
            ...value,
            freelancer: freelancer._id
        });

        // Add the new portfolio entry to the freelancer's portfolio array
        freelancer.portfolio.push(newPortfolio._id);
        await freelancer.save();

        // Respond with success message
        res.status(201).json({
            portfolio: newPortfolio,
            message: "Portfolio added successfully",
        });
    } catch (error) {
        console.error('Error adding portfolio:', error);
        res.status(500).send(error.message);
    }
};



export const getPortfolio = async (req, res) => {
    try {
        // Retrieve the user ID from the session or request
        const id = req.session?.user?.id || req?.user?.id;
        if (!id) {
            return res.status(400).send('User ID is missing');
        }

        // Find the freelancer profile by user ID and populate the portfolio
        const freelancer = await freelancerModel.findOne({ user: id }).populate('portfolio');
        if (!freelancer) {
            return res.status(404).send('Freelancer not found');
        }

        // Respond with the freelancer's portfolio
        res.status(200).json({
            portfolio: freelancer.portfolio,
            message: "Portfolio entries retrieved successfully",
        });
    } catch (error) {
        console.error('Error retrieving portfolio entries:', error);
        res.status(500).send(error.message);
    }
};

// Update Portfolio
export const updatePortfolio = async (req, res) => {
    try {
        // Validate the incoming request data
        const { error, value } = portfolioSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Retrieve the user ID from the session or request
        const id = req.session?.user?.id || req?.user?.id;
        if (!id) {
            return res.status(400).send('User ID is missing');
        }

        // Find the freelancer profile by user ID
        const freelancer = await freelancerModel.findOne({ user: id });
        if (!freelancer) {
            return res.status(404).send('Freelancer not found');
        }

        // Find the portfolio entry by ID and update it
        const updatedPortfolio = await portfolioModel.findOneAndUpdate(
            {  freelancer: freelancer._id }, 
            value, 
            { new: true }
        );

        if (!updatedPortfolio) {
            return res.status(404).send('Portfolio not found');
        }

        // Respond with success message
        res.status(200).json({
            portfolio: updatedPortfolio,
            message: "Portfolio updated successfully",
        });
    } catch (error) {
        console.error('Error updating portfolio:', error);
        res.status(500).send(error.message);
    }
};

// Delete Portfolio
export const deletePortfolio = async (req, res) => {
    try {
        // Retrieve the user ID from the session or request
        const id = req.session?.user?.id || req?.user?.id;
        if (!id) {
            return res.status(400).send('User ID is missing');
        }

        // Find the freelancer profile by user ID
        const freelancer = await freelancerModel.findOne({ user: id });
        if (!freelancer) {
            return res.status(404).send('Freelancer not found');
        }

        // Find the portfolio entry by ID and delete it
        const portfolioId = req.params.portfolioId;
        const deletedPortfolio = await portfolioModel.findOneAndDelete({
            
            freelancer: freelancer._id
        });

        if (!deletedPortfolio) {
            return res.status(404).send('Portfolio not found');
        }

        // Remove the portfolio reference from the freelancer's portfolio array
        freelancer.portfolio = freelancer.portfolio.filter(id => id.toString() !== portfolioId);
        await freelancer.save();

        // Respond with success message
        res.status(200).json({
            message: "Portfolio deleted successfully",
        });
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        res.status(500).send(error.message);
    }
};
