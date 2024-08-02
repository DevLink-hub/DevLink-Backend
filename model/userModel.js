import { Schema, model} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

//Defining new User Schema
const userSchema = new Schema({
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        userName: { type: String , unique:true},
        
},{
        timestamps:true
})

userSchema.plugin(toJSON);
export const userModel = model('User', userSchema)

