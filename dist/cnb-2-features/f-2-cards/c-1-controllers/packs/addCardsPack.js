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
exports.addCardsPack = void 0;
const user_1 = __importDefault(require("../../../f-1-auth/a-2-models/user"));
const cardsPack_1 = __importDefault(require("../../c-2-models/cardsPack"));
const findUserByToken_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/findUserByToken");
exports.addCardsPack = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardsPack } = req.body;
    if (!cardsPack)
        findUserByToken_1.status400(res, `No cardsPack in body!`, user, 'addCardsPack');
    else {
        const nameF = cardsPack.name || 'no Name';
        const pathF = cardsPack.path || '/def';
        const typeF = cardsPack.type || 'pack';
        const gradeF = isFinite(cardsPack.grade) ? +cardsPack.grade : 0;
        const shotsF = isFinite(cardsPack.shots) ? +cardsPack.shots : 0;
        // add private
        if (gradeF > 5 || gradeF < 0)
            findUserByToken_1.status400(res, `CardsPack grade [${gradeF}] not valid! must be between 0 and 5...`, user, 'addCardsPack');
        else
            cardsPack_1.default.create({
                user_id: user._id,
                user_name: user.name,
                private: !!cardsPack.private,
                name: nameF,
                path: pathF,
                grade: gradeF,
                shots: shotsF,
                deckCover: cardsPack.deckCover,
                cardsCount: 0,
                type: typeF,
                rating: 0
            })
                .then((newCardsPack) => {
                cardsPack_1.default.count({ user_id: user._id, private: false })
                    .exec()
                    .then(cardPacksTotalCount => {
                    user_1.default.findByIdAndUpdate(user._id, { publicCardPacksCount: cardPacksTotalCount }, { new: true })
                        .exec()
                        .then((updatedUser) => {
                        if (!updatedUser)
                            findUserByToken_1.status400(res, `never`, user, 'addCardsPack');
                        else
                            res.status(201).json({
                                newCardsPack,
                                success: true,
                                token: user.token,
                                tokenDeathTime: user.tokenDeathTime
                            });
                    })
                        .catch(e => findUserByToken_1.status500(res, e, user, 'addCardsPack/User.findByIdAndUpdate'));
                })
                    .catch(e => findUserByToken_1.status500(res, e, user, 'addCardsPack/CardsPack.count'));
            })
                .catch(e => findUserByToken_1.status500(res, e, user, 'addCardsPack/CardsPack.create'));
    }
});
//# sourceMappingURL=addCardsPack.js.map