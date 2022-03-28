const express = require("express");

const app = express();

const port = 3000;

const todoRoute = require("./routes/todo");

app.use(express.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

app.use("/todo", todoRoute);

app.listen(port, () =>
	console.log(`Servidor aberto, localizado em: localhost:${port} !`)
);
