import {Request, Response} from "express";
import {IUser} from "../a-2-models/user";

export const getMe = async (req: Request, res: Response, user: IUser) => {
    const body: any = {...user};

    delete body.password; // don't send password to the front
    delete body.resetPasswordToken;
    delete body.resetPasswordTokenDeathTime;

    res.status(200).json({...body, success: true});

};
