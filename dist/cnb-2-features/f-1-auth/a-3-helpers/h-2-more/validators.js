"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = exports.passwordValidator = exports.emailValidator = exports.emailRegExp = void 0;
exports.emailRegExp = /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i;
const emailValidator = (email) => exports.emailRegExp.test(email); // true - valid
exports.emailValidator = emailValidator;
const passwordValidator = (password) => password.length > 7; // true - valid
exports.passwordValidator = passwordValidator;
const validateAuth = (req, res, inInfo) => {
    const isEmailValid = (0, exports.emailValidator)(req.body.email);
    const isPassValid = (0, exports.passwordValidator)(req.body.password);
    if (!isEmailValid || !isPassValid) {
        res.status(400).json({
            error: "not valid email/password /ᐠ-ꞈ-ᐟ\\",
            in: inInfo,
            isEmailValid,
            isPassValid,
            emailRegExp: exports.emailRegExp,
            passwordRegExp: "Password must be more than 7 characters...",
        });
        return false;
    }
    else
        return true;
};
exports.validateAuth = validateAuth;
//# sourceMappingURL=validators.js.map