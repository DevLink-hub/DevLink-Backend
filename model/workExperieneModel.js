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
    user:{type: Types.ObjectId, ref:'Freelancer'}
  },{
    timestamps:true,
  });

  workExperienceSchema.plugin(toJSON);
  export const workExperienceModel = model('WorkExperince',workExperienceSchema)