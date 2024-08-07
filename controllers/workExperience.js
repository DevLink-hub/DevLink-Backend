
import { freelancerModel } from "../model/freelancerModel.js";
import { workExperienceModel } from "../model/workExperieneModel.js";
import { workExperienceSchema } from "../schema/workExp.js";

export const addWorkExp = async (req, res) => {
  try {
    // Validate the incoming request data
    const { error, value } = workExperienceSchema.validate(req.body);
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
    // Create a new work experience entry with freelancer reference
    const newWorkExperience = await workExperienceModel.create({
      ...value,
      freelancer: freelancer._id
    });
    // Add the new work experience entry to the freelancer's workExperience array
    freelancer.workExperience.push(newWorkExperience._id);
    await freelancer.save();
    // Respond with success message
    res.status(201).json({
      workExperience: newWorkExperience,
      message: "Work experience added successfully",
    });
  } catch (error) {
    console.error('Error adding work experience:', error);
    res.status(500).send(error.message);
  }
}

// Updating Work Experince from Freelancer

export const updateWorkExp = async (req, res) => {
    try {
      // Validate the incoming request data
      const { error, value } = workExperienceSchema.validate(req.body);
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
      // Find the work experience by ID and update it
      const updatedWorkExp = await workExperienceModel.findByIdAndUpdate(req.params.workExpId, value, { new: true });
      if (!updatedWorkExp) {
        return res.status(404).send('Work Experience not found');
      }
      res.status(200).json({
        workExperience: updatedWorkExp,
        message: "Work Experience updated successfully",
      });
    } catch (error) {
      console.error('Error updating work experience:', error);
      res.status(500).send(error.message);
    }
  };



  export const getWorkExp = async (req, res) => {
    try {
        // Retrieve the user ID from the session or request
        const id = req.session?.user?.id || req?.user?.id;
        if (!id) {
            return res.status(400).send('User ID is missing');
        }

        // Find the freelancer profile by user ID and populate the workExperience field
        const freelancer = await freelancerModel.findOne({ user: id }).populate('workExperience');
        if (!freelancer) {
            return res.status(404).send('Freelancer not found');
        }

        // Respond with the freelancer's work experiences
        res.status(200).json({
            workExperience: freelancer.workExperience,
            message: "Work experience entries retrieved successfully",
        });
    } catch (error) {
        console.error('Error retrieving work experience entries:', error);
        res.status(500).send(error.message);
    }
};

  export const deleteWorkExp = async (req, res) => {
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
  
      // Find the work experience by ID and delete it
      const deletedWorkExp = await workExperienceModel.findByIdAndDelete(req.params.workExpId);
      if (!deletedWorkExp) {
        return res.status(404).send('Work Experience not found');
      }
  
      // Remove the work experience reference from the freelancer's workExperience array
      freelancer.workExperience = freelancer.workExperience.filter(workExpId => workExpId.toString() !== req.params.workExpId);
      await freelancer.save();
  
      res.status(200).json({
        message: "Work Experience deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting work experience:', error);
      res.status(500).send(error.message);
    }
  };