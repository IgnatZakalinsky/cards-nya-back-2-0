import {Request, Response} from "express";
import {IUser} from "../../../f-1-auth/a-2-models/user";
import Card, {ICard} from "../../c-2-models/card";
import Grade, {IGrade} from "../../c-2-models/grade";
import {status400, status500} from "../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses";
import {resCookie} from "../../../../cnb-1-main/cookie";

export const updateGrade = async (req: Request, res: Response, user: IUser) => {
    const {grade, card_id} = req.body;

    if (!grade) status400(res, "No grade in body! /ᐠ-ꞈ-ᐟ\\", user, "updateGrade");
    else if (!card_id) status400(res, "No Card id in body! /ᐠ-ꞈ-ᐟ\\", user, "updateGrade");

    else {
        const gradeF = isFinite(grade) ? +grade : undefined;

        if (!gradeF || (gradeF && (gradeF > 5 || gradeF < 0))) status400(res,
            `Grade [${gradeF}] not valid! must be between 0 and 5... /ᐠ-ꞈ-ᐟ\\`, user, "updateGrade");

        else Card.findById(card_id)
            .exec()
            .then((oldCard: ICard | null) => {
                if (!oldCard) status400(res, "Card id not valid /ᐠ-ꞈ-ᐟ\\", user, "updateGrade");

                else {
                    Grade.findOne({user_id: user._id, card_id})
                        .then((oldGrade: IGrade | null) => {
                            if (!oldGrade) {
                                Grade.create({
                                    cardsPack_id: oldCard.cardsPack_id,
                                    card_id: oldCard._id,
                                    user_id: user._id,

                                    grade: gradeF,
                                    shots: 1,

                                    more_id: user._id,

                                    created: new Date(),
                                    updated: new Date(),

                                    _doc: {},
                                })
                                    .then((newGrade: IGrade) => {
                                        resCookie(res, user).status(201).json({
                                            updatedGrade: newGrade,
                                            token: user.token,
                                            tokenDeathTime: user.tokenDeathTime
                                        })
                                    })
                                    .catch(e => status500(res, e, user, "updateGrade/Grade.create"))
                            } else {
                                const newShotsF = oldGrade.shots + 1;
                                const newGradeF = ((oldGrade.grade * oldGrade.shots) + gradeF) / newShotsF;

                                Grade.findByIdAndUpdate(oldGrade._id, {
                                        grade: newGradeF,
                                        shots: newShotsF,
                                    },
                                    {new: true}
                                )
                                    .exec()
                                    .then((updatedGrade: IGrade | null) => {
                                        if (!updatedGrade)
                                            status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "updateGrade");

                                        else resCookie(res, user).status(200).json({
                                            updatedGrade,
                                            token: user.token,
                                            tokenDeathTime: user.tokenDeathTime
                                        });
                                    })
                                    .catch(e => status500(res, e, user, "updateCard/Card.findByIdAndUpdate"));
                            }
                        })
                        .catch(e => status500(res, e, user, "updateGrade/Grade.findOne"));
                }
            })
            .catch(e => status500(res, e, user, "updateGrade/Card.findById"));
    }
};
