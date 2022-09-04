import {Socket} from "socket.io";
import {Message, UserInMessage} from "./index";

export const init = (
  socket: Socket,
  messages: Message[],
  users: Array<UserInMessage & { socket?: Socket }>,
  user: UserInMessage & { socket?: Socket }
) => (arg: any, answerF: Function) => {
    socket.emit("init-messages-published", messages);

    if (typeof arg === "string") {
        const userF = users.find(u => u._id === arg);

        if (!userF) answerF && answerF("I don't have user with id = " + arg);

        else {
            user._id = userF._id;
            user.name = userF.name;
            user.avatar = userF.avatar;
            user.socket = socket;
            answerF && answerF("find user success!");
        }
    }
};