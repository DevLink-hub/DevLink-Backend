import { Schema, model,Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
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
    }, user:{type: Types.ObjectId, ref:'Freelancer'},
  },{
    timestamps:true,
  });

  portfolioSchema.plugin(toJSON);
  export const portfolioModel = model('Portfolio',portfolioSchema)

  