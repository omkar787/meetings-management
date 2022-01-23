const router = require("express").Router();

router.get("/", (req, res) => {
	try {
		res.json({ ok: true });
	} catch (err) {
		console.log(err);
		res.json({ ok: false });
	}
});

module.exports = router;
