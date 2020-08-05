import {Request, Response} from "express";
import {IUser} from "../../f-1-auth/a-2-models/user";
import {status400, status500} from "../../f-1-auth/a-3-helpers/h-2-users/findUserByToken";
import GeneralChatMessage, {IGeneralChatMessage} from "../s-2-models/generalChatMessage";

export const addGeneralMessage = async (req: Request, res: Response, user: IUser) => {
    const {message} = req.body;

    if (!message) status400(res, `No message in body!`, user, 'addGeneralMessage');

    else {
        GeneralChatMessage.create({
            user_id: user._id,
            user_name: user.name,
            isAdmin: user.isAdmin,
            avatar: user.avatar,

            message,
        })
            .then((newGeneralChatMessage: IGeneralChatMessage) => res.status(201).json({
                newGeneralChatMessage,
                success: true,
                token: user.token,
                tokenDeathTime: user.tokenDeathTime
            }))

            .catch(e => status500(res, e, user, 'addGeneralMessage/GeneralChatMessage.create'));
    }
};
