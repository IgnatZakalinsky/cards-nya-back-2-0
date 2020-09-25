import express from "express";
import {findUserByToken} from "../f-1-auth/a-3-helpers/h-2-more/findUserByToken";
import {getUsers} from "./s-1-controllers/getUsers";
// import {addGeneralMessage} from "./s-1-controllers/addGeneralMessage";
// import {getGeneralMessages} from "./s-1-controllers/getGeneralMessages";
import {getUser} from "./s-1-controllers/getUser";

const social = express.Router();

social.get('/users', findUserByToken(getUsers, 'getUsers'));
social.get('/user', findUserByToken(getUser, 'getUser'));
// social.post('/general/message', findUserByToken(addGeneralMessage, 'addGeneralMessage'));
// social.get('/general/message', findUserByToken(getGeneralMessages, 'getGeneralMessages'));

export default social;
