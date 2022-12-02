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
exports.getUsersForDev = void 0;
// import User from "../a-2-models/user";
// import {DEV_VERSION} from "../../../cnb-1-main/config";
const getUsersForDev = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (DEV_VERSION) {
    //     try {
    //         const users = await User.find({isAdmin: false})
    //             .select("_id email rememberMe isAdmin name created updated")
    //             .exec();
    //
    //         res.status(200)
    //             .json({users, warnings: "This endpoint will be deleted!!! Just for development!!! —ฅ/ᐠ.̫ .ᐟ\\ฅ—"});
    //
    //     } catch (e) {
    //         res.status(500).json({
    //             error: "some error: " + e.message,
    //             info: "Back doesn't know what the error is... ^._.^",
    //             errorObject: {...e},
    //             in: "getUsersForDev/User.find",
    //         });
    //     }
    // } else {
    res.status(401).json({ error: "endpoint is closed /ᐠ-ꞈ-ᐟ\\", in: "getUsersForDev" });
    // }
});
exports.getUsersForDev = getUsersForDev;
//# sourceMappingURL=getUsersForDev.js.map