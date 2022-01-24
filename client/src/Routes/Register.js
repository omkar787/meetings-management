import axios from "axios";
import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "../Methods/validator";

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
		<div className=' flex items-center justify-center h-screen'>
			<div>
				<form onSubmit={onSubmitHandle}>
					<div>
						<input type='text' name='name' placeholder='Name' />
					</div>
					<div>
						<input type='email' name='email' placeholder='Email' />
					</div>

					<div>
						<input
							type='password'
							name='password'
							placeholder='Password'
						/>
					</div>
					<div>
						<input type='submit' value='Register' />
					</div>
				</form>
			</div>
		</div>
	);
}
