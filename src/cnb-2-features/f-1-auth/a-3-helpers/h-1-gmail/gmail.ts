import nodeMailer from "nodemailer";
import {DEV_VERSION} from "../../../../cnb-1-main/config";

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER || '',
        pass: process.env.GMAIL_PASS || ''
    }
});

export const sendMail = async (to: string, subject: string, html?: string, text?: string) => {

    // for accept
    // https://myaccount.google.com/lesssecureapps
    const info = await transporter.sendMail({
        from: 'cards-nya',
        to,
        subject,
        text,
        html: text ? undefined : html,
    });

    if (DEV_VERSION) console.log('gmail info: ', info);

    return info;
};
