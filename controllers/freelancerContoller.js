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

export const updateFreelancer = async (req, res) => {
  try {
    // Retrieve the user ID from the session or request
    const userId = req.session?.user?.id || req?.user?.id;

    if (!userId) {
      return res.status(400).send('User ID is missing');
    }

    // Validate the incoming request data
    const { error, value } = freelancerSchema.validate({
      ...req.body,
      coverPhoto: req.files?.coverPhoto ? req.files.coverPhoto[0].filename : undefined,
      profilePhoto: req.files?.profilePhoto ? req.files.profilePhoto[0].filename : undefined
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Find and update the freelancer profile of the logged-in user
    const Freelancer = await freelancerModel.findOneAndUpdate(
      { user: userId },  // Find the freelancer associated with the logged-in user
      value,
      { new: true, runValidators: true }
    );

    if (!Freelancer) {
      return res.status(404).send('Freelancer profile not found');
    }

    res.status(200).json({
     Freelancer,
      message: "Freelancer profile updated successfully"
    });
  } catch (error) {
    console.error('Error updating freelancer profile:', error);
    res.status(500).send(error.message);
  }
};

// Delete Freelancer

export const deleteFreelancer = async (req, res, next) => {
  try {
    // Retrieve the user ID from the session or request
    const id = req.session?.user?.id || req?.user?.id;
    if (!id) {
      return res.status(400).json({ message: 'User ID is missing' });
    }

    // Find and delete the freelancer profile associated with the logged-in user
    const freelancer = await freelancerModel.findOneAndDelete({ user: id });
    if (!freelancer) {
      return res.status(404).json({ message: 'Freelancer not found' });
    }

    // Optionally, update the user document if there is a reference to freelancers
    const user = await userModel.findById(id);
    if (user) {
      // Remove the reference to the deleted freelancer from the user document
      user.freelancers = user.freelancers.filter(freelancerId => freelancerId.toString() !== freelancer._id.toString());
      await user.save();
    }

    res.status(200).json({ message: 'Freelancer deleted successfully' });
  } catch (error) {
    console.error('Error deleting freelancer:', error); // Log error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const getAllFreelancers = async (req, res, next) => {
  try {
  //   const { limit, skip, fields, filter } = req.query;
  //   console.log(req.query);
  // console.log(fields);
  // console.log(limit)

  //   const freelancers = await freelancerModel
  //    // get query params
     const { limit, skip, filter, fields} = req.query;
     // get allcategory 
     const freelancers = await freelancerModel
     .find(filter ? JSON.parse(filter) : {})
     .select(fields ? JSON.parse(fields) : '')
     .limit(limit ? parseInt(limit) : undefined)
     .skip(skip ? parseInt(skip) : undefined);

    res.status(200).json({
      freelancers,
      message: "Freelancers retrieved successfully",
    });
  } catch (error) {
    console.error('Error retrieving freelancers:', error);
    res.status(500).send(error.message);
  }
};


export const getFreelancerProfile = async (req, res, next) => {
  try {
    // Retrieve the user ID from the session or authentication token
    const userId = req.session?.user?.id || req?.user?.id;
    if (!userId) {
      return res.status(400).send('User ID is missing');
    }
    // Find the freelancer profile by user ID
    const freelancer = await freelancerModel.findOne({ user: userId })
      .populate('user', 'firstName lastName email');

    if (!freelancer) {
      return res.status(404).send('Freelancer profile not found');
    }

    // Respond with the freelancer profile
    res.status(200).json({
      freelancer,
      message: "Freelancer profile retrieved successfully"
    });
  } catch (error) {
    console.error('Error retrieving freelancer profile:', error);
    next(error);
  }
};


