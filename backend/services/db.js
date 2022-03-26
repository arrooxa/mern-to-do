const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "to-do-db";

let _db;

const connectToDB = (callback) => {
	client.connect(function (err) {
		console.log("Conectado com sucesso ao servidor!");
		_db = client.db(dbName);
		callback(err);
	});
};

const findDocuments = async () => {
	const collection = _db.collection("to-do-collection");

	try {
		const results = await collection.find({}).toArray();
		return results;
	} catch (err) {
		throw Error(err);
	}
};

const insertDocuments = async (document) => {
	const collection = _db.collection("to-do-collection");

	try {
		const results = await collection.insertOne(document);
		return results;
	} catch (err) {
		throw Error(err);
	}
};

const updateDocument = async (document) => {
	const collection = _db.collection("to-do-collection");

	try {
		const results = await collection.updateOne(
			{ _id: document._id },
			{ $set: document }
		);
		return results;
	} catch (err) {
		throw Error(err);
	}
};

const removeDocument = async (document) => {
	const collection = _db.collection("to-do-collection");

	try {
		const results = await collection.deleteOne({ _id: document._id });
		return results;
	} catch (err) {
		throw Error(err);
	}
};

module.exports = {
	connectToDB,
	findDocuments,
	insertDocuments,
	updateDocument,
	removeDocument,
};
