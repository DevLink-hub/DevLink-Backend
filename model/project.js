import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const projectSchema = new Schema({
    title: {type: String,required: true},
    description: { type: String,required:true},
    budget: {type: Number,required: true},
    deadline: {type: Date,required:true},
    skillsRequired: {type: [String],required: true},
    status: {type: String,enum: ['open', 'in_progress', 'completed', 'canceled'],default: 'open'},
    client:[{type: Types.ObjectId,ref:'Client', required: true }],


},{
    timestamps:true,
})

projectSchema.plugin(toJSON);
export const projectModel = model('Project',projectSchema)
 