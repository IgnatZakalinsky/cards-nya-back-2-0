import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import bCrypt from "bcrypt";
import {validateAuth} from "../a-3-helpers/h-2-users/validators";
import {DEV_VERSION} from "../../../cnb-1-main/config";

export const createUser = async (req: Request, res: Response) => {
    if (validateAuth(req, res, "createUser")) {
        try {
            // error: "some error, email may already exist",


            const user: IUser = await User.create(
                {
                    email: req.body.email,
                    password: await bCrypt.hash(req.body.password, 10),
                    rememberMe: false,
                    isAdmin: false,

                    name: req.body.email,
                    verified: false,
                    // avatar: "",
                    publicCardPacksCount: 0,

                    // token: "",
                    // tokenDeathTime: 0,
                    // resetPasswordToken: "",
                    // resetPasswordTokenDeathTime: 0,

                    created: new Date(),
                    updated: new Date(),

                    _doc: {}, // crutch
                }
            );

            const addedUser: any = {...user._doc};

            delete addedUser.password; // don't send password to the front
            delete addedUser.resetPasswordToken;
            delete addedUser.resetPasswordTokenDeathTime;

            res.status(201).json({addedUser, success: true});

        } catch (e) {
            res.status(500).json({
                error: "some error: " + e.message,
                errorObject: DEV_VERSION && {...e},
                in: "createUser/User.create",
            });
        }
    }
};
