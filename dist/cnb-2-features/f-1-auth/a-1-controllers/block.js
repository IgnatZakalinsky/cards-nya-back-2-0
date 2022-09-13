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
exports.block = void 0;
const user_1 = __importDefault(require("../a-2-models/user"));
const cookie_1 = require("../../../cnb-1-main/cookie");
const cardsPack_1 = __importDefault(require("../../f-2-cards/c-2-models/cardsPack"));
exports.block = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, blockReason } = req.body;
    if (user.isBlocked) {
        cookie_1.resCookie(res, user).status(400).json({ error: 'you blocked' });
        return;
    }
    const u = yield user_1.default.findById(id);
    if (!u) {
        cookie_1.resCookie(res, user).status(400).json({ error: 'no user by id: ' + id, body: req.body });
        return;
    }
    if (u.isBlocked) {
        cookie_1.resCookie(res, user).status(200).json({ warning: 'user was blocked' });
        return;
    }
    u.blockReason = blockReason;
    u.blockTime = Date.now();
    u.blockUserId = user._id + '';
    u.isBlocked = true;
    const ps = yield cardsPack_1.default.find({ user_id: u._id.toString() });
    for (let p of ps) {
        yield cardsPack_1.default.findByIdAndUpdate(p._id, { isBlocked: true });
    }
    cookie_1.resCookie(res, user).status(200).json({ user: 'blocked', blockedCardPacksCount: ps.length });
});
//# sourceMappingURL=block.js.map