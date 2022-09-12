import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    rememberMe: boolean;
    isAdmin: boolean;

    name: string;
    verified: boolean;
    avatar?: string;
    publicCardPacksCount: number;

    token?: string;
    tokenDeathTime?: number;
    resetPasswordToken?: string;
    resetPasswordTokenDeathTime?: number;

    isDeleted?: boolean
    deleteTime?: number

    isBlocked?: boolean
    blockTime?: number
    blockUserId?: string
    blockReason?: string

    created: Date;
    updated: Date;

    _doc: object; // crutch
}

const UserSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        rememberMe: {
            type: Boolean,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            required: true
        },
        avatar: {
            type: String,
        },
        publicCardPacksCount: {
            type: Number,
            required: true
        },

        token: {
            type: String,
        },
        tokenDeathTime: {
            type: Number,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordTokenDeathTime: {
            type: Number,
        },
        isDeleted: {
            type: Boolean,
        },
        deleteTime: {
            type: Number,
        },
        isBlocked: {
            type: Boolean,
        },
        blockTime: {
            type: Number,
        },
        blockUserId: {
            type: String,
        },
        blockReason: {
            type: String,
        },

    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated",
        },
    }
);

export default mongoose.model<IUser>("cards-nya-user", UserSchema);
