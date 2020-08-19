import {Request, Response} from "express";

export const emailRegExp = /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i;

export const emailValidator = (email: string): boolean => emailRegExp.test(email); // true - valid

export const passwordValidator = (password: string): boolean => password.length > 7; // true - valid

export const validateAuth = (req: Request, res: Response, inInfo: string): boolean => {
    const isEmailValid = emailValidator(req.body.email);
    const isPassValid = passwordValidator(req.body.password);

    if (!isEmailValid || !isPassValid) {
        res.status(400).json({
            error: "not valid email/password /ᐠ-ꞈ-ᐟ\\",
            in: inInfo,
            isEmailValid,
            isPassValid,
            emailRegExp,
            passwordRegExp: "Password must be more than 7 characters...",
        });
        return false;
    } else return true
};
