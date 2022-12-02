"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status400 = exports.status500 = void 0;
const config_1 = require("../../../../cnb-1-main/config");
const cookie_1 = require("../../../../cnb-1-main/cookie");
const status500 = (res, e, user, inTry) => {
    const error = {
        error: "some error: " + e.message,
        errorObject: config_1.DEV_VERSION && Object.assign({}, e),
        in: inTry,
        info: "Back doesn't know what the error is... ^._.^",
    };
    console.log("error-nya-500: ", error);
    res.cookie("token", user.token, Object.assign(Object.assign({}, cookie_1.cookieSettings), { expires: new Date(user.tokenDeathTime || 0) })).status(500).json(error);
};
exports.status500 = status500;
const status400 = (res, e, user, inTry, more) => {
    const error = {
        more,
        error: e,
        in: inTry,
        info: "Check your request! /ᐠ-ꞈ-ᐟ\\",
    };
    console.log("error-nya-400: ", error);
    res.cookie("token", user.token, Object.assign(Object.assign({}, cookie_1.cookieSettings), { expires: new Date(user.tokenDeathTime || 0) })).status(400).json(error);
};
exports.status400 = status400;
//# sourceMappingURL=errorStatuses.js.map