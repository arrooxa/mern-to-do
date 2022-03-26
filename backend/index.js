const express = require("express");

const app = express();

const port = 3001;

const todoRoute = require("./routes/todo");

app.use(express.json());

app.use("/todo", todoRoute);

app.listen(port, () =>
	console.log(`Servidor aberto, localizado em: localhost:${port} !`)
);
