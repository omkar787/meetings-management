const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//middlewares
const validator = require("./Middlewares/validator");

//Routes
const Register = require("./routes/Register");
const Login = require("./routes/Login");
const AddMeeting = require("./routes/Meetings/create");
const GetAll = require("./routes/Meetings/getAll");
const Delete = require("./routes/Meetings/delete");
const Update = require("./routes/Meetings/update");
const ValidateRoute = require("./routes/ValidateRoute");

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
app.use("/m/update", validator, Update);
app.use("/m/delete", validator, Delete);
app.use("/m/getall", validator, GetAll);
app.use("/validate", validator, ValidateRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
