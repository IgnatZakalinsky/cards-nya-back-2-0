import User from "./cnb-2-features/f-1-auth/a-2-models/user";
import CardsPack from "./cnb-2-features/f-2-cards/c-2-models/cardsPack";

export const runScrs = async () => {
    const d = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
    console.log({date: d})

    const users = await User
        .find({
            verified: {$ne: true},
            updated: {$lt: d},
            isBlocked: {$ne: true},
        })
    console.log({l: users.length})

    let ui = 0

    for (let u of users) {
        const ps = await CardsPack.find({user_id: users[0]._id.toString()},)

        ui++
        let pi = 0
        for (let p of ps) {
            await CardsPack.findByIdAndUpdate(p._id, {isBlocked: true}, {new: true})
            pi++
            console.log({l: users.length, ui, pi})
        }

        await User.findByIdAndUpdate(
            u._id,
            {
                isBlocked: true,
                blockTime: Date.now(),
                blockReason: 'не верифицирован емаил более месяца',
                blockUserId: 'admin'
            }
        )
    }

}