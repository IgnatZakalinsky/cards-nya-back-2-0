import {Request, Response} from "express";
import {IUser} from "../../../f-1-auth/a-2-models/user";
import CardsPack, {ICardsPack} from "../../c-2-models/cardsPack";
import Card, {ICard} from "../../c-2-models/card";
import {status400, status500} from "../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses";
import {resCookie} from "../../../../cnb-1-main/cookie";

export const addCard = async (req: Request, res: Response, user: IUser) => {
    const {card} = req.body;
    const cardsPack_idF: string = (card && card.cardsPack_id as string | undefined) || "";

    if (!card) status400(res, "No cardsPack in body! /ᐠ-ꞈ-ᐟ\\", user, "addCard", {body: req.body});
    else if (!cardsPack_idF)
        status400(res, "No cardsPack_id in card! /ᐠ-ꞈ-ᐟ\\", user, "addCard", {body: req.body});

    else CardsPack.findById(cardsPack_idF)
        .exec()
        .then((oldCardsPack: ICardsPack | null) => {

            if (!oldCardsPack)
                status400(res, "CardsPack id not valid /ᐠ-ꞈ-ᐟ\\", user, "addCard", {body: req.body});

            else if (!oldCardsPack.user_id.equals(user._id))
                status400(res, "not your CardsPack! /ᐠ｡ꞈ｡ᐟ\\", user, "addCard", {body: req.body});

            else {
                const answerF = card.answer || "no answer";
                const questionF = card.question || "no question";
                const typeF = card.type || "card";
                const gradeF = isFinite(card.grade) ? +card.grade : 0;
                const shotsF = isFinite(card.shots) ? +card.shots : 0;

                if (gradeF > 5 || gradeF < 0)
                    status400(res, `CardsPack grade [${gradeF}] not valid! must be between 0 and 5... /ᐠ-ꞈ-ᐟ\\`,
                        user, "addCard");

                else Card.create({
                    cardsPack_id: cardsPack_idF,
                    user_id: user._id,

                    answer: answerF,
                    question: questionF,
                    grade: gradeF,
                    shots: shotsF,

                    questionImg: card.questionImg,
                    answerImg: card.answerImg,
                    answerVideo: card.answerVideo,
                    questionVideo: card.questionVideo,

                    comments: "",
                    type: typeF,
                    rating: 0,
                    more_id: user._id,

                    created: new Date(),
                    updated: new Date(),

                    _doc: {}, // crutch
                })
                    .then((newCard: ICard) => {

                        Card.count({cardsPack_id: cardsPack_idF})
                            .exec()
                            .then(cardsTotalCount => {

                                CardsPack.findByIdAndUpdate(
                                    cardsPack_idF,
                                    {cardsCount: cardsTotalCount},
                                    {new: true}
                                )
                                    .exec()
                                    .then((updatedCardsPack: ICardsPack | null) => {
                                        if (!updatedCardsPack)
                                            status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "addCard");

                                        else resCookie(res, user).status(201).json({
                                            newCard,
                                            token: user.token,
                                            tokenDeathTime: user.tokenDeathTime
                                        });
                                    })
                                    .catch(e => status500(res, e, user, "addCard/CardsPack.findByIdAndUpdate"));
                            })
                            .catch(e => status500(res, e, user, "addCard/Card.count"));
                    })
                    .catch(e => status500(res, e, user, "addCard/Card.create"));
            }
        })
        .catch(e => status500(res, e, user, "addCard/CardsPack.findById"));
};
