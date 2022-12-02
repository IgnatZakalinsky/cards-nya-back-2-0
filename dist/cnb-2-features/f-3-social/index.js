"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const findUserByToken_1 = require("../f-1-auth/a-3-helpers/h-2-more/findUserByToken");
const getUsers_1 = require("./s-1-controllers/getUsers");
// import {addGeneralMessage} from "./s-1-controllers/addGeneralMessage";
// import {getGeneralMessages} from "./s-1-controllers/getGeneralMessages";
const getUser_1 = require("./s-1-controllers/getUser");
const social = express_1.default.Router();
social.get('/users', (0, findUserByToken_1.findUserByToken)(getUsers_1.getUsers, 'getUsers'));
social.get('/user', (0, findUserByToken_1.findUserByToken)(getUser_1.getUser, 'getUser'));
// social.post('/general/message', findUserByToken(addGeneralMessage, 'addGeneralMessage'));
// social.get('/general/message', findUserByToken(getGeneralMessages, 'getGeneralMessages'));
exports.default = social;
//# sourceMappingURL=index.js.map