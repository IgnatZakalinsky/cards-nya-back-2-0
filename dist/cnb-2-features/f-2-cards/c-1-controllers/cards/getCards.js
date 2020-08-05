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
exports.getCards = void 0;
const findUserByToken_1 = require("../../../f-1-auth/a-3-helpers/h-2-users/findUserByToken");
const card_1 = __importDefault(require("../../c-2-models/card"));
const cardsPack_1 = __importDefault(require("../../c-2-models/cardsPack"));
const grade_1 = __importDefault(require("../../c-2-models/grade"));
exports.getCards = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageCount, sortCards, cardAnswer, cardQuestion, min, max, cardsPack_id } = req.query;
    let pageF = +page || 1;
    const pageCountF = +pageCount || 4;
    const sortCardsF = sortCards || ''; // '0grade'
    const cardAnswerF = cardAnswer || '';
    const cardQuestionF = cardQuestion || '';
    const cardsPack_idF = cardsPack_id || '';
    // cardsPack_idF && await Card.create({
    //     cardsPack_id: cardsPack_idF,
    //     question: 'no question',
    //     answer: 'no answer',
    //     grade: Math.random() * 5,
    //     shots: 1,
    //
    //     type: 'card',
    //     rating: 0
    // }); // seed
    cardsPack_1.default.findById(cardsPack_idF)
        .exec()
        .then((oldCardsPack) => {
        if (!oldCardsPack)
            findUserByToken_1.status400(res, `CardsPack id not valid`, user, 'getCards');
        else
            card_1.default.findOne({ cardsPack_id: cardsPack_idF })
                .sort({ grade: 1 })
                .exec()
                .then((packMin) => {
                const minF = packMin ? packMin.grade : 0;
                card_1.default.findOne({ cardsPack_id: cardsPack_idF })
                    .sort({ grade: -1 }).exec()
                    .then((packMax) => {
                    const maxF = packMax ? packMax.grade : minF;
                    const sortName = sortCardsF && sortCardsF.length > 2 ? sortCardsF.slice(1) : undefined;
                    const direction = sortName ? (sortCardsF[0] === '0' ? -1 : 1) : undefined;
                    card_1.default.find({
                        cardsPack_id: cardsPack_idF,
                        question: new RegExp(cardQuestionF),
                        answer: new RegExp(cardAnswerF),
                        grade: { $gte: +min || minF, $lte: +max || maxF }
                    })
                        .sort({ [sortName]: direction, updated: -1 })
                        .skip(pageCountF * (pageF - 1))
                        .limit(pageCountF)
                        .lean()
                        .exec()
                        .then(cards => {
                        card_1.default.count({
                            cardsPack_id: cardsPack_idF,
                            question: new RegExp(cardQuestionF),
                            answer: new RegExp(cardAnswerF),
                            grade: { $gte: +min || minF, $lte: +max || maxF }
                        })
                            .exec()
                            .then(cardsTotalCount => {
                            if (pageCountF * (pageF - 1) > cardsTotalCount)
                                pageF = 1;
                            grade_1.default.find({ cardsPack_id: cardsPack_idF, user_id: user._id })
                                .lean()
                                .exec()
                                .then(grades => {
                                const cardsF = cards.map(c => {
                                    const grade = grades.find(g => g.card_id.equals(c._id));
                                    if (!grade)
                                        return c;
                                    else
                                        return Object.assign(Object.assign({}, c), { grade: grade.grade, shots: grade.shots });
                                });
                                res.status(200)
                                    .json({
                                    cards: cardsF,
                                    page: pageF, pageCount: pageCountF, cardsTotalCount,
                                    minGrade: minF, maxGrade: maxF,
                                    token: user.token,
                                    tokenDeathTime: user.tokenDeathTime,
                                });
                            })
                                .catch(e => findUserByToken_1.status500(res, e, user, 'getCards/Grade.find'));
                        })
                            .catch(e => findUserByToken_1.status500(res, e, user, 'getCards/Card.count'));
                    })
                        .catch(e => findUserByToken_1.status500(res, e, user, 'getCards/Card.find'));
                })
                    .catch(e => findUserByToken_1.status500(res, e, user, 'getCards/Card.findOne/max'));
            })
                .catch(e => findUserByToken_1.status500(res, e, user, 'getCards/Card.findOne/min'));
    })
        .catch(e => findUserByToken_1.status500(res, e, user, 'getCards/CardsPack.findById'));
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
//# sourceMappingURL=getCards.js.map