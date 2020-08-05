import mongoose, {Schema, Document} from "mongoose";

export interface ICardsPack extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    user_name: string;
    private: boolean;

    name: string;
    path: string;
    grade: number;
    shots: number;

    cardsCount: number;
    deckCover: string;

    type: string;
    rating: number;
    more_id: mongoose.Types.ObjectId;

    created: Date;
    updated: Date;

    _doc: object; // crutch
}

const CardsPack: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        user_name: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        private: {
            type: Boolean,
            required: true
        },

        path: {
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
        cardsCount: {
            type: Number,
            required: true
        },
        deckCover: {
            type: String,
        },

        type: {
            type: String,
            required: true
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

export default mongoose.model<ICardsPack>('cards-nya-pack', CardsPack);
