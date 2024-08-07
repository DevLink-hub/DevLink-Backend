
import { clientModel } from "../model/clientModel.js";
import { projectModel } from "../model/project.js";

import { clientProjectSchema } from "../schema/project.js";

export const addProject = async (req, res) => {
  try {
    const { error, value } = clientProjectSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    
    // Retrieve the user ID from the session or request
    const id = req.session?.user?.id || req?.user?.id;
    if (!id) {
      return res.status(400).send('User ID is missing');
    }
    
    // Find the client profile by user ID
    const client = await clientModel.findOne({ user: id });
    if (!client) {
      return res.status(404).send('Client not found');
    }

    // Log the client object for debugging
    console.log('Client found:', client);

    // Create a new project entry with client reference
    const newProject = await projectModel.create({
      ...value,
      client: client._id
    });

    // Ensure the projects field is an array and add the new project entry
    if (!client.project) {
      client.project = [];
    } else if (!Array.isArray(client.project)) {
      client.project = [client.project];
    }
    client.project.push(newProject._id);
    await client.save();
    
    // Respond with success message
    res.status(201).json({
      project: newProject,
      message: "Project added successfully",
    });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).send(error.message);
  }
};


export const updateProject = async (req, res) => {
    try {
        const { error, value } = clientProjectSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        // Retrieve the user ID from the session or request
        const id = req.session?.user?.id || req?.user?.id;
        if (!id) {
            return res.status(400).send('User ID is missing');
        }
        // Find the client profile by user ID
        const client = await clientModel.findOne({ user: id });
        if (!client) {
            return res.status(404).send('Client not found');
        }
        // Find the project entry by ID and update it
        const updatedProject = await projectModel.findOneAndUpdate(
            {  client: client._id },
            value,
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).send('Project not found');
        }

        // Respond with success message
        res.status(200).json({
            project: updatedProject,
            message: "Project updated successfully",
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).send(error.message);
    }
};


export const deleteProject = async (req, res) => {
    try {
        // Retrieve the user ID from the session or request
        const id = req.session?.user?.id || req?.user?.id;
        if (!id) {
            return res.status(400).send('User ID is missing');
        }

        // Find the client profile by user ID
        const client = await clientModel.findOne({ user: id });
        if (!client) {
            return res.status(404).send('Client not found');
        }

        // Find the project entry by ID and delete it
        const projectId = req.params.projectId;
        const deletedProject = await projectModel.findOneAndDelete({
            client: client._id
        });

        if (!deletedProject) {
            return res.status(404).send('Project not found');
        }

        // Remove the project reference from the client's project array
        client.project = client.project.filter(id => id.toString() !== projectId);
        await client.save();

        // Respond with success message
        res.status(200).json({
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).send(error.message);
    }
};



export const getProjects = async (req, res) => {
  try {
    // Retrieve the user ID from the session or request
    const id = req.session?.user?.id || req?.user?.id;
    if (!id) {
      return res.status(400).send('User ID is missing');
    }

    // Find the client profile by user ID and populate the projects
    const client = await clientModel.findOne({ user: id }).populate('project');
    if (!client) {
      return res.status(404).send('Client not found');
    }

    // Respond with the client's projects
    res.status(200).json({
      projects: client.project,
      message: "Projects retrieved successfully",
    });
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).send(error.message);
  }
};