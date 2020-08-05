import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {status400, status500} from "../a-3-helpers/h-2-users/findUserByToken";

export const updateUser = async (req: Request, res: Response, user: IUser) => {
    const {name, avatar} = req.body;

    User.findByIdAndUpdate(
        user._id,
        {
            name: name || user.name,
            avatar: avatar || user.avatar
        },
        {new: true}
    )
        .exec()
        .then((updatedUser: IUser | null) => {
            if (!updatedUser) status400(res, `never`, user, 'updateUser');

            else {
                const body: any = {...updatedUser._doc};

                delete body.password; // don't send password to the front
                delete body.resetPasswordToken;
                delete body.resetPasswordTokenDeathTime;

                res.status(200).json({
                    updatedUser: body,
                    success: true,
                    token: user.token,
                    tokenDeathTime: user.tokenDeathTime
                })
            }
        })
        .catch(e => status500(res, e, user, 'updateUser/User.findByIdAndUpdate'))
};
