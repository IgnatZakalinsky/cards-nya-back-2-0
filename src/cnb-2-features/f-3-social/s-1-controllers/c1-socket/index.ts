import {Server, Socket} from "socket.io";
import {v1} from "uuid";
import {init} from "./init";
import {clientMessageSent} from "./clientMessageSent";
import {clientNameSent} from "./clientNameSent";

export type UserInMessage = {
    _id: string,
    name: string
}
export type Message = {
    _id: string,
    message: string,
    user: UserInMessage,
}

const messages: Message[] = [{message: "start", _id: v1(), user: {_id: v1(), name: "neko-admin"}}];
const users: Array<UserInMessage & {socket?: Socket}> = [{_id: v1(), name: "test", socket: undefined}];

export const onConnect = (socketServer: Server) => (socket: Socket) => {
    console.log("a user connected");
    const user: UserInMessage & { socket?: Socket } = {_id: v1(), name: "anonymous", socket};

    socket.on("init", init(socket, messages, users, user));
    socket.on("client-message-sent", clientMessageSent(socketServer, socket, users, user));
    socket.on("client-name-sent", clientNameSent(socket, users, user));

        // socket.broadcast.emit('new-message-sent', {}) // всем кроме себя

    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
};