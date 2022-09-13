import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {resCookie} from "../../../cnb-1-main/cookie";

export const block = async (req: Request, res: Response, user: IUser) => {
    const {id, blockReason} = req.body

    if (user.isBlocked) {
        resCookie(res, user).status(400).json({error: 'you blocked'})
        return
    }

    const u = await User.findById(id)
    if (!u) {
        resCookie(res, user).status(400).json({error: 'no user by id: ' + id, body: req.body})
        return
    }

    if (u.isBlocked) {
        resCookie(res, user).status(200).json({warning: 'user was blocked'})
        return
    }
    u.blockReason = blockReason
    u.blockTime = Date.now()
    u.blockUserId = user._id + ''
    u.isBlocked = true

    resCookie(res, user).status(200).json({ok: 'user blocked'});
}
