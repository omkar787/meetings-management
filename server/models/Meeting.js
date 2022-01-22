const mongoose = require("mongoose");

const meetingsSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		trim: true,
		required: true,
	},
	start: {
		type: mongoose.SchemaTypes.Date,
		required: true,
	},
	duration: {
		type: mongoose.SchemaTypes.Number,
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model("meeting", meetingsSchema);
