import express from "express";
import http from "http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import {MongoDBUris, PORT} from "./cnb-1-main/config";
import {appUse} from "./cnb-1-main/app";
import {routes} from "./cnb-1-main/routes";
import {onConnect} from "./cnb-2-features/f-3-social/s-1-controllers/c1-socket";
// xxx

const app = express();

appUse(app);
routes(app);

const server = http.createServer(app);
const socketServer = new Server(server);

socketServer.on('connection', onConnect(socketServer));

/////////////////////////////////////////////////////////////////
console.log({MongoDBUris})
mongoose.connect(MongoDBUris, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
})
    .then(() => {
        console.log("Nya-MongoDB connected successfully");
        // setInterval(() => {
        //     console.log('xxx')
        // }, 1000)

        const port = process.env.PORT || PORT;

        server.listen(port, () => {
            console.log("Cards-Nya-back 2.0 listening on port: " + port);
        });
    })
    .catch(e => console.log("Nya-MongoDB connection error: ", {...e}));

process.on("unhandledRejection", (reason, p) => {
    console.log("Nya-unhandledRejection: ", reason, p);
});
