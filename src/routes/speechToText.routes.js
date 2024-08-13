import express from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import SpeechToText from "../controllers/speechToText.controllers.js";
import { speechToText } from "../utils/speechToText.js";

const router = express.Router();

router.route('/upload').post(upload.single('file') , speechToText) ;

export default router;