import express from "express";
// import {getUsersForDev} from "./a-1-controllers/getUsersForDev";
import {logIn} from "./a-1-controllers/logIn";
import {createUser} from "./a-1-controllers/createUser";
// import {getMe} from "./a-1-controllers/getMe";
// import {passwordRecovery} from "./a-1-controllers/passwordRecovery";
// import {setNewPassword} from "./a-1-controllers/setNewPassword";
// import {findUserByToken} from "./a-3-helpers/h-2-users/findUserByToken";
// import {updateUser} from "./a-1-controllers/updateUser";

const auth = express.Router();

// auth.get("/", getUsersForDev); // for dev

auth.post("/login", logIn);
auth.post("/register", createUser);
// auth.post("/me", findUserByToken(getMe, "getMe"));
// auth.put("/me", findUserByToken(updateUser, "updateUser"));
// auth.post("/forgot", passwordRecovery);
// auth.post("/set-new-password", setNewPassword);

export default auth;
