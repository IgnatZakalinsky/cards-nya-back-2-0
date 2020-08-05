import express from "express";
import mongoose from "mongoose";
import {MongoDBUris} from "./cnb-1-main/config";
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

        app.listen(process.env.PORT, () => {
            console.log("Cards-Nya-back 2.0 listening on port: " + process.env.PORT);
        });
    })
    .catch(e => console.log("Nya-MongoDB connection error: ", {...e}));

process.on("unhandledRejection", (reason, p) => {
    console.log("Nya-unhandledRejection: ", reason, p);
});
