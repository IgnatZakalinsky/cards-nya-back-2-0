import express from "express";
import mongoose from "mongoose";
import {MongoDBUris, PORT} from "./cnb-1-main/config";
import {appUse} from "./cnb-1-main/app";
import {routes} from "./cnb-1-main/routes";
// yarn upgrade

const app = express();

appUse(app);
routes(app);

mongoose.connect(MongoDBUris, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
        console.log("Nya-MongoDB connected successfully");

        const port = process.env.PORT || PORT;

        app.listen(port, () => {
            console.log("Cards-Nya-back 2.0 listening on port: " + port);
        });
    })
    .catch(e => console.log("Nya-MongoDB connection error: ", {...e}));

process.on("unhandledRejection", (reason, p) => {
    console.log("Nya-unhandledRejection: ", reason, p);
});
