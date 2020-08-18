import {Request, Response} from "express";
import {IUser} from "../a-2-models/user";
import {cookieSettings} from "../../../cnb-1-main/cookie";

export const logOut = async (req: Request, res: Response, user: IUser) => {

    res.cookie("token", "", {
        ...cookieSettings,
        expires: new Date( 0),
    }).status(200).json({info: "logOut success —ฅ/ᐠ.̫ .ᐟ\\ฅ—"})
};
