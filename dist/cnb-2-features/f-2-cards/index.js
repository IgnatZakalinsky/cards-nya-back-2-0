"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCardPacks_1 = require("./c-1-controllers/packs/getCardPacks");
const findUserByToken_1 = require("../f-1-auth/a-3-helpers/h-2-users/findUserByToken");
const addCardsPack_1 = require("./c-1-controllers/packs/addCardsPack");
const deleteCardsPack_1 = require("./c-1-controllers/packs/deleteCardsPack");
const updateCardsPack_1 = require("./c-1-controllers/packs/updateCardsPack");
const getCards_1 = require("./c-1-controllers/cards/getCards");
const addCard_1 = require("./c-1-controllers/cards/addCard");
const deleteCard_1 = require("./c-1-controllers/cards/deleteCard");
const updateCard_1 = require("./c-1-controllers/cards/updateCard");
const updateGrade_1 = require("./c-1-controllers/grade/updateGrade");
const cards = express_1.default.Router();
cards.get('/pack', findUserByToken_1.findUserByToken(getCardPacks_1.getCardPacks, 'getCardPacks', true));
cards.post('/pack', findUserByToken_1.findUserByToken(addCardsPack_1.addCardsPack, 'addCardsPack'));
cards.put('/pack', findUserByToken_1.findUserByToken(updateCardsPack_1.updateCardsPack, 'updateCardsPack'));
cards.delete('/pack', findUserByToken_1.findUserByToken(deleteCardsPack_1.deleteCardsPack, 'deleteCardsPack', true));
cards.get('/card', findUserByToken_1.findUserByToken(getCards_1.getCards, 'getCards', true));
cards.post('/card', findUserByToken_1.findUserByToken(addCard_1.addCard, 'addCard'));
cards.put('/card', findUserByToken_1.findUserByToken(updateCard_1.updateCard, 'updateCard'));
cards.delete('/card', findUserByToken_1.findUserByToken(deleteCard_1.deleteCard, 'deleteCard', true));
cards.put('/grade', findUserByToken_1.findUserByToken(updateGrade_1.updateGrade, 'updateGrade'));
exports.default = cards;
//# sourceMappingURL=index.js.map