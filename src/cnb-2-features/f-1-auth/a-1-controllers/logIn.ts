import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import bCrypt from "bcrypt";
import {DEV_VERSION} from "../../../cnb-1-main/config";
import {generateToken} from "../a-3-helpers/h-2-more/generateToken";
import {validateAuth} from "../a-3-helpers/h-2-more/validators";
import {getMe} from "./getMe";

export const logIn = async (req: Request, res: Response) => {
    const {email, password, rememberMe} = req.body;

    if (validateAuth(req, res, "logIn")) {
        try {
            const user: IUser | null = await User.findOne({email}).exec();

            if (!user)
                res.status(400).json({error: "user not found /ᐠ-ꞈ-ᐟ\\", email, in: "logIn"});

            else if (!(await bCrypt.compare(password, user.password))) res.status(400)
                .json({error: "not correct password /ᐠ-ꞈ-ᐟ\\", password, in: "logIn"});

            else {
                const [token, tokenDeathTime] = generateToken(!!rememberMe);

                try {
                    const newUser: IUser | null = await User.findByIdAndUpdate(
                        user._id,
                        {token, tokenDeathTime, rememberMe: !!rememberMe},
                        {new: true}
                    ).exec();

                    if (!newUser) res.status(500)
                        .json({error: "not updated? /ᐠ｡ꞈ｡ᐟ\\", in: "logIn/User.findByIdAndUpdate"});

                    else {

                        // if (DEV_VERSION) console.log('IUser?: ', {...newUser}); // for dev => _doc!!!
                        await getMe(req, res, newUser._doc as IUser)
                    }
                } catch (e: any) {
                    res.status(500).json({
                        error: "some error: " + e.message,
                        info: "Back doesn't know what the error is... ^._.^",
                        errorObject: DEV_VERSION && {...e},
                        in: "logIn/User.findByIdAndUpdate",
                    });
                }
            }
        } catch (e: any) {
            res.status(500).json({
                error: "some error: " + e.message,
                info: "Back doesn't know what the error is... ^._.^",
                errorObject: DEV_VERSION && {...e},
                in: "logIn/User.findOne",
            });
        }
    }
};
