"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = void 0;
const card_1 = __importDefault(require("../../c-2-models/card"));
const cardsPack_1 = __importDefault(require("../../c-2-models/cardsPack"));
const errorStatuses_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses");
const cookie_1 = require("../../../../cnb-1-main/cookie");
exports.deleteCard = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (!id)
        errorStatuses_1.status400(res, "No Card id /ᐠ-ꞈ-ᐟ\\", user, "deleteCard", { query: req.query });
    else
        card_1.default.findById(id)
            .exec()
            .then((cardF) => {
            if (!cardF)
                errorStatuses_1.status400(res, "Card id not valid /ᐠ-ꞈ-ᐟ\\", user, "deleteCard/Card.findById", { query: req.query });
            else if (!cardF.user_id.equals(user._id))
                errorStatuses_1.status400(res, "not your Card! /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCard", { query: req.query });
            else
                card_1.default.findByIdAndDelete(id)
                    .exec()
                    .then((card) => {
                    if (!card)
                        errorStatuses_1.status400(res, "Card id not valid /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCard/Card.findByIdAndDelete", { query: req.query });
                    else {
                        card_1.default.count({ cardsPack_id: card.cardsPack_id })
                            .exec()
                            .then(cardsTotalCount => {
                            cardsPack_1.default.findByIdAndUpdate(card.cardsPack_id, { cardsCount: cardsTotalCount }, { new: true })
                                .exec()
                                .then((updatedCardsPack) => {
                                if (!updatedCardsPack)
                                    errorStatuses_1.status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCard");
                                else
                                    cookie_1.resCookie(res, user).status(200).json({
                                        deletedCard: card,
                                        token: user.token,
                                        tokenDeathTime: user.tokenDeathTime
                                    });
                            })
                                .catch(e => errorStatuses_1.status500(res, e, user, "deleteCard/CardsPack.findByIdAndUpdate"));
                        })
                            .catch(e => errorStatuses_1.status500(res, e, user, "deleteCard/Card.count"));
                    }
                })
                    .catch(e => errorStatuses_1.status500(res, e, user, "deleteCard/Card.findByIdAndDelete"));
        })
            .catch(e => errorStatuses_1.status500(res, e, user, "deleteCard/Card.findById"));
});
//# sourceMappingURL=deleteCard.js.map