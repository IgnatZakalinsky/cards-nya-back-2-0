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
exports.logOut = void 0;
const cookie_1 = require("../../../cnb-1-main/cookie");
const logOut = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", Object.assign(Object.assign({}, cookie_1.cookieSettings), { expires: new Date(0) })).status(200).json({ info: "logOut success —ฅ/ᐠ.̫ .ᐟ\\ฅ—" });
});
exports.logOut = logOut;
//# sourceMappingURL=logOut.js.map