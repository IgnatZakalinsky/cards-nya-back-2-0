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
const findUserByToken_1 = require("../../../f-1-auth/a-3-helpers/h-2-users/findUserByToken");
const card_1 = __importDefault(require("../../c-2-models/card"));
exports.addCard = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { card } = req.body;
    const cardsPack_idF = (card && card.cardsPack_id) || '';
    if (!card)
        findUserByToken_1.status400(res, `No cardsPack in body!`, user, 'addCard');
    else
        cardsPack_1.default.findById(cardsPack_idF)
            .exec()
            .then((oldCardsPack) => {
            if (!oldCardsPack)
                findUserByToken_1.status400(res, `CardsPack id not valid`, user, 'addCard');
            else if (!oldCardsPack.user_id.equals(user._id))
                findUserByToken_1.status400(res, `not your CardsPack`, user, 'addCard');
            else {
                const answerF = card.answer || 'no answer';
                const questionF = card.question || 'no question';
                const typeF = card.type || 'card';
                const gradeF = isFinite(card.grade) ? +card.grade : 0;
                const shotsF = isFinite(card.shots) ? +card.shots : 0;
                if (gradeF > 5 || gradeF < 0)
                    findUserByToken_1.status400(res, `CardsPack grade [${gradeF}] not valid! must be between 0 and 5...`, user, 'addCard');
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
                        type: typeF,
                        rating: 0
                    })
                        .then((newCard) => {
                        card_1.default.count({ cardsPack_id: cardsPack_idF })
                            .exec()
                            .then(cardsTotalCount => {
                            cardsPack_1.default.findByIdAndUpdate(cardsPack_idF, { cardsCount: cardsTotalCount }, { new: true })
                                .exec()
                                .then((updatedCardsPack) => {
                                if (!updatedCardsPack)
                                    findUserByToken_1.status400(res, `never`, user, 'addCard');
                                else
                                    res.status(201).json({
                                        newCard,
                                        success: true,
                                        token: user.token,
                                        tokenDeathTime: user.tokenDeathTime
                                    });
                            })
                                .catch(e => findUserByToken_1.status500(res, e, user, 'addCard/CardsPack.findByIdAndUpdate'));
                        })
                            .catch(e => findUserByToken_1.status500(res, e, user, 'addCard/Card.count'));
                    })
                        .catch(e => findUserByToken_1.status500(res, e, user, 'addCard/Card.create'));
            }
        })
            .catch(e => findUserByToken_1.status500(res, e, user, 'addCard/CardsPack.findById'));
});
//# sourceMappingURL=addCard.js.map