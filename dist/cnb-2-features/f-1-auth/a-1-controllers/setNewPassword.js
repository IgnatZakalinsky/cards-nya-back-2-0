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
exports.setNewPassword = void 0;
const user_1 = __importDefault(require("../a-2-models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validators_1 = require("../a-3-helpers/h-2-more/validators");
const config_1 = require("../../../cnb-1-main/config");
exports.setNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resetPasswordToken, password } = req.body;
    if (!validators_1.passwordValidator(password))
        res.status(400).json({
            error: "Password not valid! must be more than 7 characters /ᐠ-ꞈ-ᐟ\\",
            body: config_1.DEV_VERSION && req.body,
            in: "setNewPassword",
        });
    else if (!resetPasswordToken)
        res.status(400).json({
            error: "no resetPasswordToken, Check your request! /ᐠ-ꞈ-ᐟ\\",
            body: config_1.DEV_VERSION && req.body,
            in: "setNewPassword",
        });
    else
        try {
            const user = yield user_1.default.findOne({ resetPasswordToken }).exec();
            if (!user
                || (user.resetPasswordTokenDeathTime && user.resetPasswordTokenDeathTime < Date.now()))
                res.status(401).json({
                    error: "bad token! /ᐠ-ꞈ-ᐟ\\",
                    resetPasswordToken: config_1.DEV_VERSION && resetPasswordToken,
                    in: "setNewPassword/User.findOne",
                });
            else {
                try {
                    const newUser = yield user_1.default.findByIdAndUpdate(user._id, { password: yield bcrypt_1.default.hash(req.body.password, 10), verified: true }, { new: true }).exec();
                    if (!newUser)
                        res.status(500)
                            .json({ error: "not updated? /ᐠ｡ꞈ｡ᐟ\\", in: "setNewPassword/User.findByIdAndUpdate" });
                    else {
                        res.status(200).json({ info: "setNewPassword success —ฅ/ᐠ.̫ .ᐟ\ฅ—" });
                    }
                }
                catch (e) {
                    res.status(500).json({
                        error: "some error: " + e.message,
                        info: "Back doesn't know what the error is... ^._.^",
                        errorObject: config_1.DEV_VERSION && e,
                        in: "setNewPassword/User.findByIdAndUpdate",
                    });
                }
            }
        }
        catch (e) {
            res.status(500).json({
                error: "some error: " + e.message,
                info: "Back doesn't know what the error is... ^._.^",
                errorObject: config_1.DEV_VERSION && e,
                in: "setNewPassword/User.findOne",
            });
        }
});
//# sourceMappingURL=setNewPassword.js.map