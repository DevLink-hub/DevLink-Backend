import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

// Extend the Freelancer Schema
const freelancerSchema = new Schema({
  coverPhoto: { type: String },
  profilePhoto: { type: String },
  bio: { type: String, required: true },
  location: { type: String, required: true },
  skills: [{ type: String, required: true }],
  workExperience: [{ type: Types.ObjectId, ref: 'WorkExperince', required: true }],
  portfolio: [{ type: Types.ObjectId, ref: 'Portfolio', required: true }],
  user: { type: Types.ObjectId, ref: 'User', required: true },
  education: [{ type: Types.ObjectId, ref: "Education", required: true }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
});

freelancerSchema.plugin(toJSON);
export const freelancerModel = model('Freelancer', freelancerSchema);
