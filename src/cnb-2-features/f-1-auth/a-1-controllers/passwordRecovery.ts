import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {DEV_VERSION} from "../../../cnb-1-main/config";
import {sendMail} from "../a-3-helpers/h-3-gmail/gmail";
import {emailRegExp, emailValidator} from "../a-3-helpers/h-2-more/validators";
import {generateResetPasswordToken} from "../a-3-helpers/h-2-more/generateToken";

export const passwordRecovery = async (req: Request, res: Response) => {
    const {email, html1, html2, message, from} = req.body;

    if (!emailValidator(email)) res.status(400)
        .json({error: "Email address not valid /ᐠ-ꞈ-ᐟ\\", email, emailRegExp, in: "passwordRecovery"});

    else try {
        const user: IUser | null = await User.findOne({email}).exec();

        if (!user) res.status(404)
            .json({error: "Email address not found /ᐠ-ꞈ-ᐟ\\", email, in: "passwordRecovery"});

        else {
            try {
                const resetPasswordToken = await generateResetPasswordToken(user._id);

                let html: string = message;

                if (message && message.includes("$token$")) {
                    do {
                        html = html.replace("$token$", resetPasswordToken);
                    } while (html.includes("$token$"));

                } else {
                    html = (
                        html1 ||
                        '<div style="color: lime; background-color: black; padding: 10px">' +
                        'password recovery link: ' +
                        `<a href="http://localhost:3000/#/set-new-password/${resetPasswordToken}">` +
                        `http://localhost:3000/#/set-new-password/${resetPasswordToken}` +
                        '</a>' +
                        '<div>resetPasswordToken: '
                    ) + resetPasswordToken + (
                        html2 ||
                        '</div>' +
                        '</div>'
                    );
                }

                const fromFinal = from || "cards-nya <neko.nyakus.cafe@gmail.com>";

                const answer = await sendMail(
                    fromFinal,
                    email,
                    "password recovery",
                    html
                );

                res.status(200).json({
                    info: "sent —ฅ/ᐠ.̫ .ᐟ\\ฅ—",
                    success: Boolean(answer.accepted && answer.accepted.length > 0),
                    answer: DEV_VERSION && answer,
                    html: DEV_VERSION && html,
                });

            } catch (e) {
                res.status(500).json({
                    error: "some error: " + e.message,
                    info: "Back doesn't know what the error is... ^._.^",
                    errorObject: DEV_VERSION && e,
                    in: "passwordRecovery/sendMail"
                });
            }
        }
    } catch (e) {
        res.status(500).json({
            error: "some error: " + e.message,
            info: "Back doesn't know what the error is... ^._.^",
            errorObject: DEV_VERSION && e,
            in: "passwordRecovery/User.findOne"
        });
    }
};
