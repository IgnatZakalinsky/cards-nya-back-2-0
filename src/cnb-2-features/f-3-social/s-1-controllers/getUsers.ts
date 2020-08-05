import {Request, Response} from "express";
import User, {IUser} from "../../f-1-auth/a-2-models/user";
import {status500} from "../../f-1-auth/a-3-helpers/h-2-users/findUserByToken";

export const getUsers = async (req: Request, res: Response, user: IUser) => {
    const {page, pageCount, sortUsers, userName, min, max} = req.query;

    let pageF = +page || 1;
    const pageCountF = +pageCount || 4;
    const sortUsersF: string = sortUsers as string | undefined || ''; // '0grade'
    const userNameF: string = userName as string | undefined || '';

    User.findOne()
        .sort({publicCardPacksCount: 1})
        .exec()
        .then((userMin: IUser | null) => {
            const minF = userMin ? userMin.publicCardPacksCount : 0;

            User.findOne()
                .sort({publicCardPacksCount: -1}).exec()
                .then((userMax: IUser | null) => {
                    const maxF = userMax ? userMax.publicCardPacksCount : minF;

                    const sortName: any = sortUsersF && sortUsersF.length > 2 ? sortUsersF.slice(1) : undefined;
                    const direction = sortName ? (sortUsersF[0] === '0' ? -1 : 1) : undefined;

                    const findBase = {
                        name: new RegExp(userNameF as string, 'gi'),
                        publicCardPacksCount: {$gte: +min || minF, $lte: +max || maxF}
                    };

                    User.find(findBase)
                        .sort({[sortName]: direction, updated: -1})
                        .skip(pageCountF * (pageF - 1))
                        .limit(pageCountF)
                        .lean()
                        .select('_id email isAdmin name verified avatar publicCardPacksCount created updated')
                        .exec()
                        .then(users => {

                            User.count(findBase)
                                .exec()
                                .then(usersTotalCount => {
                                    if (pageCountF * (pageF - 1) > usersTotalCount) pageF = 1;

                                    res.status(200)
                                        .json({
                                            users,
                                            page: pageF, pageCount: pageCountF, usersTotalCount,
                                            minPublicCardPacksCount: minF, maxPublicCardPacksCount: maxF,
                                            token: user.token,
                                            tokenDeathTime: user.tokenDeathTime,
                                        })
                                })
                                .catch(e => status500(res, e, user, 'getUsers/User.count'))
                        })
                        .catch(e => status500(res, e, user, 'getUsers/User.find'))
                })
                .catch(e => status500(res, e, user, 'getUsers/User.findOne/max'))
        })
        .catch(e => status500(res, e, user, 'getUsers/User.findOne/min'))
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
