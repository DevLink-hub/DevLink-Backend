import express from 'express'
import 'dotenv/config';
import expressOasGenerator from '@mickeymond/express-oas-generator';
import cors from 'cors'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { dbconnection } from './config/db.js';
import { userRouter } from './routes/user.js';
// import passport from 'passport'
// import { auth } from 'express-openid-connect';




// Creating an Express App
const app = express();
app.use(express.json());expressOasGenerator.handleResponses(app, {
  alwaysServeDocs:true,
  tags: [ 'Profile' ],
 
  mongooseModels: mongoose.modelNames(),

});

app.use(cors({credentials:true, origin:'*'}));



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
    store:MongoStore.create({
        mongoUrl:process.env.Mongo_uri
    })
  }));

 
 

  expressOasGenerator.handleRequests();
app.use((req,res) => res.redirect('/api-docs/'));
//Routte
app.use('/api/v1',userRouter)



 //Listening to Port & Connecting to database
 dbconnection();

const port = 4400

app.listen(port, () =>{
console.log(`Listening on port: ${port}`);
});
