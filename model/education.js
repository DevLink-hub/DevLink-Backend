import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const educationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  year: { type: String, required: true },
  freelancer: { type: Types.ObjectId, ref: 'Freelancer', required: true }, // Ensure this field is required
}, {
  timestamps: true,
});

educationSchema.plugin(toJSON);

// Export the Education model
export const educationModel = model('Education', educationSchema);
