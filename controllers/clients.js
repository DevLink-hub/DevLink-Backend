import { clientSchema } from "../schema/clientSchema.js";
import { clientModel } from "../model/clientModel.js";
import { userModel } from "../model/userModel.js";


// creating client profile
export const addClient = async (req, res) => {
    const { error, value } = clientSchema.validate({
      ...req.body,
      coverPhoto: req.files?.coverPhoto[0].filename,
      profilePhoto: req.files?.profilePhoto[0].filename
    });
  
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
      const newClient = new clientModel({...value,
        user:user.id});
      const savedClient = await newClient.save();
      res.status(201).json(savedClient);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  // Update client profile
export const updateClient = async (req, res) => {
    const { error, value } = clientSchema.validate({
      ...req.body,
      coverPhoto: req.files?.coverPhoto[0]?.filename,
      profilePhoto: req.files?.profilePhoto[0]?.filename
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      const id = req.session?.user?.id || req?.user?.id;
      const updatedClient = await clientModel.findOneAndUpdate(
        { user: id },  // Ensure we update only the logged-in user's profile
        { ...value },
        { new: true }  // Return the updated document
      );

      if (!updatedClient) {
        return res.status(404).send('Client profile not found');
      }

      res.status(200).json(updatedClient);
    } catch (error) {
      res.status(500).send(error.message);
    }
};


// Delete client profile
export const deleteClient = async (req, res) => {
    try {
      const id = req.session?.user?.id || req?.user?.id;
      const deletedClient = await clientModel.findOneAndDelete({ user: id });

      if (!deletedClient) {
        return res.status(404).json({ message: 'Client profile not found' });
      }

      res.status(200).json({ message: 'Client profile deleted successfully' });
    } catch (error) {
      res.status(500).send(error.message);
    }
};


// Get client profile
export const getClient = async (req, res) => {
    try {
      const id = req.session?.user?.id || req?.user?.id;
      const client = await clientModel.findOne({ user: id }).populate('user', 'firstName lastName email');

      if (!client) {
        return res.status(404).json({ message: 'Client profile not found' });
      }

      res.status(200).json({client,message: "Clients profile retrieved successfully"});
    } catch (error) {
      res.status(500).send(error.message);
    }
};
