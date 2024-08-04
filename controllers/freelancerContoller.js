import { freelancerModel } from "../model/freelancerModel.js";
import { freelancerSchema } from "../schema/freelancerSchema.js";
import { userModel } from "../model/userModel.js";

//creating a freelancer profile
export const addFreelancer = async (req, res) => {
  const { error, value } = freelancerSchema.validate(
  {...req.body,
    coverPhoto: req.files?.coverPhoto[0].filename,
    profilePhoto:req.files?.profilePhoto[0].filename
  
  }
  )
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
 try {
   // Find the user and associate the experience
   const id = req.session?.user?.id || req?.user?.id;
   const user = await userModel.findById(id); // Fetch user using session ID
   if (!user) {
     return res.status(404).send('User not found');
   }
   // Create freelancer with the validated data
   const newFreelancer = await freelancerModel.create({
     ...value,
     user: user.id
   });
      // Save the new freelancer profile
      const savedFreelancer = await newFreelancer.save();
 
      res.status(201).json(savedFreelancer);
 } catch (error) {
  res.status(500).send(error.message);
 }
}


//Updating Freelancer Profile

export const updateFreelancer = async (req,res) =>{
  try {
    const { error, value } = freelancerSchema.validate(
      {  ...req.body,
        coverPhoto: req.files.coverPhoto[0].filename,
        profilePhoto:req.files.profilePhoto[0].filename
      }
    )
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    // Find the user and associate the experience
    // const freelancerId = req.session?.user?.id || req?.user?.id;
    const updatedFreelancer = await freelancerModel.findByIdAndUpdate(
      req.params.freelancerId,
      value,
      { new: true }
    ); // Fetch user using session ID
    if (!updatedFreelancer) {
      return res.status(404).send('User not found');
    }
    res.status(200).json({updatedFreelancer , message:"Freelancer Updated Sucessfully" });
  }
   catch (error) {
    res.status(500).send(error.message)
  }
}



export const deleteFreelancer = async (req, res, next) => {
  try {
    const freelancerId = req.params.freelancerId;

    // Find and delete freelancer
    const deletedFreelancer = await freelancerModel.findByIdAndDelete(freelancerId);
    if (!deletedFreelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }

    // Handle user reference update (if applicable)
    if (deletedFreelancer.freelancerId) {
      const user = await userModel.findById(deletedFreelancer.freelancerId);
      if (user) {
        // Update user's freelancer references
        // ...
        await user.save();
      }
    }

    res.status(200).json({ message: 'Freelancer deleted successfully' });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};
