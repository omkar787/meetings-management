const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validator = async (req, res, next) => {
	try {
		if (req.headers["authorization"]) {
			const token = req.headers["authorization"].split(" ")[1];
			if (token) {
				const auth = jwt.verify(token, process.env.JWT_KEY);
				const user = await User.findOne(
					{ email: auth.email },
					"-password"
				);
				req.user = user;
				next();
			} else {
				res.json({ ok: false, msg: "Token not provided" });
			}
		} else {
			res.json({ ok: false, msg: "Please provide a valid token" });
		}
	} catch (err) {
		console.log(err);
		res.json({ ok: false, msg: "An Error occured", error: err });
	}
};

module.exports = validator;
