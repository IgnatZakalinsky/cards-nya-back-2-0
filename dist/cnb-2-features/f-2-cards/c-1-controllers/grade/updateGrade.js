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
exports.updateGrade = void 0;
const findUserByToken_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/findUserByToken");
const card_1 = __importDefault(require("../../c-2-models/card"));
const grade_1 = __importDefault(require("../../c-2-models/grade"));
exports.updateGrade = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { grade, card_id } = req.body;
    if (!grade)
        findUserByToken_1.status400(res, `No grade in body!`, user, 'updateGrade');
    else if (!card_id)
        findUserByToken_1.status400(res, `No Card id in body!`, user, 'updateGrade');
    else {
        const gradeF = isFinite(grade) ? +grade : undefined;
        if (!gradeF || (gradeF && (gradeF > 5 || gradeF < 0)))
            findUserByToken_1.status400(res, `Grade [${gradeF}] not valid! must be between 0 and 5...`, user, 'updateGrade');
        else
            card_1.default.findById(card_id)
                .exec()
                .then((oldCard) => {
                if (!oldCard)
                    findUserByToken_1.status400(res, `Card id not valid`, user, 'updateGrade');
                else {
                    grade_1.default.findOne({ user_id: user._id, card_id })
                        .then((oldGrade) => {
                        if (!oldGrade) {
                            grade_1.default.create({
                                cardsPack_id: oldCard.cardsPack_id,
                                card_id: oldCard._id,
                                user_id: user._id,
                                grade: gradeF,
                                shots: 1,
                            })
                                .then((newGrade) => {
                                res.status(201).json({
                                    updatedGrade: newGrade,
                                    token: user.token,
                                    tokenDeathTime: user.tokenDeathTime
                                });
                            })
                                .catch(e => findUserByToken_1.status500(res, e, user, 'updateGrade/Grade.create'));
                        }
                        else {
                            const newShotsF = oldGrade.shots + 1;
                            const newGradeF = ((oldGrade.grade * oldGrade.shots) + gradeF) / newShotsF;
                            grade_1.default.findByIdAndUpdate(oldGrade._id, {
                                grade: newGradeF,
                                shots: newShotsF,
                            }, { new: true })
                                .exec()
                                .then((updatedGrade) => {
                                if (!updatedGrade)
                                    findUserByToken_1.status400(res, `never`, user, 'updateGrade');
                                else
                                    res.status(200).json({
                                        updatedGrade,
                                        token: user.token,
                                        tokenDeathTime: user.tokenDeathTime
                                    });
                            })
                                .catch(e => findUserByToken_1.status500(res, e, user, 'updateCard/Card.findByIdAndUpdate'));
                        }
                    })
                        .catch(e => findUserByToken_1.status500(res, e, user, 'updateGrade/Grade.findOne'));
                }
            })
                .catch(e => findUserByToken_1.status500(res, e, user, 'updateGrade/Card.findById'));
    }
});
//# sourceMappingURL=updateGrade.js.map