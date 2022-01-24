import axios from "axios";
import React, { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "../Methods/validator";
import {
	preDivCss,
	formCss,
	inputCss,
	inputBtnCss,
	linkCss,
} from "../config/authCss";

export default function Login() {
	const navigate = useNavigate();

	async function getLoggged() {
		const isLoggedIn = await validator();
		if (isLoggedIn) {
			navigate("/");
		}
	}

	useLayoutEffect(() => {
		getLoggged();
	}, []);

	async function onSubmitHandle(e) {
		e.preventDefault();
		const { email, password } = e.target;
		const { data } = await axios.post("/login", {
			email: email.value,
			password: password.value,
		});

		if (data.ok) {
			localStorage.setItem("token", data.token);
			navigate("/");
		}
	}

	return (
		<div>
			<div className={preDivCss}>
				<form className={formCss} onSubmit={onSubmitHandle}>
					<div>
						<input
							className={inputCss}
							type="email"
							name="email"
							placeholder="Email"
						/>
					</div>

					<div>
						<input
							type="password"
							name="password"
							placeholder="Password"
							className={inputCss}
						/>
					</div>
					<div>
						<input
							className={inputBtnCss}
							type="submit"
							value="Login"
						/>
					</div>
					<div>
						<Link className={linkCss} to="/register">
							Register
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
