import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "../Methods/validator";
import NavigationBar from "../Components/NavigationBar";
import axios from "axios";
import { AiOutlineDelete } from 'react-icons/ai'
import { TiEdit } from 'react-icons/ti'


import {
	preDivCss,
	formCss,
	inputCss,
	inputBtnCss,
	linkCss,
} from "../config/authCss";

export default function Home() {
	document.title = "Home";
	const [user, setUser] = useState(null);
	const [meets, setMeets] = useState(null);
	const [createBox, setCreateBox] = useState(false);
	const navigate = useNavigate();

	async function getLoggged() {
		const isLoggedIn = await validator();
		console.log(isLoggedIn);
		if (!isLoggedIn) {
			navigate("/login");
		}
	}

	async function onCreateSubmitHandle(e) {
		e.preventDefault();

		const { title, description, start, duration } = e.target;
		console.log(
			title.value,
			description.value,
			start.value,
			duration.value,
		);
		const { data } = await axios.post(
			"/m/add",
			{
				title: title.value,
				description: description.value,
				start: new Date(start.value).toISOString(),
				duration: duration.value,
			},
			{
				headers: {
					authorization: `bearer ${localStorage.getItem("token")}`,
				},
			},
		);

		if (data.ok) {
			console.log(e);
			e.target.reset()
			data.data._id = data.data.id
			console.log(data);
			meets ? setMeets([data.data, ...meets]) : setMeets([data.data]);
			setCreateBox(false);
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
							"token",
						)}`,
					},
				})
				.then((data) => {
					console.log(data.data.data);
					setMeets(data.data.data);
				});
		}
	}, []);

	function onCreateBtnClicked(e) {
		setCreateBox(!createBox);
	}

	return (
		<div>
			{user ? (
				<div className=' '>
					{/* NavigationBar Div */}
					<NavigationBar user={user} />
					{/* Body Div */}
					<div className='mt-9'>
						{/* Upper div */}
						<div className='pl-1 pt-1 pb-16 bg-gray-50'>
							{/* Greetings Div */}
							<div className='text-2xl flex justify-center md:block md:text-4xl'>
								<div>Hello,</div>
								<div className='md:ml-20'>{user.name}</div>
							</div>
							<div className='flex items-center flex-col md:flex-row gap-5 mt-1'>
								<div className='text-xl md:text-2xl'>
									Wanna do a meet? Let's go
								</div>
								<div className='transition ease-in-out delay-75 duration-150 text-base py-1 px-3 rounded-full shadow-lg md:hover:translate-y-1 md:hover:scale-105 shadow-teal-500 bg-teal-300'>
									<button onClick={onCreateBtnClicked}>
										{createBox
											? "Close Box"
											: "Create a meeting"}
									</button>
								</div>
							</div>
						</div>

						{/* Creating a meet */}
						<div
							className={`${preDivCss} ${createBox ? "block" : "hidden"} h-auto`}
						>
							<form
								onSubmit={onCreateSubmitHandle}
								className={formCss}
							>
								<div>
									<input
										type='text'
										name='title'
										placeholder='Title'
										className={`${inputCss} w-full`}
										required
									/>
								</div>
								<div>
									<textarea
										type='text'
										name='description'
										placeholder='Description'
										className={inputCss}
										required
									/>
								</div>
								<div>
									<input
										type='datetime-local'
										name='start'
										placeholder='Choose data and time'
										className={inputCss}
										required
									/>
								</div>
								<div>
									<input
										type='number'
										name='duration'
										placeholder='Enter duration in minutes'
										className={inputCss}
										required
										max={300}
										min={10}
									/>
								</div>
								<div>
									<input
										type='submit'
										value='Create'
										className={inputBtnCss}
									/>
								</div>
							</form>
						</div>
						{/* For showing all meets */}
						{meets ? (
							<div className=' flex gap-5 flex-col px-5 pb-4'>
								{meets.map((meet) => {
									return (
										<Meetings key={meet._id} meet={meet} setMeets={setMeets} />
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

export function Meetings({ meet, setMeets }) {
	const [editingMode, setEditingMode] = useState(false);
	const [title, setTitle] = useState(meet.title);
	const [description, setDescription] = useState(meet.description);
	const [start, setStart] = useState(meet.start);
	const [duration, setDuration] = useState(meet.duration);

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

	async function onDeleteClick(e) {
		console.log(e);
		let { data } = await axios.delete(`/m/delete/${e}`, {
			headers: {
				'authorization': `bearer ${localStorage.getItem("token")}`
			}
		})

		if (data.ok) {
			let getAll = await axios.get("/m/getall", {
				headers: {
					"authorization": `bearer ${localStorage.getItem('token')}`
				}
			})
			console.log(getAll.data.data);
			setMeets(getAll.data.data)
		}
	}
	return (
		<div className='bg-gray-50 py-2 px-3 rounded-lg shadow-sm shadow-slate-500 flex justify-between'>
			{
				editingMode ? (
					<div className="flex flex-col gap-1">
						<div>
							<input
								type="text"
								className='text-base w-32 md:w-64 mr-5 border border-gray-600 p-1 rounded-md'
								value={title}
								onChange={(e) => setTitle(e.target.value)} />
							<button
								onClick={async () => {
									const { data } = await axios.put(`/m/update/${meet._id}/title`, {
										title: title
									}, {
										headers: {
											"authorization": `bearer ${localStorage.getItem("token")}`
										}
									}

									)
									console.log(data);

									let getAll = await axios.get("/m/getall", {
										headers: {
											"authorization": `bearer ${localStorage.getItem("token")}`
										}
									})

									setMeets(getAll.data.data)
								}}
								className="bg-green-600 text-white rounded-md px-2 py-1">
								Save
							</button>
						</div>
						<div className="flex items-center">
							<textarea
								className='pl-1 w-32  text-base md:w-64 mr-5 border border-gray-600 p-1 rounded-md'
								value={description}
								onChange={(e) => setDescription(e.target.value)}

							/>

							<button
								onClick={async () => {
									const { data } = await axios.put(`/m/update/${meet._id}/description`, {
										description
									}, {
										headers: {
											"authorization": `bearer ${localStorage.getItem("token")}`
										}
									}

									)
									console.log(data);

									let getAll = await axios.get("/m/getall", {
										headers: {
											"authorization": `bearer ${localStorage.getItem("token")}`
										}
									})

									setMeets(getAll.data.data)
								}}
								className="bg-green-600 text-white rounded-md px-2 py-1">
								Save
							</button>
						</div>
						<div>
							<input type="datetime-local" className="md:w-64 w-32 mr-5 border border-gray-600 p-1 rounded-md" onChange={(e) => {
								console.log(e.target.value);
								setStart(new Date(e.target.value).toISOString())
							}} />
							<button
								onClick={async () => {
									const { data } = await axios.put(`/m/update/${meet._id}/start`, {
										start
									}, {
										headers: {
											"authorization": `bearer ${localStorage.getItem("token")}`
										}
									}

									)
									console.log(data);

									let getAll = await axios.get("/m/getall", {
										headers: {
											"authorization": `bearer ${localStorage.getItem("token")}`
										}
									})

									setMeets(getAll.data.data)
								}}
								className="bg-green-600 text-white rounded-md px-2 py-1">
								Save
							</button>
						</div>
						<div >
							<input className="md:w-64 mr-5 w-32 border border-gray-600 p-1 rounded-md" type="number" maxLength={300} minLength={10} min={10} max={300} value={duration} onChange={(e) => setDuration(e.target.value)} />
							<button
								onClick={async () => {
									const { data } = await axios.put(`/m/update/${meet._id}/duration`, {
										duration
									}, {
										headers: {
											"authorization": `bearer ${localStorage.getItem("token")}`
										}
									}

									)
									console.log(data);

									let getAll = await axios.get("/m/getall", {
										headers: {
											"authorization": `bearer ${localStorage.getItem("token")}`
										}
									})

									setMeets(getAll.data.data)
								}}
								className="bg-green-600 text-white rounded-md px-2 py-1">
								Save
							</button>
							<div className="mt-2 ml-24">
								<button className="px-2 py-1 bg-emerald-700 text-white" onClick={(e) => setEditingMode(false)}>Done</button>
							</div>
						</div>
					</div>

				) : (
					<div>

						<div className='font-bold text-xl'>
							{meet.title}
						</div>
						<div className='pl-1 text-gray-500 text-base'>
							{meet.description}
						</div>

						<div className='pl-1 flex gap-1'>
							<div>Scheduled on:</div>
							<div className='flex gap-1'>
								<div>
									{time.getDate()} {months[time.getMonth()]}
								</div>
								<div>{time.getFullYear()}</div>
								<div>
									{hours}:
									{time.getMinutes() === 0 ? "00" : time.getMinutes()}
								</div>
							</div>
						</div>
						<div className='pl-1'>
							Duration: {Math.floor(meet.duration / 60)}:{meet.duration % 60}{" "}
							hr
						</div>
					</div>
				)
			}

			<div className="flex gap-3">
				<TiEdit onClick={() => {
					setTitle(meet.title)
					setDuration(meet.duration)
					setDescription(meet.description)
					setStart(meet.start)
					setEditingMode(!editingMode)
				}
				}

					className="cursor-pointer" size={"1.5rem"} />
				<AiOutlineDelete className="cursor-pointer" onClick={() => {
					onDeleteClick(meet._id)
				}} size={"1.5rem"} />

			</div>



		</div>

	)
}
