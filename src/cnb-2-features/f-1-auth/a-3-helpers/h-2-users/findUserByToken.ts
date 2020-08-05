import {Request, Response} from "express";
import User, {IUser} from "../../a-2-models/user";
import {generateToken} from "./generateResetPasswordToken";
import {DEV_VERSION} from "../../../../cnb-1-main/config";

export const findUserByToken = (
    f: (req: Request, res: Response, user: IUser) => void,
    inTry: string,
    query?: boolean
) =>
    async (req: Request, res: Response) => {
        const token = query ? req.query.token : req.body.token;

        try {
            const user: IUser | null = await User.findOne({token}).exec();

            if (!user || !user.tokenDeathTime || user.tokenDeathTime < new Date().getTime())
                res.status(401).json({error: "bad token!", in: inTry + "/findUserByToken/User.findOne"});

            else {
                const [token, tokenDeathTime] = generateToken(user.rememberMe);

                try {
                    const newUser: IUser | null = await User.findByIdAndUpdate(
                        user._id,
                        {token, tokenDeathTime},
                        {new: true}
                    ).exec();

                    if (!newUser) res.status(500)
                        .json({error: "not updated? /ᐠ｡ꞈ｡ᐟ\\", in: inTry + "/User.findByIdAndUpdate",});

                    else {
                        f(req, res, newUser._doc as IUser);

                    }
                } catch (e) {
                    res.status(500).json({
                        error: "some error: " + e.message,
                        errorObject: DEV_VERSION && {...e},
                        in: inTry + "/User.findByIdAndUpdate",
                    });
                }
            }
        } catch (e) {
            res.status(500).json({
                error: "some error: " + e.message,
                errorObject: DEV_VERSION && {...e},
                in: inTry + "/findUserByToken/User.findOne",
            });
        }
    };

export const status500 = (res: Response, e: any, user: IUser, inTry: string) => {
    const error = {
        error: "some error: " + e.message,
        errorObject: DEV_VERSION && {...e},
        in: inTry,
        info: "Back doesn't know what the error is... ^._.^",
        token: user.token,
        tokenDeathTime: user.tokenDeathTime,
    };
    console.log("error-nya-500: ", error);
    res.status(500).json(error);
};
export const status400 = (res: Response, e: string, user: IUser, inTry: string) => {
    const error = {
        error: e,
        in: inTry,
        info: "Check your request! /ᐠ-ꞈ-ᐟ\\",
        token: user.token,
        tokenDeathTime: user.tokenDeathTime,
    };
    console.log("error-nya-400: ", error);
    res.status(400).json(error);
};
