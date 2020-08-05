import {Request, Response} from "express";
import User, {IUser} from "../../../f-1-auth/a-2-models/user";
import CardsPack, {ICardsPack} from "../../c-2-models/cardsPack";
import {status400, status500} from "../../../f-1-auth/a-3-helpers/h-2-users/findUserByToken";

export const addCardsPack = async (req: Request, res: Response, user: IUser) => {
    const {cardsPack} = req.body;

    if (!cardsPack) status400(res, `No cardsPack in body!`, user, 'addCardsPack');

    else {
        const nameF = cardsPack.name || 'no Name';
        const pathF = cardsPack.path || '/def';
        const typeF = cardsPack.type || 'pack';
        const gradeF = isFinite(cardsPack.grade) ? +cardsPack.grade : 0;
        const shotsF = isFinite(cardsPack.shots) ? +cardsPack.shots : 0;
        // add private

        if (gradeF > 5 || gradeF < 0) status400(res,
            `CardsPack grade [${gradeF}] not valid! must be between 0 and 5...`, user, 'addCardsPack');

        else CardsPack.create({
            user_id: user._id,
            user_name: user.name,
            private: !!cardsPack.private,

            name: nameF,
            path: pathF,
            grade: gradeF,
            shots: shotsF,
            deckCover: cardsPack.deckCover,

            cardsCount: 0,
            type: typeF,
            rating: 0
        })
            .then((newCardsPack: ICardsPack) => {
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
                                if (!updatedUser) status400(res, `never`, user, 'addCardsPack');

                                else res.status(201).json({
                                    newCardsPack,
                                    success: true,
                                    token: user.token,
                                    tokenDeathTime: user.tokenDeathTime
                                })
                            })
                            .catch(e =>
                                status500(res, e, user, 'addCardsPack/User.findByIdAndUpdate'))
                    })
                    .catch(e => status500(res, e, user, 'addCardsPack/CardsPack.count'));
            })
            .catch(e => status500(res, e, user, 'addCardsPack/CardsPack.create'));
    }
};
