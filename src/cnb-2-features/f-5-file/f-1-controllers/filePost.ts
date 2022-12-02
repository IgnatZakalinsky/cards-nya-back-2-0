import {Request, Response, Router} from "express";
import fs from 'fs';

export const filePost = (path: string, shop: Router) =>

    shop.post(path, async (req: Request, res: Response) => {
        const fileData = req.file;
        console.log(fileData);

        if (fileData) res.status(200).json({success: true, fileName: fileData.originalname});

        else res.status(500).json({error: 'some error, I hz :)'})
    });


export const fileGet = (path: string, shop: Router) =>

    shop.get(path, async (req: Request, res: Response) => {
        const {url} = req.query;
        console.log(url);

        fs.readFile(__dirname + '/../../../uploads/file.jpg', (e, data) => {
            if (!e) {
                res.end(data);

            } else res.status(500).json({error: 'some error, I hz :)', errorObj: {...e}})
        });
    });
