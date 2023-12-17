import { mailOptionsEthereal, mailOptionsGmail, transporterEthereal, transporterGmail } from "../services/emailServices.js";

export const sendMailEthereal = async(req, res) => {
    try {
        const response = await transporterEthereal.sendMail(mailOptionsEthereal);
        console.log('Correo Ethereal enviado');
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

export const sendMailGmail = async(req, res) => {
    try {
        const { dest, name } = req.body;

        const response = await transporterGmail.sendMail(mailOptionsGmail(dest, name));
        console.log('Correo gmail enviado!');
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}