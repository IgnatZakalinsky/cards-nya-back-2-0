import mongoose, {Schema, Document} from "mongoose";

export interface IGrade extends Document {
    _id: mongoose.Types.ObjectId;
    cardsPack_id: mongoose.Types.ObjectId;
    card_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;

    grade: number;
    shots: number;

    more_id: mongoose.Types.ObjectId;

    created: Date;
    updated: Date;

    _doc: object; // crutch
}

const Grade: Schema = new Schema(
    {
        card_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        cardsPack_id: {
            type: Schema.Types.ObjectId,
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

export default mongoose.model<IGrade>('cards-nya-grade', Grade);
