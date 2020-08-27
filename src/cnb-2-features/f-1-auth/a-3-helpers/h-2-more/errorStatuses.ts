import {Response} from "express";
import {IUser} from "../../a-2-models/user";
import {DEV_VERSION} from "../../../../cnb-1-main/config";
import {cookieSettings} from "../../../../cnb-1-main/cookie";

export const status500 = (res: Response, e: any, user: IUser, inTry: string) => {
    const error = {
        error: "some error: " + e.message,
        errorObject: DEV_VERSION && {...e},
        in: inTry,
        info: "Back doesn't know what the error is... ^._.^",
    };
    console.log("error-nya-500: ", error);
    res.cookie("token", user.token, {
        ...cookieSettings,
        expires: new Date(user.tokenDeathTime || 0),
    }).status(500).json(error);
};
export const status400 = (res: Response, e: string, user: IUser, inTry: string, more?: any) => {
    const error = {
        more,
        error: e,
        in: inTry,
        info: "Check your request! /ᐠ-ꞈ-ᐟ\\",
    };
    console.log("error-nya-400: ", error);
    res.cookie("token", user.token, {
        ...cookieSettings,
        expires: new Date(user.tokenDeathTime || 0),
    }).status(400).json(error);
};
