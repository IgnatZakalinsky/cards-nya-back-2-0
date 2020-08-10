import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import bCrypt from "bcrypt";
import {DEV_VERSION} from "../../../cnb-1-main/config";
import {generateToken} from "../a-3-helpers/h-2-more/generateResetPasswordToken";
import {validateAuth} from "../a-3-helpers/h-2-more/validators";
import {getMe} from "./getMe";

export const logIn = async (req: Request, res: Response) => {
    if (validateAuth(req, res, "logIn")) {
        try {
            const user: IUser | null = await User.findOne({email: req.body.email}).exec();

            if (!user)
                res.status(400).json({error: "user not found /ᐠ-ꞈ-ᐟ\\", email: req.body.email, in: "logIn"});
            else if (!(await bCrypt.compare(req.body.password, user.password))) res.status(400)
                .json({error: "not correct password /ᐠ-ꞈ-ᐟ\\", password: req.body.password, in: "logIn"});

            else {
                const [token, tokenDeathTime] = generateToken(!!req.body.rememberMe);
                console.log("email: ", user.email, ", token: ", token);

                try {
                    const newUser: IUser | null = await User.findByIdAndUpdate(
                        user._id,
                        {token, tokenDeathTime, rememberMe: !!req.body.rememberMe},
                        {new: true}
                    ).exec();

                    if (!newUser) res.status(500)
                        .json({error: "not updated? /ᐠ｡ꞈ｡ᐟ\\", in: "logIn/User.findByIdAndUpdate"});

                    else {

                        // if (DEV_VERSION) console.log('IUser?: ', {...newUser}); // for dev => _doc!!!
                        await getMe(req, res, newUser._doc as IUser)
                    }
                } catch (e) {
                    res.status(500).json({
                        error: "some error: " + e.message,
                        info: "Back doesn't know what the error is... ^._.^",
                        errorObject: DEV_VERSION && {...e},
                        in: "logIn/User.findByIdAndUpdate",
                    });
                }
            }
        } catch (e) {
            res.status(500).json({
                error: "some error: " + e.message,
                info: "Back doesn't know what the error is... ^._.^",
                errorObject: DEV_VERSION && {...e},
                in: "logIn/User.findOne",
            });
        }
    }
};
