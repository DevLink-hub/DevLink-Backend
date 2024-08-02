import { Schema, model,Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// Defining the Work Experience Schema
const workExperienceSchema = new Schema({
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });
  
  // Defining the Portfolio Schema
  const portfolioSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Extend the Freelancer Schema
  const freelancerSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    personalInfo: {
      bio: {
        type: String,
        required: true,
      },
      website: {
        type: String,
      },
      location: {
        type: String,
        required: true,
      },
    },
    skills: {
      type: [String],
      required: true,
    },
    workExperience: [workExperienceSchema],
    portfolio: [portfolioSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
{
    timestamps:true,
});
freelancerSchema.plugin(toJSON);
export const Freelancer = model('Freelancer', freelancerSchema);
