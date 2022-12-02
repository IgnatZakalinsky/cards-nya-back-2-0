import express from "express";
import {fileGet, filePost} from "./f-1-controllers/filePost";

const file = express.Router();

filePost('/', file);
fileGet('/', file);

export default file;
