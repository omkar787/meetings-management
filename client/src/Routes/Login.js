import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "../Methods/validator";
import ReactLoading from "react-loading";

import {
	preDivCss,
	formCss,
	inputCss,
	inputBtnCss,
	linkCss,
} from "../config/authCss";

export default function Login() {
	document.title = "Login";
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

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
		setLoading(true);

		e.preventDefault();
		const { email, password } = e.target;
		const { data } = await axios.post("/login", {
			email: email.value,
			password: password.value,
		});

		if (data.ok) {
			localStorage.setItem("token", data.token);
			navigate("/");
		} else {
			setLoading(false);
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 3000);
		}
	}

	return (
		<div>
			<div className={preDivCss}>
				<form className={formCss} onSubmit={onSubmitHandle}>
					{error ? (
						<div className='bg-red-600 text-white p-2 rounded-full shadow-lg shadow-red-400'>
							An Error occured
						</div>
					) : null}
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
							type="password"
							name="password"
							placeholder="Password"
							min={5}
							className={inputCss}
							required
						/>
					</div>
					<div>
						{loading ? (
							<div className='flex justify-center '>
								<ReactLoading
									color='rgb(255, 123, 0)'
									type='bars'
								/>
							</div>
						) : (
							<input
								className={inputBtnCss}
								type="submit"
								value="Login"
							/>
						)}

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
