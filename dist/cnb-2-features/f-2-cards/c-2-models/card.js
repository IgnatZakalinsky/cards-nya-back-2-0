"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Card = new mongoose_1.Schema({
    cardsPack_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    shots: {
        type: Number,
        required: true
    },
    questionImg: {
        type: String,
    },
    answerImg: {
        type: String,
    },
    answerVideo: {
        type: String,
    },
    questionVideo: {
        type: String,
    },
    comments: {
        type: String,
    },
    type: {
        type: String,
    },
    rating: {
        type: Number,
        required: true
    },
    more_id: {
        type: mongoose_1.Schema.Types.ObjectId,
    }
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
});
exports.default = mongoose_1.default.model('cards-nya', Card);
//# sourceMappingURL=card.js.map