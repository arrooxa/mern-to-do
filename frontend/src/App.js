import React, { useEffect, useState } from "react";
import Item from "./components/Item";

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
		<div className="App">
			{itensShow.map((item) => (
				<Item
					key={item._id}
					item={item}
					updateDocument={updateData}
					deleteDocument={deleteData}
				/>
			))}

			<button onClick={() => setFilterItens({ filter: false })}>Todos</button>
			<button onClick={() => setFilterItens({ filter: true, active: true })}>
				Pendentes
			</button>
			<button onClick={() => setFilterItens({ filter: true, active: false })}>
				Concluídos
			</button>

			<button onClick={insertData}>Inserir novo To-Do</button>
		</div>
	);
}

export default App;
