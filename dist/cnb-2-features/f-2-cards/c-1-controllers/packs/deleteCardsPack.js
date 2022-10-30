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
exports.deleteCardsPack = void 0;
const user_1 = __importDefault(require("../../../f-1-auth/a-2-models/user"));
const cardsPack_1 = __importDefault(require("../../c-2-models/cardsPack"));
const errorStatuses_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses");
const cookie_1 = require("../../../../cnb-1-main/cookie");
exports.deleteCardsPack = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (!id)
        errorStatuses_1.status400(res, "No CardsPack id /ᐠ-ꞈ-ᐟ\\", user, "deleteCardsPack", { query: req.query });
    else
        cardsPack_1.default.findById(id)
            .exec()
            .then((cardsPackF) => {
            if (!cardsPackF)
                errorStatuses_1.status400(res, "CardsPack id not valid /ᐠ-ꞈ-ᐟ\\", user, "deleteCardsPack/CardsPack.findById", { query: req.query });
            else if (!cardsPackF.user_id.equals(user._id))
                errorStatuses_1.status400(res, "not your CardsPack! /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCardsPack", { query: req.query });
            else
                cardsPack_1.default.findByIdAndDelete(id)
                    .exec()
                    .then((cardsPack) => {
                    if (!cardsPack)
                        errorStatuses_1.status400(res, "CardsPack id not valid /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCardsPack/CardsPack.findByIdAndDelete", { query: req.query });
                    else {
                        cardsPack_1.default.count({ user_id: user._id, private: false })
                            .exec()
                            .then(cardPacksTotalCount => {
                            user_1.default.findByIdAndUpdate(user._id, { publicCardPacksCount: cardPacksTotalCount }, { new: true })
                                .exec()
                                .then((updatedUser) => {
                                if (!updatedUser)
                                    errorStatuses_1.status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCardsPack");
                                else
                                    cookie_1.resCookie(res, user).status(200).json({
                                        deletedCardsPack: cardsPack,
                                        token: user.token,
                                        tokenDeathTime: user.tokenDeathTime,
                                    });
                            })
                                .catch(e => errorStatuses_1.status500(res, e, user, "deleteCardsPack/User.findByIdAndUpdate"));
                        })
                            .catch(e => errorStatuses_1.status500(res, e, user, "deleteCardsPack/CardsPack.count"));
                    }
                })
                    .catch(e => errorStatuses_1.status500(res, e, user, "deleteCardsPack/CardsPack.findByIdAndDelete"));
        })
            .catch(e => errorStatuses_1.status500(res, e, user, "deleteCardsPack/CardsPack.findById"));
});
//# sourceMappingURL=deleteCardsPack.js.map