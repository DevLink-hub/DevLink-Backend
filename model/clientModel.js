import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

export const clientSchema = new Schema({
    coverPhoto: {type:String,required: true},
    profilePhoto: {type:String,required: true},
    companyName:{type:String,},
    location: {type: String, required: true},
    Industry:{type:String},
    companyAddress: { type: String, required: true },
    companyEmail: { type: String, required: true, unique: true },
    companyPhone: { type: String, required: true },
    Bio:{type:String},
    socilLink:{type:String,required:true},
    user:[{type: Types.ObjectId, ref:'User'}],
    project:[{type: Types.ObjectId, ref:'Project'}],
  
},{
    timestamps:true,
})

clientSchema.plugin(toJSON);
export const clientModel = model('Client',clientSchema)