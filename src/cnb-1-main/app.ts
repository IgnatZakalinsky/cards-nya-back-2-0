import {Express, NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import {cookie} from "./cookie";

export const appUse = (app: Express) => {
    cookie(app);

    // parse application/json
    app.use(bodyParser.json({limit: "1mb"}));
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({limit: "1mb", extended: false}));

    // log middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log("Time: ", new Date().toString());
        console.log("-----", req.method, req.url, "params:", req.params);
        console.log("query:", req.query);
        console.log("body:", req.body);
        console.log("cookies:", req.cookies);
        // console.log("headers:", req.headers);
        // console.log("rawHeaders:", req.rawHeaders);
        next();
    });
};
