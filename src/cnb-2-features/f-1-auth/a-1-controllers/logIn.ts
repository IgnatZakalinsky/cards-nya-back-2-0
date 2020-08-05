import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import bCrypt from "bcrypt";
import {DEV_VERSION} from "../../../cnb-1-main/config";
import {generateToken} from "../a-3-helpers/h-2-users/generateResetPasswordToken";
import {validateAuth} from "../a-3-helpers/h-2-users/validators";

export const logIn = async (req: Request, res: Response) => {
    if (validateAuth(req, res, "logIn")) {
        try {
            const user: IUser | null = await User.findOne({email: req.body.email}).exec();

            if (!user || !(await bCrypt.compare(req.body.password, user.password)))
                res.status(400).json({error: "not correct email/password /ᐠ-ꞈ-ᐟ\\", in: "logIn"});

            else {
                const [token, tokenDeathTime] = generateToken(!!req.body.rememberMe);

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
                        const body: any = {...newUser._doc}; // _doc!!!

                        delete body.password; // don't send password to the front
                        delete body.resetPasswordToken;
                        delete body.resetPasswordTokenDeathTime;

                        res.cookie("token", token, {
                            expires: new Date(tokenDeathTime),
                            secure: false, // set to true if your using https
                            // httpOnly: true,
                        }).status(200).json({...body});

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
