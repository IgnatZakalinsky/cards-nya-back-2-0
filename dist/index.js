"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./cnb-1-main/config");
const app_1 = require("./cnb-1-main/app");
const routes_1 = require("./cnb-1-main/routes");
// yarn upgrade
const app = express_1.default();
app_1.appUse(app);
routes_1.routes(app);
mongoose_1.default.connect(config_1.MongoDBUris, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    console.log("Nya-MongoDB connected successfully");
    app.listen(process.env.PORT, () => {
        console.log("Cards-Nya-back 2.0 listening on port: " + process.env.PORT);
    });
})
    .catch(e => console.log("Nya-MongoDB connection error: ", Object.assign({}, e)));
process.on("unhandledRejection", (reason, p) => {
    console.log("Nya-unhandledRejection: ", reason, p);
});
//# sourceMappingURL=index.js.map