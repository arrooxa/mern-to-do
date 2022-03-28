import React, { useEffect, useState } from "react";
import Item from "./components/Item";

function App() {
	const [itens, setItens] = useState([]);

	async function getData() {
		const response = await fetch("http://localhost:3000/todo/list", {
			headers: {
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();

		setItens(result);
	}

	useEffect(() => getData(), []);

	return (
		<div className="App">
			{itens.map((item) => (
				<Item key={item._id} item={item} />
			))}

			<button>Todos</button>
			<button>Pendentes</button>
			<button>Concluídos</button>

			<button>Inserir novo To-Do</button>
		</div>
	);
}

export default App;
