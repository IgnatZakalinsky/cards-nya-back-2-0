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
const cookie_1 = require("../../../cnb-1-main/cookie");
exports.getMe = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const body = Object.assign({}, user);
    delete body.password; // don't send password to the front
    delete body.resetPasswordToken;
    delete body.resetPasswordTokenDeathTime;
    cookie_1.resCookie(res, user).status(200).json(Object.assign({}, body));
});
//# sourceMappingURL=getMe.js.map