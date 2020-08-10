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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const app_1 = require("../../../cnb-1-main/app");
exports.getMe = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const body = Object.assign({}, user);
    delete body.password; // don't send password to the front
    delete body.resetPasswordToken;
    delete body.resetPasswordTokenDeathTime;
    res.cookie("token", user.token, Object.assign(Object.assign({}, app_1.cookieSettings), { expires: new Date(user.tokenDeathTime || 0) })).status(200).json(Object.assign({}, body));
});
//# sourceMappingURL=getMe.js.map