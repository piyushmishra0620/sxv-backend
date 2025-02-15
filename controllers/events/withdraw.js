const User = require("../../models/user");
const Event = require("../../models/events");
module.exports = async (req, res) => {
    const userId = req.body.userId;
    console.log(req.body)
    User.findByIdAndUpdate(userId, { $pull: { events: await req.body.eventId } }, { new: true }).then(async (participated) => {

        Event.findByIdAndUpdate(await req.body.eventId, { $pull: { participants: userId } }, { new: true }).then(async (event) => {

       return  res.json({ Message: `Uh oh! We are sad to see you withdraw from ${await req.body.eventName}!`, participated, success: true })
    })
}).catch((err) => {
    console.log(err)
    res.json({ message: "An error occured internally", success: false })

})

}