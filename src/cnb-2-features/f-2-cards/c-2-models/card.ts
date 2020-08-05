import mongoose, {Schema, Document} from "mongoose";

export interface ICard extends Document {
    _id: mongoose.Types.ObjectId;
    cardsPack_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;

    question: string;
    answer: string;
    grade: number;
    shots: number;

    questionImg: string;
    answerImg: string;
    answerVideo: string;
    questionVideo: string;

    comments: string;

    type: string;
    rating: number;
    more_id: mongoose.Types.ObjectId;

    created: Date;
    updated: Date;

    _doc: object; // crutch
}

const Card: Schema = new Schema(
    {
        cardsPack_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
        }

    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
);

export default mongoose.model<ICard>('cards-nya', Card);
