import {v1} from "uuid";
import {Server, Socket} from "socket.io";
import {Message, UserInMessage} from "./index";

export const clientMessageSent = (
    socketServer: Server,
    socket: Socket,
    users: Array<UserInMessage & { socket?: Socket }>,
    user: UserInMessage & { socket?: Socket }
) => (arg: any, answerF: Function) => {
    console.log("message: " + arg);
    if (typeof arg !== "string") answerF && answerF("Message not string!");

    else {
        answerF && answerF("ok");

        if (!users.find(u => u.socket === socket)) {
            users.push(user);
        }

        const newM: Message = {message: arg, _id: v1(), user: {_id: user._id, name: user.name}};
        socketServer.emit("new-message-sent", newM);
    }
};