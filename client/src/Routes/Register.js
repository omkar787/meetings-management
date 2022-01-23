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

	return <div>Register</div>;
}
