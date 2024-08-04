import { educationModel } from "../model/education.js";
import { freelancerModel } from "../model/freelancerModel.js";
import { educationSchema } from "../schema/education.js";

export const addEducation = async (req, res) => {
    try {
        // Validate the incoming request data
        const { error, value } = educationSchema.validate(req.body);
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
        // Create a new education entry with freelancer reference
        const newEducation = await educationModel.create({
            ...value,
            freelancer: freelancer._id
        });

        // Add the new education entry to the freelancer's education array
        freelancer.education.push(newEducation._id);
        await freelancer.save();

        // Respond with success message
        res.status(201).json({
            education: newEducation,
            message: "Education added successfully",
        });
    } catch (error) {
        console.error('Error adding education:', error);
        res.status(500).send(error.message);
    }
};


// Deleting Education From Preelancer
export const updateEducation = async (req, res) => {
    try {
        // Validate the incoming request data
        const { error, value } = educationSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Retrieve the user ID from the session or request
        const id = req.session?.user?.id || req?.user?.id;
        console.log('User ID:', id); // Debugging line

        if (!id) {
            return res.status(400).send('User ID is missing');
        }

        // Find the freelancer profile by user ID
        const freelancer = await freelancerModel.findOne({ user: id });
        console.log('Freelancer:', freelancer); // Debugging line

        if (!freelancer) {
            return res.status(404).send('Freelancer not found');
        }

        // Find the education entry by ID and update it
        const educationId = req.params.educationId;
        const updatedEducation = await educationModel.findByIdAndUpdate(educationId, value, { new: true });

        if (!updatedEducation) {
            return res.status(404).send('Education not found');
        }

        // Respond with success message
        res.status(200).json({
            education: updatedEducation,
            message: "Education updated successfully",
        });
    } catch (error) {
        console.error('Error updating education:', error);
        res.status(500).send(error.message);
    }
};




export const deleteEducation = async (req, res) => {
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
        // Find the education entry by ID and delete it
        const educationId = req.params.educationId;
        const deletedEducation = await educationModel.findByIdAndDelete(educationId);

        if (!deletedEducation) {
            return res.status(404).send('Education not found');
        }
        // Remove the education entry from the freelancer's education array
        freelancer.education = freelancer.education.filter(id => id.toString() !== educationId);
        await freelancer.save();
        // Respond with success message
        res.status(200).json({
            message: "Education deleted successfully",
        });
    } catch (error) {
        console.error('Error deleting education:', error);
        res.status(500).send(error.message);
    }
};
