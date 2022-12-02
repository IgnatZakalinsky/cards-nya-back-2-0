"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const init = (socket, messages, users, user) => (arg, answerF) => {
    socket.emit("init-messages-published", messages);
    if (typeof arg === "string") {
        const userF = users.find(u => u._id === arg);
        if (!userF)
            answerF && answerF("I don't have user with id = " + arg);
        else {
            user._id = userF._id;
            user.name = userF.name;
            user.avatar = userF.avatar;
            user.socket = socket;
            answerF && answerF("find user success!");
        }
    }
};
exports.init = init;
//# sourceMappingURL=init.js.map