import axios from "axios";
import React, { useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "../Methods/validator";
import {preDivCss,formCss, inputCss,inputBtnCss,linkCss} from '../config/authCss'
export default function Register() {
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
		const { name, email, password } = e.target;
		const { data } = await axios.post("/register", {
			name: name.value,
			email: email.value,
			password: password.value,
		});

		if (data.ok) {
			navigate("/login");
		}
	}

	return (
		<div>
			<div className={preDivCss}>
				<form
					className={formCss}
					onSubmit={onSubmitHandle}
				>
					<div>
						<input
							className={inputCss}
							type="text"
							name="name"
							placeholder="Name"
							required
						/>
					</div>
					<div>
						<input
							className={inputCss}
							type="email"
							name="email"
							placeholder="Email"
							required
						/>
					</div>

					<div>
						<input
							className={inputCss}
							type="password"
							name="password"
							placeholder="Password"
							required
						/>
					</div>
					<div>
						<input
							className={inputBtnCss}
							type="submit"
							value="Register"
						/>
					</div>
					<div >
						<Link className={linkCss} to="/login">Login</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
