import config from "../config.js";
import { twilioClient } from "../services/smsServices.js";

export const sendSMS = async(req, res)=>{
    try {
        const message = {
            body: req.body.message,
            from: config.TWILIO_PHONE,
            to: req.body.dest
        };
        const response = await twilioClient.messages.create(message);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}