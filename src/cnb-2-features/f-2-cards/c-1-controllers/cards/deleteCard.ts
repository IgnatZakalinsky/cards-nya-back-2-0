import {Request, Response} from "express";
import {IUser} from "../../../f-1-auth/a-2-models/user";
import Card, {ICard} from "../../c-2-models/card";
import CardsPack, {ICardsPack} from "../../c-2-models/cardsPack";
import {status400, status500} from "../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses";
import {resCookie} from "../../../../cnb-1-main/cookie";

export const deleteCard = async (req: Request, res: Response, user: IUser) => {
    const {id} = req.query;

    if (!id) status400(res, "No Card id /ᐠ-ꞈ-ᐟ\\", user, "deleteCard", {query: req.query});

    else Card.findById(id)
        .exec()
        .then((cardF: ICard | null) => {
            if (!cardF) status400(res, "Card id not valid /ᐠ-ꞈ-ᐟ\\", user, "deleteCard/Card.findById",
                {query: req.query});

            else if (!cardF.user_id.equals(user._id))
                status400(res, "not your Card! /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCard", {query: req.query});

            else Card.findByIdAndDelete(id)
                    .exec()
                    .then((card: ICard | null) => {
                        if (!card) status400(res, "Card id not valid /ᐠ｡ꞈ｡ᐟ\\", user,
                            "deleteCard/Card.findByIdAndDelete", {query: req.query});

                        else {
                            Card.count({cardsPack_id: card.cardsPack_id})
                                .exec()
                                .then(cardsTotalCount => {

                                    CardsPack.findByIdAndUpdate(
                                        card.cardsPack_id,
                                        {cardsCount: cardsTotalCount},
                                        {new: true}
                                    )
                                        .exec()
                                        .then((updatedCardsPack: ICardsPack | null) => {
                                            if (!updatedCardsPack)
                                                status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCard");

                                            else resCookie(res, user).status(200).json({
                                                deletedCard: card,
                                                token: user.token,
                                                tokenDeathTime: user.tokenDeathTime
                                            })
                                        })
                                        .catch(e =>
                                            status500(res, e, user, "deleteCard/CardsPack.findByIdAndUpdate"));
                                })
                                .catch(e => status500(res, e, user, "deleteCard/Card.count"));
                        }
                    })
                    .catch(e => status500(res, e, user, "deleteCard/Card.findByIdAndDelete"));
        })
        .catch(e => status500(res, e, user, "deleteCard/Card.findById"));
};
