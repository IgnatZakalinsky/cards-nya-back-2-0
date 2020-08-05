"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION_2_0 = exports.VERSION_1_0 = exports.DEV_VERSION = exports.MongoDBUris = void 0;
const USER_NAME = process.env.MONGO_DB_USER_NAME || "ai73aaa";
const PASSWORD = process.env.MONGO_DB_USER_PASSWORD || "1qazxcvBG";
const MONGO_DB_URL = process.env.MONGO_DB_URL || "neko0-iwojt.mongodb.net/nekobd"; // bd for tests
exports.MongoDBUris = `mongodb+srv://${USER_NAME}:${PASSWORD}@${MONGO_DB_URL}?retryWrites=true&w=majority`;
exports.DEV_VERSION = false;
exports.VERSION_1_0 = "/1.0";
exports.VERSION_2_0 = "/2.0";
//# sourceMappingURL=config.js.map