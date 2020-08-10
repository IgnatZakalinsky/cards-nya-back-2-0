"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = exports.passwordValidator = exports.emailValidator = void 0;
const emailRegExp = /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i;
exports.emailValidator = (email) => emailRegExp.test(email); // true - valid
exports.passwordValidator = (password) => password.length > 7; // true - valid
exports.validateAuth = (req, res, inInfo) => {
    const isEmailValid = exports.emailValidator(req.body.email);
    const isPassValid = exports.passwordValidator(req.body.password);
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
    }
    else
        return true;
};
//# sourceMappingURL=validators.js.map