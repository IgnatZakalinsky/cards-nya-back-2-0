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
exports.addCard = void 0;
const cardsPack_1 = __importDefault(require("../../c-2-models/cardsPack"));
const card_1 = __importDefault(require("../../c-2-models/card"));
const errorStatuses_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses");
const cookie_1 = require("../../../../cnb-1-main/cookie");
const addCard = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { card } = req.body;
    const cardsPack_idF = (card && card.cardsPack_id) || "";
    if (!card)
        (0, errorStatuses_1.status400)(res, "No cardsPack in body! /ᐠ-ꞈ-ᐟ\\", user, "addCard", { body: req.body });
    else if (!cardsPack_idF)
        (0, errorStatuses_1.status400)(res, "No cardsPack_id in card! /ᐠ-ꞈ-ᐟ\\", user, "addCard", { body: req.body });
    else
        cardsPack_1.default.findById(cardsPack_idF)
            .exec()
            .then((oldCardsPack) => {
            if (!oldCardsPack)
                (0, errorStatuses_1.status400)(res, "CardsPack id not valid /ᐠ-ꞈ-ᐟ\\", user, "addCard", { body: req.body });
            else if (!oldCardsPack.user_id.equals(user._id))
                (0, errorStatuses_1.status400)(res, "not your CardsPack! /ᐠ｡ꞈ｡ᐟ\\", user, "addCard", { body: req.body });
            else {
                const answerF = card.answer || "no answer";
                const questionF = card.question || "no question";
                const typeF = card.type || "card";
                const gradeF = isFinite(card.grade) ? +card.grade : 0;
                const shotsF = isFinite(card.shots) ? +card.shots : 0;
                if (gradeF > 5 || gradeF < 0)
                    (0, errorStatuses_1.status400)(res, `CardsPack grade [${gradeF}] not valid! must be between 0 and 5... /ᐠ-ꞈ-ᐟ\\`, user, "addCard");
                else
                    card_1.default.create({
                        cardsPack_id: cardsPack_idF,
                        user_id: user._id,
                        answer: answerF,
                        question: questionF,
                        grade: gradeF,
                        shots: shotsF,
                        questionImg: card.questionImg,
                        answerImg: card.answerImg,
                        answerVideo: card.answerVideo,
                        questionVideo: card.questionVideo,
                        comments: "",
                        type: typeF,
                        rating: 0,
                        more_id: user._id,
                        created: new Date(),
                        updated: new Date(),
                        _doc: {}, // crutch
                    })
                        .then((newCard) => {
                        card_1.default.count({ cardsPack_id: cardsPack_idF })
                            .exec()
                            .then(cardsTotalCount => {
                            cardsPack_1.default.findByIdAndUpdate(cardsPack_idF, { cardsCount: cardsTotalCount }, { new: true })
                                .exec()
                                .then((updatedCardsPack) => {
                                if (!updatedCardsPack)
                                    (0, errorStatuses_1.status400)(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "addCard");
                                else
                                    (0, cookie_1.resCookie)(res, user).status(201).json({
                                        newCard,
                                        token: user.token,
                                        tokenDeathTime: user.tokenDeathTime
                                    });
                            })
                                .catch(e => (0, errorStatuses_1.status500)(res, e, user, "addCard/CardsPack.findByIdAndUpdate"));
                        })
                            .catch(e => (0, errorStatuses_1.status500)(res, e, user, "addCard/Card.count"));
                    })
                        .catch(e => (0, errorStatuses_1.status500)(res, e, user, "addCard/Card.create"));
            }
        })
            .catch(e => (0, errorStatuses_1.status500)(res, e, user, "addCard/CardsPack.findById"));
});
exports.addCard = addCard;
//# sourceMappingURL=addCard.js.map