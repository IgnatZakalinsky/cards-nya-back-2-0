"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCardPacks_1 = require("./c-1-controllers/packs/getCardPacks");
const findUserByToken_1 = require("../f-1-auth/a-3-helpers/h-2-more/findUserByToken");
// import {addCardsPack} from "./c-1-controllers/packs/addCardsPack";
// import {deleteCardsPack} from "./c-1-controllers/packs/deleteCardsPack";
// import {updateCardsPack} from "./c-1-controllers/packs/updateCardsPack";
// import {getCards} from "./c-1-controllers/cards/getCards";
// import {addCard} from "./c-1-controllers/cards/addCard";
// import {deleteCard} from "./c-1-controllers/cards/deleteCard";
// import {updateCard} from "./c-1-controllers/cards/updateCard";
// import {updateGrade} from "./c-1-controllers/grade/updateGrade";
const cards = express_1.default.Router();
cards.get("/pack", findUserByToken_1.findUserByToken(getCardPacks_1.getCardPacks, "getCardPacks"));
// cards.post('/pack', findUserByToken(addCardsPack, 'addCardsPack'));
// cards.put('/pack', findUserByToken(updateCardsPack, 'updateCardsPack'));
// cards.delete('/pack', findUserByToken(deleteCardsPack, 'deleteCardsPack', true));
//
// cards.get('/card', findUserByToken(getCards, 'getCards', true));
// cards.post('/card', findUserByToken(addCard, 'addCard'));
// cards.put('/card', findUserByToken(updateCard, 'updateCard'));
// cards.delete('/card', findUserByToken(deleteCard, 'deleteCard', true));
//
// cards.put('/grade', findUserByToken(updateGrade, 'updateGrade'));
exports.default = cards;
//# sourceMappingURL=index.js.map