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
exports.status400 = exports.status500 = exports.findUserByToken = void 0;
const user_1 = __importDefault(require("../../a-2-models/user"));
const generateResetPasswordToken_1 = require("./generateResetPasswordToken");
const config_1 = require("../../../../cnb-1-main/config");
const app_1 = require("../../../../cnb-1-main/app");
exports.findUserByToken = (f, inTry) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    try {
        const user = yield user_1.default.findOne({ token }).exec();
        if (!user || !user.tokenDeathTime || user.tokenDeathTime < new Date().getTime())
            res.status(401)
                .json({ error: "you are not authorized /ᐠ-ꞈ-ᐟ\\", in: inTry + "/findUserByToken/User.findOne" });
        else {
            const [token, tokenDeathTime] = generateResetPasswordToken_1.generateToken(user.rememberMe);
            try {
                const newUser = yield user_1.default.findByIdAndUpdate(user._id, { token, tokenDeathTime }, { new: true }).exec();
                if (!newUser)
                    res.status(500)
                        .json({ error: "not updated? /ᐠ｡ꞈ｡ᐟ\\", in: inTry + "/User.findByIdAndUpdate", });
                else {
                    f(req, res, newUser._doc);
                }
            }
            catch (e) {
                res.status(500).json({
                    error: "some error: " + e.message,
                    info: "Back doesn't know what the error is... ^._.^",
                    errorObject: config_1.DEV_VERSION && Object.assign({}, e),
                    in: inTry + "/User.findByIdAndUpdate",
                });
            }
        }
    }
    catch (e) {
        res.status(500).json({
            error: "some error: " + e.message,
            info: "Back doesn't know what the error is... ^._.^",
            errorObject: config_1.DEV_VERSION && Object.assign({}, e),
            in: inTry + "/findUserByToken/User.findOne",
        });
    }
});
exports.status500 = (res, e, user, inTry) => {
    const error = {
        error: "some error: " + e.message,
        errorObject: config_1.DEV_VERSION && Object.assign({}, e),
        in: inTry,
        info: "Back doesn't know what the error is... ^._.^",
    };
    console.log("error-nya-500: ", error);
    res.cookie("token", user.token, Object.assign(Object.assign({}, app_1.cookieSettings), { expires: new Date(user.tokenDeathTime || 0) })).status(500).json(error);
};
exports.status400 = (res, e, user, inTry) => {
    const error = {
        error: e,
        in: inTry,
        info: "Check your request! /ᐠ-ꞈ-ᐟ\\",
    };
    console.log("error-nya-400: ", error);
    res.cookie("token", user.token, Object.assign(Object.assign({}, app_1.cookieSettings), { expires: new Date(user.tokenDeathTime || 0) })).status(400).json(error);
};
//# sourceMappingURL=findUserByToken.js.map