"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const user_1 = __importDefault(require("../../f-1-auth/a-2-models/user"));
const errorStatuses_1 = require("../../f-1-auth/a-3-helpers/h-2-more/errorStatuses");
const cookie_1 = require("../../../cnb-1-main/cookie");
exports.getUsers = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageCount, sortUsers, userName, min, max, block } = req.query;
    const findF = {
        isDeleted: { $ne: true }
    };
    if (!block) {
        findF.isBlocked = { $ne: true };
    }
    let pageF = page && +page || 1;
    const pageCountF = pageCount && +pageCount || 4;
    const sortUsersF = sortUsers || ''; // '0grade'
    const userNameF = userName || '';
    user_1.default.findOne(findF)
        .sort({ publicCardPacksCount: 1 })
        .exec()
        .then((userMin) => {
        const minF = userMin ? userMin.publicCardPacksCount : 0;
        user_1.default.findOne(findF)
            .sort({ publicCardPacksCount: -1 }).exec()
            .then((userMax) => {
            const maxF = userMax ? userMax.publicCardPacksCount : minF;
            const sortName = sortUsersF && sortUsersF.length > 2 ? sortUsersF.slice(1) : 'updated';
            const direction = sortName ? (sortUsersF[0] === '0' ? -1 : 1) : -1;
            const findBase = Object.assign({ name: new RegExp(userNameF, 'gi'), publicCardPacksCount: { $gte: min && +min || minF, $lte: max && +max || maxF } }, findF);
            user_1.default.find(findBase)
                .sort({ [sortName]: direction })
                .skip(pageCountF * (pageF - 1))
                .limit(pageCountF)
                .lean()
                .select('_id email isAdmin name verified avatar publicCardPacksCount created updated')
                .exec()
                .then(users => {
                user_1.default.count(findBase)
                    .exec()
                    .then(usersTotalCount => {
                    if (pageCountF * (pageF - 1) > usersTotalCount)
                        pageF = 1;
                    cookie_1.resCookie(res, user).status(200)
                        .json({
                        users,
                        page: pageF, pageCount: pageCountF, usersTotalCount,
                        minPublicCardPacksCount: minF, maxPublicCardPacksCount: maxF,
                        token: user.token,
                        tokenDeathTime: user.tokenDeathTime,
                    });
                })
                    .catch(e => errorStatuses_1.status500(res, e, user, 'getUsers/User.count'));
            })
                .catch(e => errorStatuses_1.status500(res, e, user, 'getUsers/User.find'));
        })
            .catch(e => errorStatuses_1.status500(res, e, user, 'getUsers/User.findOne/max'));
    })
        .catch(e => errorStatuses_1.status500(res, e, user, 'getUsers/User.findOne/min'));
});
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
//# sourceMappingURL=getUsers.js.map