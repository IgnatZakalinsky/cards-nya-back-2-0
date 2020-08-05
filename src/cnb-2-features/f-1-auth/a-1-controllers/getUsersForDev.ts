import {Request, Response} from "express";
import User from "../a-2-models/user";
import {DEV_VERSION} from "../../../cnb-1-main/config";

export const getUsersForDev = async (req: Request, res: Response) => {
    if (DEV_VERSION) {
        try {
            const users = await User.find({isAdmin: false})
                .select("_id email rememberMe isAdmin name created updated")
                .exec();

            res.status(200)
                .json({users, warnings: "This endpoint will be deleted!!! Just for development!!! —ฅ/ᐠ.̫ .ᐟ\\ฅ—"});

        } catch (e) {
            res.status(500).json({
                error: "some error: " + e.message,
                info: "Back doesn't know what the error is... ^._.^",
                errorObject: {...e},
                in: "getUsersForDev/User.find",
            });
        }
    } else {
        res.status(401).json({error: "endpoint is closed /ᐠ-ꞈ-ᐟ\\", in: "getUsersForDev"});
    }
};
