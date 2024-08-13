import { speechToText } from "../utils/speechToText.js"

const SpeechToText = ( async (req , res) => {

    const localFilePath = req.files?.audioCommand?.[0]?.path ;

    if (!localFilePath) {
        return res.status(400).json({ message: 'Please say something' });
    }

    const response = await speechToText(localFilePath) ;

    res.status(200).json({ message: response.message}) ;
})

export default SpeechToText ;