import {UserInMessage} from "./index";
import {Socket} from "socket.io";

export const clientNameSent = (
    socket: Socket,
    users: Array<UserInMessage & { socket?: Socket }>,
    user: UserInMessage & { socket?: Socket }
) => (arg: any, answerF: Function) =>{
    console.log("name: " + arg);
    if (typeof arg !== "string") answerF && answerF("Name not string!");

    else {
        answerF && answerF(user._id);

        if (!users.find(u => u.socket === socket)) {
            users.push(user);
        }

        user.name = arg;
    }
};