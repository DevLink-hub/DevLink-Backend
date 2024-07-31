import mongoose from "mongoose";
import 'dotenv/config';


//creating database
const dbconnect = process.env.Mongo_uri

export const dbconnection = async () =>{
    try {
        await mongoose.connect(dbconnect);
            console.log('database connected')
        
    } catch (error) {
        console.log(error)
    }
}
