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
exports.logIn = void 0;
const user_1 = __importDefault(require("../a-2-models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../../cnb-1-main/config");
const generateResetPasswordToken_1 = require("../a-3-helpers/h-2-users/generateResetPasswordToken");
const validators_1 = require("../a-3-helpers/h-2-users/validators");
exports.logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (validators_1.validateAuth(req, res, "logIn")) {
        try {
            const user = yield user_1.default.findOne({ email: req.body.email }).exec();
            if (!user || !(yield bcrypt_1.default.compare(req.body.password, user.password)))
                res.status(400).json({ error: "not correct email/password /ᐠ-ꞈ-ᐟ\\", in: "logIn" });
            else {
                const [token, tokenDeathTime] = generateResetPasswordToken_1.generateToken(!!req.body.rememberMe);
                try {
                    const newUser = yield user_1.default.findByIdAndUpdate(user._id, { token, tokenDeathTime, rememberMe: !!req.body.rememberMe }, { new: true }).exec();
                    if (!newUser)
                        res.status(500)
                            .json({ error: "not updated? /ᐠ｡ꞈ｡ᐟ\\", in: "logIn/User.findByIdAndUpdate" });
                    else {
                        // if (DEV_VERSION) console.log('IUser?: ', {...newUser}); // for dev => _doc!!!
                        const body = Object.assign({}, newUser._doc); // _doc!!!
                        delete body.password; // don't send password to the front
                        delete body.resetPasswordToken;
                        delete body.resetPasswordTokenDeathTime;
                        res.cookie("token", token, {
                            expires: new Date(tokenDeathTime),
                            secure: false,
                        }).status(200).json(Object.assign({}, body));
                    }
                }
                catch (e) {
                    res.status(500).json({
                        error: "some error: " + e.message,
                        info: "Back doesn't know what the error is... ^._.^",
                        errorObject: config_1.DEV_VERSION && Object.assign({}, e),
                        in: "logIn/User.findByIdAndUpdate",
                    });
                }
            }
        }
        catch (e) {
            res.status(500).json({
                error: "some error: " + e.message,
                info: "Back doesn't know what the error is... ^._.^",
                errorObject: config_1.DEV_VERSION && Object.assign({}, e),
                in: "logIn/User.findOne",
            });
        }
    }
});
//# sourceMappingURL=logIn.js.map