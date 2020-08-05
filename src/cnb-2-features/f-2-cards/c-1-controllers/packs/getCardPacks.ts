import {Request, Response} from "express";
import {IUser} from "../../../f-1-auth/a-2-models/user";
import CardsPack, {ICardsPack} from "../../c-2-models/cardsPack";
import {status500} from "../../../f-1-auth/a-3-helpers/h-2-users/findUserByToken";

export const getCardPacks = async (req: Request, res: Response, user: IUser) => {
    const {page, pageCount, sortPacks, packName, min, max, user_id} = req.query;

    let pageF = +page || 1;
    const pageCountF = +pageCount || 4;
    const sortPacksF: string = sortPacks as string | undefined || ''; // '0grade'
    const packNameF: string = packName as string | undefined || '';
    const user_idF = user_id as string | undefined || undefined;
    const user_idO = user_idF ? {user_id: user_idF} : undefined;

    // await CardsPack.create({
    //     user_id: user._id,
    //     name: 'fake2CardsPack',
    //     path: '/def',
    //     grade: Math.random() * 5,
    //     shots: 1,
    //
    //     type: 'pack',
    //     rating: 0
    // }); // seed

    CardsPack.findOne(user_idO)
        .sort({grade: 1})
        .exec()
        .then((packMin: ICardsPack | null) => {
            const minF = packMin ? packMin.grade : 0;

            CardsPack.findOne(user_idO)
                .sort({grade: -1}).exec()
                .then((packMax: ICardsPack | null) => {
                    const maxF = packMax ? packMax.grade : minF;

                    const sortName: any = sortPacksF && sortPacksF.length > 2 ? sortPacksF.slice(1) : undefined;
                    const direction = sortName ? (sortPacksF[0] === '0' ? -1 : 1) : undefined;

                    const findBase = {
                        name: new RegExp(packNameF as string, 'gi'),
                        grade: {$gte: +min || minF, $lte: +max || maxF}
                    };
                    const findPrivate = user_idF && user._id.equals(user_idF) ? {} : {private: false};
                    const findByUserId = user_id ? {user_id: user_idF} : {};

                    const findO = {
                        ...findByUserId,
                        ...findBase,
                        ...findPrivate
                    };

                    CardsPack.find(findO)
                        .sort({[sortName]: direction, updated: -1})
                        .skip(pageCountF * (pageF - 1))
                        .limit(pageCountF)
                        .lean()
                        .exec()
                        .then(cardPacks => {

                            CardsPack.count(findO)
                                .exec()
                                .then(cardPacksTotalCount => {
                                    if (pageCountF * (pageF - 1) > cardPacksTotalCount) pageF = 1;

                                    res.status(200)
                                        .json({
                                            cardPacks,
                                            page: pageF, pageCount: pageCountF, cardPacksTotalCount,
                                            minGrade: minF, maxGrade: maxF,
                                            token: user.token,
                                            tokenDeathTime: user.tokenDeathTime,
                                        })
                                })
                                .catch(e => status500(res, e, user, 'getCardPacks/CardsPack.count'))
                        })
                        .catch(e => status500(res, e, user, 'getCardPacks/CardsPack.find'))
                })
                .catch(e => status500(res, e, user, 'getCardPacks/CardsPack.findOne/max'))
        })
        .catch(e => status500(res, e, user, 'getCardPacks/CardsPack.findOne/min'))
};

// Имя Описание
// $eq Соответствует значениям, которые равны указанному значению.
// $gt Соответствует значениям, которые больше указанного значения.
// $gte Соответствует значениям, которые больше или равны указанному значению.
// $in Соответствует любому из значений, указанных в массиве.
// $lt Соответствует значениям, которые меньше указанного значения.
// $lte Соответствует значениям, которые меньше или равны указанному значению.
// $ne Соответствует всем значениям, которые не равны указанному значению.
// $nin Не соответствует ни одному из значений, указанных в массиве.

// $and Объединяет предложения запроса с логическим И возвращает все документы, которые соответствуют условиям обоих предложений.
// $not Инвертирует эффект выражения запроса и возвращает документы, которые не соответствуют выражению запроса.
// $nor Объединяет предложения запроса с логическим NOR и возвращает все документы, которые не соответствуют обоим предложениям.
// $or Объединяет предложения запроса с логическим ИЛИ возвращает все документы, которые соответствуют условиям любого из предложений.

// $exists Соответствует документам с указанным полем.
// $type Выбирает документы, если поле имеет указанный тип.

// $expr Позволяет использовать выражения агрегации на языке запросов.
// $jsonSchema Проверять документы на соответствие данной JSON-схеме.
// $mod Выполняет операцию по модулю над значением поля и выбирает документы с указанным результатом.
// $regex Выбирает документы, значения которых соответствуют заданному регулярному выражению.
// $text Выполняет текстовый поиск.
// $where Соответствует документам, которые удовлетворяют выражению JavaScript.
