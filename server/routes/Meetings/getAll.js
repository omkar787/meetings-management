const router = require('express').Router()
const User = require('../../models/User')
const Meetings = require("../../models/Meeting")

router.get("/", async (req, res) => {
    try {
        const meets = await Meetings.find({ createdBy: req.user._id })
        res.json({ ok: true, data: meets })
    } catch (err) {
        console.log(err);
        res.json({ ok: false, msg: "An error occured", error: err })
    }
})


module.exports = router