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
exports.generateToken = exports.generateResetPasswordToken = void 0;
const user_1 = __importDefault(require("../../a-2-models/user"));
const uuid_1 = require("uuid");
const generateResetPasswordToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const chars = "ADEFGHJLMNPQRTYabdefghijmnpqrty2345679!@#$%^&*()-+=?.,"; // Il1Oo0CcSsUuVvWwXxZzB8Kk
    //
    // let password = "";
    // for (let i = 0; i < 9; i++) {
    //     password += chars[Math.floor(Math.random() * chars.length)];
    // }
    const resetPasswordToken = (0, uuid_1.v1)();
    yield user_1.default.findByIdAndUpdate(userId, { resetPasswordToken, resetPasswordTokenDeathTime: Date.now() + (1000 * 60 * 10) }, // 10 min
    { new: true }).exec();
    return resetPasswordToken;
});
exports.generateResetPasswordToken = generateResetPasswordToken;
const generateToken = (rememberMe) => {
    const token = (0, uuid_1.v1)();
    const tokenDeathTime = rememberMe
        ? Date.now() + (1000 * 60 * 60 * 24 * 7) // 7 days
        : Date.now() + (1000 * 60 * 60 * 3); // 3 hours
    return [token, tokenDeathTime];
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map