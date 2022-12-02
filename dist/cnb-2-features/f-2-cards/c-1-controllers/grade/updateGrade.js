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
const card_1 = __importDefault(require("../../c-2-models/card"));
const grade_1 = __importDefault(require("../../c-2-models/grade"));
const errorStatuses_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses");
const cookie_1 = require("../../../../cnb-1-main/cookie");
const updateGrade = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { grade, card_id } = req.body;
    if (!grade)
        (0, errorStatuses_1.status400)(res, "No grade in body! /ᐠ-ꞈ-ᐟ\\", user, "updateGrade");
    else if (!card_id)
        (0, errorStatuses_1.status400)(res, "No Card id in body! /ᐠ-ꞈ-ᐟ\\", user, "updateGrade");
    else {
        const gradeF = isFinite(grade) ? +grade : undefined;
        if (!gradeF || (gradeF && (gradeF > 5 || gradeF < 0)))
            (0, errorStatuses_1.status400)(res, `Grade [${gradeF}] not valid! must be between 0 and 5... /ᐠ-ꞈ-ᐟ\\`, user, "updateGrade");
        else
            card_1.default.findById(card_id)
                .exec()
                .then((oldCard) => {
                if (!oldCard)
                    (0, errorStatuses_1.status400)(res, "Card id not valid /ᐠ-ꞈ-ᐟ\\", user, "updateGrade");
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
                                more_id: user._id,
                                created: new Date(),
                                updated: new Date(),
                                _doc: {},
                            })
                                .then((newGrade) => {
                                (0, cookie_1.resCookie)(res, user).status(201).json({
                                    updatedGrade: newGrade,
                                    token: user.token,
                                    tokenDeathTime: user.tokenDeathTime
                                });
                            })
                                .catch(e => (0, errorStatuses_1.status500)(res, e, user, "updateGrade/Grade.create"));
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
                                    (0, errorStatuses_1.status400)(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "updateGrade");
                                else
                                    (0, cookie_1.resCookie)(res, user).status(200).json({
                                        updatedGrade,
                                        token: user.token,
                                        tokenDeathTime: user.tokenDeathTime
                                    });
                            })
                                .catch(e => (0, errorStatuses_1.status500)(res, e, user, "updateCard/Card.findByIdAndUpdate"));
                        }
                    })
                        .catch(e => (0, errorStatuses_1.status500)(res, e, user, "updateGrade/Grade.findOne"));
                }
            })
                .catch(e => (0, errorStatuses_1.status500)(res, e, user, "updateGrade/Card.findById"));
    }
});
exports.updateGrade = updateGrade;
//# sourceMappingURL=updateGrade.js.map