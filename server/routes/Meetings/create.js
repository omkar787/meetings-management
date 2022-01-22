const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../../models/User");
const Meeting = require("../../models/Meeting");

router.post(
	"/",
	body("title").isString().trim(),
	body("description").isString().trim(),
	body("start").isString(),
	body("duration").isInt({ min: 10, max: 300 }),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.json({ ok: false, error: errors.array() });
			} else {
				const { title, description, start, duration } = req.body;
				const user = await User.findById(req.user._id);
				const meet = await Meeting.create({
					title,
					description,
					start,
					duration,
					createdBy: req.user._id,
				});
				user.meetings.push(meet._id);
				await user.save();

				res.json({
					ok: true,
					msg: "Meeting succesfully created",
					data: {
						id: meet._id,
						title,
						description,
						start,
						duration,
						createdBy: req.user.email,
					},
				});
			}
		} catch (err) {
			console.log(err);
			res.json({ ok: false, msg: "An error occured", error: err });
		}
	}
);

module.exports = router;
