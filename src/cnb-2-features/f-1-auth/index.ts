import express from "express";
import {getUsersForDev} from "./a-1-controllers/getUsersForDev";
import {logIn} from "./a-1-controllers/logIn";
import {createUser} from "./a-1-controllers/createUser";
import {getMe} from "./a-1-controllers/getMe";
import {findUserByToken} from "./a-3-helpers/h-2-more/findUserByToken";
import {passwordRecovery} from "./a-1-controllers/passwordRecovery";
import {setNewPassword} from "./a-1-controllers/setNewPassword";
import {updateUser} from "./a-1-controllers/updateUser";
import {logOut} from "./a-1-controllers/logOut";
import {block} from "./a-1-controllers/block";

const auth = express.Router();

auth.get("/", getUsersForDev); // for dev

auth.post("/login", logIn);
auth.post("/register", createUser);
auth.post("/me", findUserByToken(getMe, "getMe"));
auth.post("/block", findUserByToken(block, "block"));
auth.put("/me", findUserByToken(updateUser, "updateUser"));
auth.delete("/me", findUserByToken(logOut, "logOut"));
auth.post("/forgot", passwordRecovery);
auth.post("/set-new-password", setNewPassword);

export default auth;
