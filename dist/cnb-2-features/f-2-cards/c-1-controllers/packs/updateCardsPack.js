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
exports.updateCardsPack = void 0;
const findUserByToken_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/findUserByToken");
const cardsPack_1 = __importDefault(require("../../c-2-models/cardsPack"));
exports.updateCardsPack = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { cardsPack } = req.body;
    if (!cardsPack)
        findUserByToken_1.status400(res, `No cardsPack in body!`, user, 'updateCardsPack');
    else if (!cardsPack._id)
        findUserByToken_1.status400(res, `No CardsPack id`, user, 'updateCardsPack');
    else {
        const nameF = cardsPack.name || undefined;
        const pathF = cardsPack.path || undefined;
        const typeF = cardsPack.type || undefined;
        const gradeF = isFinite(cardsPack.grade) ? +cardsPack.grade : undefined;
        const shotsF = isFinite(cardsPack.shots) && +cardsPack.shots >= 0 ? +cardsPack.shots : undefined;
        if (gradeF && (gradeF > 5 || gradeF < 0))
            findUserByToken_1.status400(res, `CardsPack grade [${gradeF}] not valid! must be between 0 and 5...`, user, 'updateCardsPack');
        else
            cardsPack_1.default.findById(cardsPack._id)
                .exec()
                .then((oldCardsPack) => {
                if (!oldCardsPack)
                    findUserByToken_1.status400(res, `CardsPack id not valid`, user, 'updateCardsPack');
                else if (!oldCardsPack.user_id.equals(user._id))
                    findUserByToken_1.status400(res, `not your CardsPack`, user, 'updateCardsPack');
                else
                    cardsPack_1.default.findByIdAndUpdate(cardsPack._id, {
                        private: !!cardsPack.private,
                        name: nameF || oldCardsPack.name,
                        path: pathF || oldCardsPack.path,
                        type: typeF || oldCardsPack.type,
                        grade: gradeF || oldCardsPack.grade,
                        shots: shotsF || oldCardsPack.shots,
                        deckCover: cardsPack.deckCover,
                    }, { new: true })
                        .exec()
                        .then((updatedCardsPack) => {
                        if (!updatedCardsPack)
                            findUserByToken_1.status400(res, `never`, user, 'updateCardsPack');
                        else
                            res.status(200).json({
                                updatedCardsPack,
                                success: true,
                                token: user.token,
                                tokenDeathTime: user.tokenDeathTime
                            });
                    })
                        .catch(e => findUserByToken_1.status500(res, e, user, 'updateCardsPack/CardsPack.findByIdAndUpdate'));
            })
                .catch(e => findUserByToken_1.status500(res, e, user, 'updateCardsPack/CardsPack.findById'));
    }
});
//# sourceMappingURL=updateCardsPack.js.map