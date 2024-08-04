import express from 'express'
import mongoose from 'mongoose';
import 'dotenv/config';
import expressOasGenerator from '@mickeymond/express-oas-generator';
import cors from 'cors'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { dbconnection } from './config/db.js';
import { userRouter } from './routes/userRoute.js';
import { freelancerRouter } from './routes/freelancerRoute.js';
import { educationRoute } from './routes/educationRoute.js';
import { workExpRouter } from './routes/addWorkExp.js';
// import passport from 'passport'
// import { auth } from 'express-openid-connect';




// Creating an Express App
const app = express();

expressOasGenerator.handleResponses(app, {
  alwaysServeDocs: true,
  tags: ['users','freelancer',"education","work Experience",],

  mongooseModels: mongoose.modelNames(),

});
// miiddleware
app.use(express.json()); 
app.use(cors({ credentials: true, origin: '*' }));



app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true },
  store: MongoStore.create({
    mongoUrl: process.env.Mongo_uri
  })
}));


//Route
app.use('/api/v1', userRouter)
app.use('/api/v1',freelancerRouter)
app.use('/api/v1',educationRoute)
app.use('/api/v1',workExpRouter)
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));






//Listening to Port & Connecting to database
dbconnection();

const port = 4400

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
