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
exports.fileGet = exports.filePost = void 0;
const fs_1 = __importDefault(require("fs"));
const filePost = (path, shop) => shop.post(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileData = req.file;
    console.log(fileData);
    if (fileData)
        res.status(200).json({ success: true, fileName: fileData.originalname });
    else
        res.status(500).json({ error: 'some error, I hz :)' });
}));
exports.filePost = filePost;
const fileGet = (path, shop) => shop.get(path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.query;
    console.log(url);
    fs_1.default.readFile(__dirname + '/../../../uploads/file.jpg', (e, data) => {
        if (!e) {
            res.end(data);
        }
        else
            res.status(500).json({ error: 'some error, I hz :)', errorObj: Object.assign({}, e) });
    });
}));
exports.fileGet = fileGet;
//# sourceMappingURL=filePost.js.map