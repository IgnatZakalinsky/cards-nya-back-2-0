import {Request, Response} from "express";
import User, {IUser} from "../../a-2-models/user";
import {generateToken} from "./generateToken";
import {DEV_VERSION} from "../../../../cnb-1-main/config";

export const findUserByToken = (
    f: (req: Request, res: Response, user: IUser) => void,
    inTry: string,
) => async (req: Request, res: Response) => {
    const token = req.cookies.token;

    try {
        const user: IUser | null = await User.findOne({token}).exec();

        if (!user || !user.tokenDeathTime || user.tokenDeathTime < new Date().getTime()) res.status(401)
            .json({error: "you are not authorized /ᐠ-ꞈ-ᐟ\\", in: inTry + "/findUserByToken/User.findOne"});

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
                    info: "Back doesn't know what the error is... ^._.^",
                    errorObject: DEV_VERSION && {...e},
                    in: inTry + "/User.findByIdAndUpdate",
                });
            }
        }
    } catch (e) {
        res.status(500).json({
            error: "some error: " + e.message,
            info: "Back doesn't know what the error is... ^._.^",
            errorObject: DEV_VERSION && {...e},
            in: inTry + "/findUserByToken/User.findOne",
        });
    }
};

