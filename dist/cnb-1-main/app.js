"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appUse = exports.cookieSettings = void 0;
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("./config");
exports.cookieSettings = config_1.DEV_VERSION ? {} : { sameSite: "none", secure: true };
exports.appUse = (app) => {
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
    // parse application/json
    app.use(body_parser_1.default.json({ limit: "7mb" }));
    // parse application/x-www-form-urlencoded
    app.use(body_parser_1.default.urlencoded({ limit: "7mb", extended: false }));
    // log middleware
    app.use((req, res, next) => {
        console.log("Time: ", new Date().toString());
        console.log("-----", req.method, req.url, "params:", req.params);
        console.log("query:", req.query);
        console.log("body:", req.body);
        console.log("cookies:", req.cookies);
        // console.log("headers:", req.headers);
        // console.log("rawHeaders:", req.rawHeaders);
        next();
    });
};
//# sourceMappingURL=app.js.map