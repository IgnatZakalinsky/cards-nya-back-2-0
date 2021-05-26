import {Express, Request, Response} from "express";
import {VERSION_2_0} from "./config";
import auth from "../cnb-2-features/f-1-auth";
import cards from "../cnb-2-features/f-2-cards";
import social from "../cnb-2-features/f-3-social";

export const routes = (app: Express) => {
    app.use(VERSION_2_0 + "/auth", auth);
    app.use(VERSION_2_0 + "/cards", cards);
    app.use(VERSION_2_0 + "/social", social);

    // ping endpoint
    app.use(VERSION_2_0 + "/ping", (req: Request, res: Response) => {
        // save statistic
        const backTime = new Date().getTime();
        const frontTime = +req.body.frontTime || (req.query.frontTime && +req.query.frontTime) || (backTime + 1);
        const ping = backTime - frontTime;
        console.warn("!!! PING: ", ping); // need log always

        res.status(200).json({
            ping,
            backTime,
            frontTime: frontTime > backTime ? "—ฅ/ᐠ.̫ .ᐟ\\ฅ—" : frontTime,
            info: "please send me you time —ฅ/ᐠ.̫ .ᐟ\\ฅ—", // https://cutekaomoji.com/animals/cats/
        });
    });

    // default
    app.use((req: Request, res: Response) => {
        console.log("Nya-bad url: ", req.method, req.url);
        res.status(404).json({
            error: "bad url /ᐠ｡ꞈ｡ᐟ\\",
            method: req.method,
            url: req.url,
            query: req.query,
            body: req.body,
        });
    });
};
