"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const config_1 = require("./config");
const f_1_auth_1 = __importDefault(require("../cnb-2-features/f-1-auth"));
const f_2_cards_1 = __importDefault(require("../cnb-2-features/f-2-cards"));
const f_3_social_1 = __importDefault(require("../cnb-2-features/f-3-social"));
exports.routes = (app) => {
    app.use(config_1.VERSION_2_0 + "/auth", f_1_auth_1.default);
    app.use(config_1.VERSION_2_0 + "/cards", f_2_cards_1.default);
    app.use(config_1.VERSION_2_0 + "/social", f_3_social_1.default);
    // ping endpoint
    app.use(config_1.VERSION_2_0 + "/ping", (req, res) => {
        // save statistic
        const backTime = new Date().getTime();
        const frontTime = +req.body.frontTime || (req.query.frontTime && +req.query.frontTime) || (backTime + 1);
        const ping = backTime - frontTime;
        console.warn("!!! PING: ", ping); // need log always
        res.status(200).json({
            ping,
            backTime,
            frontTime: frontTime > backTime ? "—ฅ/ᐠ.̫ .ᐟ\\ฅ—" : frontTime,
            info: "please send me you time —ฅ/ᐠ.̫ .ᐟ\\ฅ—",
        });
    });
    // default
    app.use((req, res) => {
        console.log("Nya-bad url: ", req.method, req.url);
        res.status(404).json({
            error: "bad url /ᐠ｡ꞈ｡ᐟ\\",
            method: req.method,
            url: req.url,
            query: req.query,
            body: req.body,
        });
    });
};
//# sourceMappingURL=routes.js.map