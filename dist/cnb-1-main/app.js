"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appUse = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_1 = require("./cookie");
exports.appUse = (app) => {
    cookie_1.cookie(app);
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