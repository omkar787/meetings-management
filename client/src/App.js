import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Register from "./Routes/Register";

function App() {
	axios.defaults.baseURL = process.env.REACT_APP_BASE_URI;
	axios.defaults.headers.post["Content-Type"] = "application/json";
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
