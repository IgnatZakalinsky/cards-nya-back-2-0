"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnect = void 0;
const uuid_1 = require("uuid");
const init_1 = require("./init");
const clientMessageSent_1 = require("./clientMessageSent");
const clientNameSent_1 = require("./clientNameSent");
const messages = [{ message: "start", _id: (0, uuid_1.v1)(), user: { _id: (0, uuid_1.v1)(), name: "neko-admin", avatar: "" } }];
const users = [{ _id: (0, uuid_1.v1)(), name: "test", avatar: "", socket: undefined }];
const onConnect = (socketServer) => (socket) => {
    console.log("a user connected");
    const user = {
        _id: socket.handshake.query._id || (0, uuid_1.v1)(),
        name: socket.handshake.query.name || "anonymous",
        avatar: socket.handshake.query.avatar || '',
        socket
    };
    socket.on("init", (0, init_1.init)(socket, messages, users, user));
    socket.on("client-message-sent", (0, clientMessageSent_1.clientMessageSent)(socketServer, socket, users, user, messages));
    socket.on("client-name-sent", (0, clientNameSent_1.clientNameSent)(socket, users, user));
    // socket.broadcast.emit('new-message-sent', {}) // всем кроме себя
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
};
exports.onConnect = onConnect;
//# sourceMappingURL=index.js.map