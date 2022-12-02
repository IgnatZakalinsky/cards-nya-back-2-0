"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientMessageSent = void 0;
const uuid_1 = require("uuid");
const clientMessageSent = (socketServer, socket, users, user, messages) => (arg, answerF) => {
    console.log("message: " + arg);
    if (typeof arg !== "string")
        answerF && answerF("Message not string!");
    else {
        answerF && answerF("ok");
        if (!users.find(u => u.socket === socket)) {
            users.push(user);
        }
        const newM = { message: arg, _id: (0, uuid_1.v1)(), user: { _id: user._id, name: user.name, avatar: user.avatar } };
        messages.push(newM);
        socketServer.emit("new-message-sent", newM);
    }
};
exports.clientMessageSent = clientMessageSent;
//# sourceMappingURL=clientMessageSent.js.map