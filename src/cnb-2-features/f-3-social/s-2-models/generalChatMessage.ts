import mongoose, {Schema, Document} from "mongoose";

export interface IGeneralChatMessage extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    user_name: string;
    isAdmin: boolean;
    avatar: string;

    message: string;

    created: Date;
    updated: Date;

    _doc: object; // crutch
}

const GeneralChatMessageSchema: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        user_name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
        },

        message: {
            type: String,
            required: true
        },

    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
);

export default mongoose.model<IGeneralChatMessage>('general-nya-chat-message', GeneralChatMessageSchema);
