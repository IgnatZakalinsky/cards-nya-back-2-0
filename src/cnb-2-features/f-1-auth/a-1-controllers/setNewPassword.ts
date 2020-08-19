import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import bCrypt from "bcrypt";
import {passwordValidator} from "../a-3-helpers/h-2-more/validators";
import {DEV_VERSION} from "../../../cnb-1-main/config";

export const setNewPassword = async (req: Request, res: Response) => {
    const {resetPasswordToken, password} = req.body

    if (!passwordValidator(password))
        res.status(400).json({
            error: "Password not valid! must be more than 7 characters /ᐠ-ꞈ-ᐟ\\",
            body: DEV_VERSION && req.body,
            in: "setNewPassword"
        });
    else if (!resetPasswordToken)
        res.status(400).json({
            error: "no resetPasswordToken, Check your request! /ᐠ-ꞈ-ᐟ\\",
            body: DEV_VERSION && req.body,
            in: "setNewPassword"
        });

    else try {
        const user: IUser | null = await User.findOne({resetPasswordToken}).exec();

        if (
            !user
            || (user.resetPasswordTokenDeathTime && user.resetPasswordTokenDeathTime < Date.now())
        ) res.status(401).json({
            error: "bad token! /ᐠ-ꞈ-ᐟ\\",
            resetPasswordToken: DEV_VERSION && resetPasswordToken,
            in: "setNewPassword/User.findOne",
        });

        else {
            try {
                const newUser: IUser | null = await User.findByIdAndUpdate(
                    user._id,
                    {password: await bCrypt.hash(req.body.password, 10), verified: true},
                    {new: true}
                ).exec();

                if (!newUser) res.status(500)
                    .json({error: "not updated? /ᐠ｡ꞈ｡ᐟ\\", in: "setNewPassword/User.findByIdAndUpdate"});

                else {
                    res.status(200).json({info: "setNewPassword success —ฅ/ᐠ.̫ .ᐟ\ฅ—"});
                }
            } catch (e) {
                res.status(500).json({
                    error: "some error: " + e.message,
                    info: "Back doesn't know what the error is... ^._.^",
                    errorObject: DEV_VERSION && e,
                    in: "setNewPassword/User.findByIdAndUpdate",
                });
            }
        }
    } catch
        (e) {
        res.status(500).json({
            error: "some error: " + e.message,
            info: "Back doesn't know what the error is... ^._.^",
            errorObject: DEV_VERSION && e,
            in: "setNewPassword/User.findOne",
        });
    }
};
