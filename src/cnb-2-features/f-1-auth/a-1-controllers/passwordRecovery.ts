import {Request, Response} from "express";
import User, {IUser} from "../a-2-models/user";
import {DEV_VERSION} from "../../../cnb-1-main/config";
import {sendMail} from "../a-3-helpers/h-1-gmail/gmail";
import {generateResetPasswordToken} from "../a-3-helpers/h-2-users/generateResetPasswordToken";
import {emailValidator} from "../a-3-helpers/h-2-users/validators";

export const passwordRecovery = async (req: Request, res: Response) => {
    if (!emailValidator(req.body.email)) res.status(400)
        .json({error: 'Email address not valid', in: 'passwordRecovery'});

    else try {
        const user: IUser | null = await User.findOne({email: req.body.email}).exec();

        if (!user) res.status(404).json({error: 'Email address not found', in: 'passwordRecovery'});

        else {
            try {
                const resetPasswordToken = await generateResetPasswordToken(user._id);

                const html = (req.body.html1 ||
                    '<div style="color: lime; background-color: black; padding: 10px">' +
                    'password recovery link: ' +
                    `<a href="http://localhost:3000/#/set-new-password/${resetPasswordToken}">` +
                    `http://localhost:3000/#/set-new-password/${resetPasswordToken}` +
                    '</a>' +
                    '<div>resetPasswordToken: ') +
                    resetPasswordToken +
                    (req.body.html2 ||
                        '</div>' +
                        '</div>');

                const info = await sendMail(
                    user.email,
                    'password recovery',
                    html
                );

                res.status(200).json({
                    status: "sent",
                    success: Boolean(info.accepted && info.accepted.length > 0),
                    info: DEV_VERSION && info,
                    html: DEV_VERSION && !user.isAdmin && html,
                });

            } catch (e) {
                res.status(500)
                    .json({error: 'some error', errorObject: DEV_VERSION && e, in: 'passwordRecovery/sendMail'});
            }
        }
    } catch (e) {
        res.status(500)
            .json({error: 'some error', errorObject: DEV_VERSION && e, in: 'passwordRecovery/User.findOne'});
    }
};
