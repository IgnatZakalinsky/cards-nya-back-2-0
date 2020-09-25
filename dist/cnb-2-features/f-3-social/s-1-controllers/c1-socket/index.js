"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnect = void 0;
const uuid_1 = require("uuid");
const init_1 = require("./init");
const clientMessageSent_1 = require("./clientMessageSent");
const clientNameSent_1 = require("./clientNameSent");
const messages = [{ message: "start", _id: uuid_1.v1(), user: { _id: uuid_1.v1(), name: "neko-admin" } }];
const users = [{ _id: uuid_1.v1(), name: "test", socket: undefined }];
exports.onConnect = (socketServer) => (socket) => {
    console.log("a user connected");
    const user = { _id: uuid_1.v1(), name: "anonymous", socket };
    socket.on("init", init_1.init(socket, messages, users, user));
    socket.on("client-message-sent", clientMessageSent_1.clientMessageSent(socketServer, socket, users, user));
    socket.on("client-name-sent", clientNameSent_1.clientNameSent(socket, users, user));
    // socket.broadcast.emit('new-message-sent', {}) // всем кроме себя
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
};
//# sourceMappingURL=index.js.map