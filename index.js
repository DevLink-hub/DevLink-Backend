import express from 'express'
import 'dotenv/config';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { dbconnection } from './config/db.js';
import { userRouter } from './routes/user.js';



// Creating an Express App
const app = express();
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
    store:MongoStore.create({
        mongoUrl:process.env.Mongo_uri
    })
  }));




//Routte
app.use('/api/v1',userRouter)

 //Listening to Port & Connecting to database
 dbconnection();

const port = 4400

app.listen(port, () =>{
console.log(`Listening on port: ${port}`);
});
