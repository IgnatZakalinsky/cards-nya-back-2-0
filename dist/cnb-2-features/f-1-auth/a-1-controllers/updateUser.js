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
exports.updateUser = void 0;
const user_1 = __importDefault(require("../a-2-models/user"));
const findUserByToken_1 = require("../a-3-helpers/h-2-users/findUserByToken");
exports.updateUser = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, avatar } = req.body;
    user_1.default.findByIdAndUpdate(user._id, {
        name: name || user.name,
        avatar: avatar || user.avatar
    }, { new: true })
        .exec()
        .then((updatedUser) => {
        if (!updatedUser)
            findUserByToken_1.status400(res, `never`, user, 'updateUser');
        else {
            const body = Object.assign({}, updatedUser._doc);
            delete body.password; // don't send password to the front
            delete body.resetPasswordToken;
            delete body.resetPasswordTokenDeathTime;
            res.status(200).json({
                updatedUser: body,
                success: true,
                token: user.token,
                tokenDeathTime: user.tokenDeathTime
            });
        }
    })
        .catch(e => findUserByToken_1.status500(res, e, user, 'updateUser/User.findByIdAndUpdate'));
});
//# sourceMappingURL=updateUser.js.map