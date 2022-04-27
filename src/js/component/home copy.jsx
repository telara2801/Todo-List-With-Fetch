import { stringify } from "query-string";
import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import { arrayOf } from "prop-types";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	// let todos = [
	// 	//{ label: "This is one local activity", done: false },
	// 	// { label: "Clean the room", done: false },
	// 	// { label: "car Wash", done: false },
	// ];

	const [ListItems, setListItems] = useState([]);
	const [newTask, setnewTask] = useState("");
	let url = `http://assets.breatheco.de/apis/fake/todos/user/TULIO-LARA "`;
	let optionsDeleteAll = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify([]),
	};
	let optionsPostAll = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify([]),
	};
	const GetAllToDos = async () => {
		const response = await fetch(url);
		const data = await response.json();
		if (!response.ok) {
			CreateListitems();
			console.log(data);
			return;
		}
		setListItems(data);
		console.log(data);
	};
	const CreateListitems = async () => {
		const response = await fetch(url, optionsPostAll);
	};
	const DeleteAll = async () => {
		// const response = fetch(url, optionsDeleteAll);
		const response = await fetch(url, optionsDeleteAll);
		const data = await response.json();
		if (!response.ok) {
			setListItems(data);
			CreateListitems();
			return;
		}
		setListItems(data);

		// console.log(data)
		// fetch(url, optionsDeleteAll)
		// 	.then((respuesta) => {
		// 		if (respuesta.status >= 200 && respuesta.status < 300) {
		// 			console.log("el update se realizo satisfactoriamente");
		// 			return respuesta.json();
		// 		} else {
		// 			console.log(
		// 				`Hubo un error ${respuesta.status} en el request`
		// 			);
		// 		}
		// 	})
		// 	.then((data) => {
		// 		const newListItems = data.map(() =>
		// 			newListItems.push(data.label)
		// 		);
		// 		console.log(JSON.stringify(newListItems));
		// 	})
		// 	.catch((error) => console.error("Error:", error));

		// const newListItems = response;
		// setListItems(newListItems);
		return;
	};

	useEffect(() => {
		GetAllToDos();
	}, []);

	return (
		<div className="container-fluid text-center bground vh-100">
			{/* <h1 className="text-center mt-5 fw-lighter">Hello Rigo!</h1> */}
			<h1 className="text-center pt-3 fw-lighter  ">todos</h1>
			<div className="d-flex justify-content-center  caja    ">
				<div className="paper list text-muted">
					<div className="d-grid gap-2 d-md-flex justify-content-md-end">
						<div className="container d-flex justify-content-end">
							<button
								type="button"
								className="btn btn-danger"
								onClick={DeleteAll}>
								Delete all
							</button>
						</div>
					</div>
					<input
						id=""
						className="list"
						placeholder="What needs to be done?"
						value={newTask}
						onChange={(event) => {
							setnewTask(event.target.value);
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								let todo = { label: newTask, done: false };
								const newListItems = [...ListItems, todo];
								setListItems(newListItems);
								setnewTask("");
								let url = `http://assets.breatheco.de/apis/fake/todos/user/TULIO-LARA "`;
								let options = {
									method: "PUT",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify(newListItems),
								};
								fetch(url, options)
									.then((respuesta) => {
										if (
											respuesta.status >= 200 &&
											respuesta.status < 300
										) {
											console.log(
												"el update se realizo satisfactoriamente"
											);
											return respuesta.json();
										} else {
											console.log(
												`Hubo un error ${respuesta.status} en el request`
											);
										}
									})
									.then((data) => {
										const newListItems = data.map(() =>
											newListItems.push(data.label)
										);
										console.log(
											JSON.stringify(newListItems)
										);
									})
									.catch((error) =>
										console.error("Error:", error)
									);
							}
						}}></input>
					{ListItems.map((task, index) => {
						return (
							<div className="ListItems">
								<ul className="d-flex justify-content-between ">
									<div className="Items">
										<li
											key={index}
											onClick={() => {}}
											className="Item">
											{task.label}
										</li>
									</div>
								</ul>
							</div>
						);
					})}
					<div className="d-flex justify-content-start">
						<small className="text-span text-muted">
							{ListItems.length} item left
						</small>
					</div>
				</div>
			</div>
			{/* <p>
				<img src={rigoImage} />
			</p>
			<a href="#" className="btn btn-success">
				If you see this green button... bootstrap is working...
			</a>
			<p>
				Made by{" "}
				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
				love!
			</p> */}
		</div>
	);
};

export default Home;
