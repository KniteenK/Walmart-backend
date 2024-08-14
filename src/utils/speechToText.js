import sdk from 'microsoft-cognitiveservices-speech-sdk';
import fs from 'fs';
import { configDotenv } from 'dotenv';

configDotenv();

const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
speechConfig.speechRecognitionLanguage = "en-US";

const speechToText = (localFilePath) => {
    return new Promise((resolve, reject) => {
        const audioBuffer = fs.readFileSync(localFilePath);
        const audioConfig = sdk.AudioConfig.fromWavFileInput(audioBuffer);
        const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

        speechRecognizer.recognizeOnceAsync(result => {
            switch (result.reason) {
                case sdk.ResultReason.RecognizedSpeech:
                    console.log(`RECOGNIZED: Text=${result.text}`);
                    resolve(result.text);
                    break;
                case sdk.ResultReason.NoMatch:
                    console.log("NOMATCH: Speech could not be recognized.");
                    resolve(null);
                    break;
                case sdk.ResultReason.Canceled:
                    const cancellation = sdk.CancellationDetails.fromResult(result);
                    console.log(`CANCELED: Reason=${cancellation.reason}`);

                    if (cancellation.reason == sdk.CancellationReason.Error) {
                        console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                        console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                        console.log("CANCELED: Did you set the speech resource key and region values?");
                    }
                    resolve(null);
                    break;
                default:
                    resolve(null);
                    break;
            }

            speechRecognizer.close();
            fs.unlinkSync(localFilePath); // Delete the file after processing
        }, err => {
            console.error(`ERROR: ${err}`);
            reject(err);
        });
    });
};

export { speechToText };
