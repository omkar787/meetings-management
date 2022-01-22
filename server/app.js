const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Register = require("./routes/Register");
const Login = require("./routes/Login");
const AddMeeting = require("./routes/Meetings/create");
const validator = require("./Middlewares/validator");

const app = express();

dotenv.config();

mongoose
	.connect(process.env.CONNECTION_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch((err) => {
		console.log("Database connection failed " + err);
	});

app.use(cors());
app.use(express.json());

app.use("/register", Register);
app.use("/login", Login);
app.use("/m/add", validator, AddMeeting);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
