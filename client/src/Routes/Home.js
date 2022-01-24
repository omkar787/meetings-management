import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "../Methods/validator";
import NavigationBar from "../Components/NavigationBar";
import axios from "axios";
import moment from "moment";

export default function Home() {
	document.title = "Home";
	const [user, setUser] = useState(null);
	const [meets, setMeets] = useState(null);
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
		if (localStorage.getItem("token")) {
			const data = jwtDecode(localStorage.getItem("token"));
			console.log(data);
			setUser(data);
			axios
				.get("/m/getall", {
					headers: {
						authorization: `bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				})
				.then((data) => {
					console.log(data.data.data);
					setMeets(data.data.data);
				});
		}
	}, []);
	return (
		<div>
			{user ? (
				<div className=" ">
					{/* NavigationBar Div */}
					<NavigationBar user={user} />
					{/* Body Div */}
					<div className="mt-9">
						{/* Upper div */}
						<div className="pl-1 pb-20 bg-gray-50">
							{/* Greetings Div */}
							<div className="text-4xl">
								<div>Hello,</div>
								<div className="ml-20">{user.name}</div>
							</div>
							<div className="flex items-center gap-5 mt-10">
								<div className="text-2xl">
									Wanna do a meet? Let's gooo
								</div>
								<div className="transition ease-in-out delay-75 duration-150 text-base py-1 px-3 rounded-full shadow-lg hover:translate-y-1 hover:scale-105 shadow-teal-500 bg-teal-300">
									<button>Create a meeting</button>
								</div>
							</div>
						</div>

						{/* For showing all meets */}
						{meets ? (
							<div className=" flex gap-5 flex-col px-5 pb-4">
								{meets.map((meet) => {
									return (
										<Meetings key={meet._id} meet={meet} />
									);
								})}
							</div>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
}

export function Meetings({ meet }) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const time = new Date(meet.start);
	const hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
	return (
		<div className="bg-gray-50 py-2 px-3 rounded-lg shadow-sm shadow-slate-500">
			<div className="font-bold text-xl">{meet.title}</div>
			<div className="pl-1 text-gray-500 text-base">
				{meet.description}
			</div>
			<div className="pl-1 flex gap-1">
				<div>Scheduled on:</div>
				<div className="flex gap-1">
					<div>
						{time.getDate()} {months[time.getMonth()]}
					</div>
					<div>{time.getFullYear()}</div>
					<div>
						{hours}:{time.getMinutes()}
					</div>
				</div>
			</div>
			<div className="pl-1">
				Duration: {Math.round(meet.duration / 60)}:{meet.duration % 60}{" "}
				hr
			</div>
		</div>
	);
}
