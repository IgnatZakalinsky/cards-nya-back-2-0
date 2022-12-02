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
const card_1 = __importDefault(require("../../c-2-models/card"));
const cardsPack_1 = __importDefault(require("../../c-2-models/cardsPack"));
const grade_1 = __importDefault(require("../../c-2-models/grade"));
const errorStatuses_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses");
const cookie_1 = require("../../../../cnb-1-main/cookie");
const getCards = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageCount, sortCards, cardAnswer, cardQuestion, min, max, cardsPack_id, type } = req.query;
    let pageF = page && +page || 1;
    const pageCountF = pageCount && +pageCount || 4;
    const sortCardsF = sortCards || ""; // '0grade'
    const cardAnswerF = cardAnswer || "";
    const cardQuestionF = cardQuestion || "";
    const cardsPack_idF = cardsPack_id || "";
    const typeF = type || "pack";
    // cardsPack_idF && await Card.create({
    //     cardsPack_id: cardsPack_idF,
    //     user_id: user._id,
    //
    //     answer: "seed answer",
    //     question: "seed question",
    //     grade: 0,
    //     shots: 0,
    //
    //     questionImg: "",
    //     answerImg: "",
    //     answerVideo: "",
    //     questionVideo: "",
    //
    //     comments: "",
    //     type: "pack",
    //     rating: 0,
    //     more_id: user._id,
    //
    //     created: new Date(),
    //     updated: new Date(),
    //
    //     _doc: {}, // crutch
    // }); // seed
    cardsPack_1.default.findById(cardsPack_idF)
        .exec()
        .then((oldCardsPack) => {
        if (!oldCardsPack)
            (0, errorStatuses_1.status400)(res, "CardsPack id not valid /ᐠ-ꞈ-ᐟ\\", user, "getCards", { query: req.query });
        else
            card_1.default.find({ cardsPack_id: cardsPack_idF })
                .exec()
                .then((allCards) => {
                grade_1.default.find({ cardsPack_id: cardsPack_idF, user_id: user._id })
                    .lean()
                    .exec()
                    .then(grades => {
                    // let minF = 0;
                    // let maxF = 6;
                    // const cardsF = allCards.map(c => {
                    //     const grade = grades.find(g => g.card_id.equals(c._id));
                    //
                    //     if (!grade) return c;
                    //     else {
                    //         if (minF > grade.grade) minF = grade.grade;
                    //         if (maxF < grade.grade) maxF = grade.grade;
                    //
                    //         return {...c, grade: grade.grade, shots: grade.shots};
                    //     }
                    // });
                    const sortName = (sortCardsF && sortCardsF.length > 2) ? sortCardsF.slice(1) : "";
                    const direction = sortName ? (sortCardsF[0] === "0" ? -1 : 1) : undefined;
                    const sortO = sortName ? { [sortName]: direction } : { updated: -1 };
                    const findO = {
                        cardsPack_id: cardsPack_idF,
                        question: new RegExp(cardQuestionF, "gi"),
                        answer: new RegExp(cardAnswerF, "gi"),
                        // grade: {$gte: min && +min || minF, $lte: max && +max || maxF}
                    };
                    // Card.count({...findO})
                    //     .exec()
                    //     .then(cardsTotalCount => {
                    //         if (pageCountF * (pageF - 1) > cardsTotalCount) pageF = 1;
                    card_1.default.find(Object.assign({}, findO))
                        .sort(sortO.grade ? { updated: -1 } : sortO)
                        // .skip(pageCountF * (pageF - 1))
                        // .limit(pageCountF)
                        .lean()
                        .exec()
                        .then(cards => {
                        let cardsF = cards.map(c => {
                            const grade = grades.find(g => g.card_id.equals(c._id));
                            if (!grade)
                                return c;
                            else
                                return Object.assign(Object.assign({}, c), { grade: grade.grade, shots: grade.shots });
                        }).filter(c => {
                            return (c.grade >= ((min && +min) || 0))
                                && (c.grade <= ((max && +max) || 6));
                        });
                        if (sortO.grade) {
                            cardsF.sort((a, b) => {
                                if (a.grade > b.grade)
                                    return 1;
                                if (a.grade < b.grade)
                                    return -1;
                                else
                                    return 0;
                            });
                            if (sortO.grade === 1) {
                                cardsF = cardsF.reverse();
                            }
                        }
                        if (pageCountF * (pageF - 1) > cardsF.length)
                            pageF = 1;
                        const cardsFF = cardsF.slice(pageCountF * (pageF - 1), pageCountF * pageF);
                        (0, cookie_1.resCookie)(res, user).status(200)
                            .json({
                            cards: cardsFF,
                            packUserId: oldCardsPack.user_id,
                            packName: oldCardsPack.name,
                            packPrivate: oldCardsPack.private,
                            packDeckCover: oldCardsPack.deckCover,
                            packCreated: oldCardsPack.created,
                            packUpdated: oldCardsPack.updated,
                            page: pageF, pageCount: pageCountF, cardsTotalCount: cardsF.length,
                            minGrade: 0, maxGrade: 6,
                            token: user.token,
                            tokenDeathTime: user.tokenDeathTime,
                        });
                    })
                        .catch(e => (0, errorStatuses_1.status500)(res, e, user, "getCards/Card.find"));
                    // })
                    // .catch(e => status500(res, e, user, "getCards/Card.count"));
                })
                    .catch(e => (0, errorStatuses_1.status500)(res, e, user, "getCards/Grade.find"));
            })
                .catch(e => (0, errorStatuses_1.status500)(res, e, user, "getCards/Card.find/all"));
    })
        .catch(e => (0, errorStatuses_1.status500)(res, e, user, "getCards/CardsPack.findById"));
});
exports.getCards = getCards;
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