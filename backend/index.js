const express = require("express");

const cors = require("cors");

const app = express();

const port = 3000;

const todoRoute = require("./routes/todo");

app.use(express.json());

app.use(cors());

app.use("/todo", todoRoute);

app.listen(port, () =>
	console.log(`Servidor aberto, localizado em: localhost:${port} !`)
);
