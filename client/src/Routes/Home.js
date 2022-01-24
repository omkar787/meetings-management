import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "../Methods/validator";

export default function Home() {

	const navigate = useNavigate();

	async function getLoggged() {
		const isLoggedIn = await validator();
		console.log(isLoggedIn);
		if (!isLoggedIn) {
			navigate("/login");
		}
	}

	useEffect(() => {
		getLoggged();
	}, []);
	return <div>Home</div>;
}
