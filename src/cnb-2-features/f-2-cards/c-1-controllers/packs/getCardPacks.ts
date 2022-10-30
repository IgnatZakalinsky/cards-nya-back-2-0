import {Request, Response} from "express";
import {IUser} from "../../../f-1-auth/a-2-models/user";
import CardsPack, {ICardsPack} from "../../c-2-models/cardsPack";
import {status500} from "../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses";
import {resCookie} from "../../../../cnb-1-main/cookie";

export const getCardPacks = async (req: Request, res: Response, user: IUser) => {
    try {
        const {page, pageCount, sortPacks, packName, min, max, user_id, type, block} = req.query;
        const findF: any = {
            isDeleted: {$ne: true}
        }
        if (!block) {
            findF.isBlocked = {$ne: true}
        }

        let pageF = page && +page || 1;
        let pageCountF = pageCount && +pageCount || 4;
        if (pageCountF > 50) pageCountF = 50

        const sortPacksF: string = sortPacks as string | undefined || ""; // '0grade'
        const packNameF: string = packName as string | undefined || "";

        const user_idF = user_id as string | undefined || undefined;
        const typeF = type as string | undefined || "pack";

        // min max

        const user_idO = user_idF
            ? {
                user_id: user_idF,
                ...findF,
            }
            : findF; // options

        // await CardsPack.create({
        //     user_id: user._id,
        //     user_name: user.name,
        //     private: false,
        //
        //     name: "seed",
        //     path: "/def",
        //     grade: 0,
        //     shots: 0,
        //
        //     deckCover: "",
        //     cardsCount: 0,
        //
        //     type: "pack",
        //     rating: 0,
        //
        //     created: new Date(),
        //     updated: new Date(),
        //
        //     more_id: user._id,
        //     _doc: {}, // crutch
        // }); // seed

        CardsPack.findOne(user_idO)
            .sort({cardsCount: 1}) // поиск колоды с минимальным количеством карточек
            .exec()
            .then((packMin: ICardsPack | null) => {
                const minF = packMin ? packMin.cardsCount : 0;

                CardsPack.findOne(user_idO)
                    .sort({cardsCount: -1}).exec() // поиск колоды с максимальным количеством карточек
                    .then((packMax: ICardsPack | null) => {
                        const maxF = packMax ? packMax.cardsCount : minF;

                        const sortName: string = (sortPacksF && sortPacksF.length > 2) ? sortPacksF.slice(1) : "";
                        const direction = sortName ? (sortPacksF[0] === "0" ? -1 : 1) : undefined;
                        const sortO = sortName ? {[sortName]: direction} : {updated: -1};

                        const findBase = {
                            name: new RegExp(packNameF, "gi"),
                            cardsCount: {$gte: min && +min || minF, $lte: max && +max || maxF}
                        };
                        const findPrivate = user_idF && user._id.equals(user_idF) ? {} : {private: false};
                        const findByUserId = user_id ? {user_id: user_idF} : {};

                        const findO = {
                            ...findByUserId,
                            ...findBase,
                            ...findPrivate,
                            ...findF,
                        };

                        CardsPack.countDocuments(findO)
                            .exec()
                            .then(cardPacksTotalCount => {
                                if (pageCountF * (pageF - 1) > cardPacksTotalCount) pageF = 1;

                                CardsPack.find(findO)
                                    .sort(sortO)
                                    .skip(pageCountF * (pageF - 1))
                                    .limit(pageCountF)
                                    .lean()
                                    .exec()
                                    .then(cardPacks => {
                                        console.log({cardPacks})

                                        resCookie(res, user).status(200)
                                            .json({
                                                cardPacks,
                                                page: pageF, pageCount: pageCountF, cardPacksTotalCount,
                                                minCardsCount: minF, maxCardsCount: maxF,
                                                token: user.token,
                                                tokenDeathTime: user.tokenDeathTime,
                                            });
                                    })
                                    .catch(e => status500(res, e, user, "getCardPacks/CardsPack.find"));
                            })
                            .catch(e => status500(res, e, user, "getCardPacks/CardsPack.count"));
                    })
                    .catch(e => status500(res, e, user, "getCardPacks/CardsPack.findOne/max"));
            })
            .catch(e => status500(res, e, user, "getCardPacks/CardsPack.findOne/min"));
    } catch (e) {
        console.log('error? ', e)
    }
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
