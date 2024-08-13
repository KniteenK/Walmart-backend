import express from 'express';
import authRoute from './routes/auth.routes.js'
import voiceRoute from './routes/speechToText.routes.js'
import { configDotenv } from 'dotenv';

configDotenv();
const app = express();

app.use(express.json());


// user auth
app.use ('/auth' , authRoute) ;

// speech to text route
app.use('/voice' , voiceRoute) ;


export default app ;