import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
	const navigate = useNavigate();

	function onClickHandle(e) {
		localStorage.clear();
		navigate("/login");
	}
	return (
		<div className='bg-sky-300 text-sm fixed w-full overflow-hidden p-1 pr-5 top-0 '>
			<span className='text-xl font-mono font-black'>Calendly</span>
			<button
				onClick={onClickHandle}
				className='transition-colors text-base ease-in-out delay-150 duration-300 bg-green-200 hover:bg-green-300  rounded-full px-2 p-1 float-right'
			>
				Log out
			</button>
		</div>
	);
}
