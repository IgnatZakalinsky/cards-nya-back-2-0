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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScrs = void 0;
exports.runScrs = () => __awaiter(void 0, void 0, void 0, function* () {
    // const d = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
    // console.log({date: d})
    //
    // const users = await User
    //     .find({
    //         verified: {$ne: true},
    //         // updated: {$lt: d},
    //         // isBlocked: {$ne: true},
    //         isBlocked: true,
    //     })
    // console.log({l: users.length})
    //
    // let ui = 0
    //
    // for (let u of users) {
    //     // const ps = await CardsPack.find({user_id: users[0]._id.toString()},)
    //
    //     ui++
    //     let pi = 0
    //     // for (let p of ps) {
    //     //     await CardsPack.findByIdAndUpdate(p._id, {isBlocked: true}, {new: true})
    //     //     pi++
    //     //     console.log({l: users.length, ui, pi})
    //     // }
    //     console.log({l: users.length, ui})
    //     await User.findByIdAndUpdate(
    //         u._id,
    //         {
    //             // isBlocked: true,
    //             blockTime: Date.now(),
    //             blockReason: 'не верифицирован емаил более месяца',
    //             blockUserId: 'admin'
    //         }
    //     )
    // }
});
//# sourceMappingURL=scrs.js.map