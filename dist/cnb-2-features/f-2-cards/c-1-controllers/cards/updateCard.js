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
exports.updateCard = void 0;
const card_1 = __importDefault(require("../../c-2-models/card"));
const errorStatuses_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses");
const cookie_1 = require("../../../../cnb-1-main/cookie");
exports.updateCard = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { card } = req.body;
    if (!card)
        errorStatuses_1.status400(res, "No card in body! /ᐠ-ꞈ-ᐟ\\", user, "updateCard", { body: req.body });
    else if (!card._id)
        errorStatuses_1.status400(res, "No Card id /ᐠ-ꞈ-ᐟ\\", user, "updateCard", { body: req.body });
    else {
        const questionF = card.question || undefined;
        const answerF = card.answer || undefined;
        const typeF = card.type || undefined;
        const gradeF = isFinite(card.grade) ? +card.grade : undefined;
        const shotsF = isFinite(card.shots) && +card.shots >= 0 ? +card.shots : undefined;
        if (gradeF && (gradeF > 5 || gradeF < 0))
            errorStatuses_1.status400(res, `Card grade [${gradeF}] not valid! must be between 0 and 5... /ᐠ-ꞈ-ᐟ\\`, user, "updateCard", { body: req.body });
        else
            card_1.default.findById(card._id)
                .exec()
                .then((oldCard) => {
                if (!oldCard)
                    errorStatuses_1.status400(res, "Card id not valid /ᐠ-ꞈ-ᐟ\\", user, "updateCard", { body: req.body });
                else if (!oldCard.user_id.equals(user._id) && !card.comments)
                    errorStatuses_1.status400(res, "not your Card! /ᐠ｡ꞈ｡ᐟ\\", user, "updateCard", { body: req.body });
                else {
                    let update = { comments: oldCard.comments };
                    if (!user._id.equals(oldCard.user_id))
                        update.comments = update.comments + "\n" + card.comments;
                    else {
                        update = {
                            question: questionF || oldCard.question,
                            answer: answerF || oldCard.answer,
                            type: typeF || oldCard.type,
                            grade: gradeF || oldCard.grade,
                            shots: shotsF || oldCard.shots,
                            questionImg: card.questionImg || oldCard.questionImg || "",
                            answerImg: card.answerImg || oldCard.answerImg || "",
                            answerVideo: card.answerVideo || oldCard.answerVideo || "",
                            questionVideo: card.questionVideo || oldCard.questionVideo || "",
                            comments: card.comments || oldCard.comments || ""
                        };
                    }
                    card_1.default.findByIdAndUpdate(card._id, update, { new: true })
                        .exec()
                        .then((updatedCard) => {
                        if (!updatedCard)
                            errorStatuses_1.status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "updateCard");
                        else
                            cookie_1.resCookie(res, user).status(200).json({
                                updatedCard,
                                token: user.token,
                                tokenDeathTime: user.tokenDeathTime
                            });
                    })
                        .catch(e => errorStatuses_1.status500(res, e, user, "updateCard/Card.findByIdAndUpdate"));
                }
            })
                .catch(e => errorStatuses_1.status500(res, e, user, "updateCard/Card.findById"));
    }
});
//# sourceMappingURL=updateCard.js.map