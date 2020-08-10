"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookie = exports.cookieSettings = void 0;
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("./config");
exports.cookieSettings = config_1.DEV_VERSION ? {} : { sameSite: "none", secure: true };
exports.cookie = (app) => {
    // const whitelist = ['http://localhost:3000', 'http://example2.com'];
    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            // if(whitelist.includes(origin || ""))
            //     return callback(null, true)
            //
            // callback(new Error('Not allowed by CORS'));
            console.log("origin: ", origin);
            callback(null, true); // everyone is allowed
        }
    };
    app.use(cors_1.default(corsOptions));
    app.use(cookie_parser_1.default());
};
//# sourceMappingURL=cookie.js.map