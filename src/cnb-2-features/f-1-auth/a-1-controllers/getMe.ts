import {Request, Response} from "express";
import {IUser} from "../a-2-models/user";
import {cookieSettings} from "../../../cnb-1-main/app";

export const getMe = async (req: Request, res: Response, user: IUser) => {
    const body: any = {...user};

    delete body.password; // don't send password to the front
    delete body.resetPasswordToken;
    delete body.resetPasswordTokenDeathTime;

    res.cookie("token", user.token, {
        ...cookieSettings,
        expires: new Date(user.tokenDeathTime || 0),
    }).status(200).json({...body});
};
