const router = require("express").Router();
const Meeting = require("../../models/Meeting")
const User = require("../../models/User")
// const { body, param, validationResult } = require("express-validator")
// router.post("/", (req, res) => { });


router.delete("/:id",
    async (req, res) => {
        try {
            if (req.params.id) {
                const meet = await Meeting.findByIdAndDelete(req.params.id)
                const user = await User.findById(meet.createdBy)
                user.meetings = user.meetings.splice(user.meetings.indexOf(meet), 1)
                await user.save()
                res.json({ ok: true, msg: "Meeting succesfully deleted" })
            } else {
                res.json({ ok: false, msg: "Please provide a valid id" })
            }
        } catch (err) {
            console.log(err);
            res.json({ ok: false, msg: "An error occurred", error: err })
        }
    })
module.exports = router;
