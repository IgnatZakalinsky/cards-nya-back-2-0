"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const filePost_1 = require("./f-1-controllers/filePost");
const file = express_1.default.Router();
filePost_1.filePost('/', file);
filePost_1.fileGet('/', file);
exports.default = file;
//# sourceMappingURL=index.js.map