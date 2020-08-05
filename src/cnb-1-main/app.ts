import {Express, NextFunction, Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

export const appUse = (app: Express) => {
    // const whitelist = ['http://localhost:3000', 'http://example2.com'];
    const corsOptions = {
        credentials: true,
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
            // if(whitelist.includes(origin || ""))
            //     return callback(null, true)
            //
            // callback(new Error('Not allowed by CORS'));
            console.log("origin: ", origin);
            callback(null, true); // everyone is allowed
        }
    };

    app.use(cors(corsOptions));
    app.use(cookieParser());

    // parse application/json
    app.use(bodyParser.json({limit: "7mb"}));
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({limit: "7mb", extended: false}));

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
