let USER_NAME = process.env.MONGO_DB_USER_NAME || "lesson5";
let PASSWORD = process.env.MONGO_DB_USER_PASSWORD || "1qaz2wsx";
let MONGO_DB_URL = process.env.MONGO_DB_URL || "cluster0.gbcdgvc.mongodb.net/nekobd"; // bd for tests


export const MongoDBUris = `mongodb+srv://${USER_NAME}:${PASSWORD}@${MONGO_DB_URL}?retryWrites=true&w=majority`;

export const DEV_VERSION = false;

export const VERSION_2_0 = "/2.0";

export const GMAIL_USER = "";
export const GMAIL_PASS = "";

export const PORT = 7542;