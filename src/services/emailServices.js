import { createTransport } from 'nodemailer';
import config from '../utils/config.js';
import { templateHtml } from './template.js';

const etherealTransporter = createTransport({
    host: config.HOST_ETHEREAL,
    port: config.PORT_ETHEREAL,
    auth: {
        user: config.EMAIL_ETHEREAL,
        pass: config.PASSWORD_ETHEREAL,
    }
});

const gmailTransporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: config.EMAIL_GMAIL,
        pass: config.PASSWORD_GMAIL
    }
});

const defaultMailOptions = {
    from: config.EMAIL,
    subject: 'Bienvenido/a',
};

export const mailOptionsEthereal = {
    ...defaultMailOptions,
    to: config.EMAIL_ETHEREAL,
    html: templateHtml,
};

export const mailOptionsGmail = (dest, name) => ({
    ...defaultMailOptions,
    from: config.EMAIL_GMAIL,
    to: dest,
    subject: 'Bienvenido/a',
    html: `<h1>Hola ${name}, ¡Te damos la bienvenida!</h1>`
});

export const mailOptionsGmailLoginOk = (dest, name) => ({
    ...defaultMailOptions,
    from: config.EMAIL_GMAIL,
    to: dest,
    subject: 'Inicio de sesión exitoso',
    html: `<h1>Tu inicio de sesión fue exitoso</h1>`
});

export const transporterEthereal = etherealTransporter;
export const transporterGmail = gmailTransporter;
