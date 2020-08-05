import {Request, Response} from "express";
import {IUser} from "../../../f-1-auth/a-2-models/user";
import {status400, status500} from "../../../f-1-auth/a-3-helpers/h-2-users/findUserByToken";
import Card, {ICard} from "../../c-2-models/card";

export const updateCard = async (req: Request, res: Response, user: IUser) => {
    const {card} = req.body;

    if (!card) status400(res, `No card in body!`, user, 'updateCard');
    else if (!card._id) status400(res, `No Card id`, user, 'updateCard');

    else {
        const questionF = card.question || undefined;
        const answerF = card.answer || undefined;
        const typeF = card.type || undefined;
        const gradeF = isFinite(card.grade) ? +card.grade : undefined;
        const shotsF = isFinite(card.shots) && +card.shots >= 0 ? +card.shots : undefined;

        if (gradeF && (gradeF > 5 || gradeF < 0)) status400(res,
            `Card grade [${gradeF}] not valid! must be between 0 and 5...`, user, 'updateCard');

        else Card.findById(card._id)
            .exec()
            .then((oldCard: ICard | null) => {
                if (!oldCard) status400(res, `Card id not valid`, user, 'updateCard');

                else if (!oldCard.user_id.equals(user._id)) status400(res, `not your Card`, user, 'updateCard');

                else {
                    let commentsF = oldCard.comments;
                    if (card.comments)
                        if (user._id.equals(oldCard.user_id)) commentsF = card.comments;
                        else commentsF += '\n' + card.comments;

                    Card.findByIdAndUpdate(
                        card._id,
                        {
                            question: questionF || oldCard.question,
                            answer: answerF || oldCard.answer,
                            type: typeF || oldCard.type,
                            grade: gradeF || oldCard.grade,
                            shots: shotsF || oldCard.shots,

                            questionImg: card.questionImg || oldCard.questionImg,
                            answerImg: card.answerImg || oldCard.answerImg,
                            answerVideo: card.answerVideo || oldCard.answerVideo,
                            questionVideo: card.questionVideo || oldCard.questionVideo,

                            comments: commentsF,
                        },
                        {new: true}
                    )
                        .exec()
                        .then((updatedCard: ICard | null) => {
                            if (!updatedCard) status400(res, `never`, user, 'updateCard');

                            else res.status(200).json({
                                updatedCard,
                                success: true,
                                token: user.token,
                                tokenDeathTime: user.tokenDeathTime
                            })
                        })
                        .catch(e => status500(res, e, user, 'updateCard/Card.findByIdAndUpdate'))
                }
            })
            .catch(e => status500(res, e, user, 'updateCard/Card.findById'));
    }
};
