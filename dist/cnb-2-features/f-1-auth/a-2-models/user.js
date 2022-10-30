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
const UserSchema = new mongoose_1.Schema({
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
}, {
    timestamps: {
        createdAt: "created",
        updatedAt: "updated",
    },
});
exports.default = mongoose_1.default.model("cards-nya-user", UserSchema);
//# sourceMappingURL=user.js.map