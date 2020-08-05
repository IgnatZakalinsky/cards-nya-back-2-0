import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import bCrypt from "bcrypt";
import {passwordValidator} from "../a-3-helpers/h-2-users/validators";
import {DEV_VERSION} from "../../../cnb-1-main/config";

export const setNewPassword = async (req: Request, res: Response) => {
        try {
            const user: IUser | null = await User.findOne({resetPasswordToken: req.body.resetPasswordToken})
                .exec();

            if (!passwordValidator(req.body.password))
                res.status(400).json({
                    error: 'Password not valid! must be more than 7 characters...',
                    password: DEV_VERSION && req.body.password,
                    in: 'setNewPassword'
                });

            else if (!user || user.resetPasswordTokenDeathTime < new Date().getTime())
                res.status(401).json({error: 'bad token!', in: 'setNewPassword/User.findOne'});

            else {
                try {
                    const newUser: IUser | null = await User.findByIdAndUpdate(
                        user._id,
                        {password: await bCrypt.hash(req.body.password, 10), verified: true},
                        {new: true}
                    ).exec();

                    if (!newUser) res.status(500)
                        .json({error: 'not updated?', in: 'setNewPassword/User.findByIdAndUpdate'});

                    else {
                        res.status(200).json({success: true})

                    }
                } catch (e) {
                    res.status(500).json({
                        error: 'some error', errorObject: DEV_VERSION && e, in: 'setNewPassword/User.findByIdAndUpdate'
                    });
                }
            }
        } catch
            (e) {
            res.status(500).json({
                error: 'some error', errorObject: DEV_VERSION && e, in: 'setNewPassword/User.findOne'
            });
        }
    }
;
