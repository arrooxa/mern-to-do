import React, { useEffect, useState } from "react";
import Item from "./components/Item";
import "./App.scss";

function App() {
	const [itens, setItens] = useState([]);

	const [filterItens, setFilterItens] = useState({
		filter: false,
		active: false,
	});

	async function getData() {
		const response = await fetch("http://localhost:3000/todo/list", {
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();

		setItens(result);
	}

	async function insertData() {
		const response = await fetch("http://localhost:3000/todo/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text: "", active: false, edit: false }),
		});

		const result = await response.json();

		getData();
	}

	async function updateData(item) {
		const response = await fetch("http://localhost:3000/todo/update", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(item),
		});

		const result = await response.json();

		getData();
	}

	async function deleteData(item) {
		const response = await fetch("http://localhost:3000/todo/delete", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(item),
		});

		const result = await response.json();

		getData();
	}

	const itensShow = filterItens.filter
		? itens.filter((item) => item.active === filterItens.active)
		: itens;

	useEffect(() => getData(), []);

	return (
		<div className="main">
			<div className="to-do-list">
				<h1>To-Do App</h1>

				{itensShow.map((item) => (
					<Item
						key={item._id}
						item={item}
						updateDocument={updateData}
						deleteDocument={deleteData}
					/>
				))}

				<div className="rowContainer">
					<span
						className={"filter"}
						style={filterItens.filter ? {} : { fontWeight: "bold" }}
						onClick={() => setFilterItens({ filter: false })}
					>
						Todos
					</span>
					<span
						className={"filter"}
						style={
							filterItens.filter && filterItens.active === true
								? { fontWeight: "bold" }
								: {}
						}
						onClick={() => setFilterItens({ filter: true, active: true })}
					>
						Pendentes
					</span>
					<span
						className={"filter"}
						style={
							filterItens.filter && filterItens.active === false
								? { fontWeight: "bold" }
								: {}
						}
						onClick={() => setFilterItens({ filter: true, active: false })}
					>
						Concluídos
					</span>
					<div className="rowContainer">
						<button onClick={insertData}>Inserir novo To-Do</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
