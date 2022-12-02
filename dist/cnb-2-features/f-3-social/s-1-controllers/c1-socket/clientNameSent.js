"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientNameSent = void 0;
const clientNameSent = (socket, users, user) => (arg, answerF) => {
    console.log("name: " + arg);
    if (typeof arg !== "string")
        answerF && answerF("Name not string!");
    else {
        answerF && answerF(user._id);
        if (!users.find(u => u.socket === socket)) {
            users.push(user);
        }
        user.name = arg;
    }
};
exports.clientNameSent = clientNameSent;
//# sourceMappingURL=clientNameSent.js.map