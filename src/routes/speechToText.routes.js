import express from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import SpeechToText from "../controllers/speechToText.controllers.js";

const router = express.Router();

router.route('/upload').post(upload.fields([
    {
        name: 'audioCommand',
        limits: { fileSize: 50 * 1024 * 1024 },
        mimeTypes: ['audio/wav']
    }
]) , SpeechToText) ;

export default router;