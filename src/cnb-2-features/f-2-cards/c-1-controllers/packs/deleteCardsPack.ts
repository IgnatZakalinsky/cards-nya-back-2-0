import {Request, Response} from "express";
import User, {IUser} from "../../../f-1-auth/a-2-models/user";
import CardsPack, {ICardsPack} from "../../c-2-models/cardsPack";
import {status400, status500} from "../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses";
import {resCookie} from "../../../../cnb-1-main/cookie";

export const deleteCardsPack = async (req: Request, res: Response, user: IUser) => {
    const {id} = req.query;

    if (!id) status400(res, "No CardsPack id /ᐠ-ꞈ-ᐟ\\", user, "deleteCardsPack", {query: req.query});

    else CardsPack.findById(id)
        .exec()
        .then((cardsPackF: ICardsPack | null) => {
            if (!cardsPackF) status400(res, "CardsPack id not valid /ᐠ-ꞈ-ᐟ\\", user,
                "deleteCardsPack/CardsPack.findById", {query: req.query});

            else if (!cardsPackF.user_id.equals(user._id))
                status400(res, "not your CardsPack! /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCardsPack", {query: req.query});

            else CardsPack.findByIdAndDelete(id)
                    .exec()
                    .then((cardsPack: ICardsPack | null) => {
                        if (!cardsPack) status400(res, "CardsPack id not valid /ᐠ｡ꞈ｡ᐟ\\", user,
                            "deleteCardsPack/CardsPack.findByIdAndDelete", {query: req.query});

                        else {
                            CardsPack.count({user_id: user._id, private: false})
                                .exec()
                                .then(cardPacksTotalCount => {

                                    User.findByIdAndUpdate(
                                        user._id,
                                        {publicCardPacksCount: cardPacksTotalCount},
                                        {new: true}
                                    )
                                        .exec()
                                        .then((updatedUser: IUser | null) => {
                                            if (!updatedUser)
                                                status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCardsPack");

                                            else resCookie(res, user).status(200).json({
                                                deletedCardsPack: cardsPack,
                                                token: user.token,
                                                tokenDeathTime: user.tokenDeathTime,
                                            })
                                        })
                                        .catch(e =>
                                            status500(res, e, user, "deleteCardsPack/User.findByIdAndUpdate"));
                                })
                                .catch(e => status500(res, e, user, "deleteCardsPack/CardsPack.count"));
                        }
                    })
                    .catch(e => status500(res, e, user, "deleteCardsPack/CardsPack.findByIdAndDelete"));
        })
        .catch(e => status500(res, e, user, "deleteCardsPack/CardsPack.findById"));
};
