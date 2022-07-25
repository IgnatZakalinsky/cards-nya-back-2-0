"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../../../cnb-1-main/config");
// // @ts-ignore
// const transporter = nodeMailer.createTransport({ service: "Outlook365",
//     host: "smtp.office365.com",
//     port: "587",
//     tls: {
//         ciphers: "SSLv3",
//         rejectUnauthorized: false,
//     },
//     auth: {
//         user: 'neko.cafe@outlook.com',
//         pass: process.env.GMAIL_PASS || GMAIL_PASS
//     }
// });
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        // type: "login",
        user: process.env.GMAIL_USER || config_1.GMAIL_USER,
        pass: process.env.GMAIL_PASS || config_1.GMAIL_PASS
    }
});
exports.sendMail = (from, to, subject, html, text) => __awaiter(void 0, void 0, void 0, function* () {
    // for accept
    // https://myaccount.google.com/lesssecureapps
    const info = yield transporter.sendMail({
        from: 'neko.cafe@outlook.com',
        to,
        subject,
        text,
        html: text ? undefined : html,
    });
    if (config_1.DEV_VERSION)
        console.log("gmail info: ", info);
    return info;
});
//# sourceMappingURL=gmail.js.map