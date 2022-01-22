const router = require('express').Router()
const Meeting = require("../../models/Meeting")

router.put("/:id/:name",
    async (req, res) => {
        try {
            if (req.params.name && req.body[req.params.name]) {
                if (req.params.name === "duration") {
                    if (req.body.duration > 500 || req.body.duration < 10) {
                        res.json({ ok: false, msg: "Duration has a limit of  maximum 6 hours and minimum 10 minutes" })
                    } else {
                        const name = req.params.name
                        const meet = await Meeting.findById(req.params.id)
                        meet[name] = req.body[name]
                        const updatedMeet = await meet.save()
                        res.json({ ok: true, msg: "Document successfully updates", data: updatedMeet })
                    }
                } else {
                    const name = req.params.name
                    const meet = await Meeting.findById(req.params.id)
                    meet[name] = req.body[name]
                    const updatedMeet = await meet.save()
                    res.json({ ok: true, msg: "Document successfully updates", data: updatedMeet })
                }
            } else {
                res.json({ ok: false, msg: "Please provide the required fields" })
            }
        } catch (err) {
            console.log(err);
            res.json({ ok: false, error: err })
        }
    })


module.exports = router