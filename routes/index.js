"use strict";
require("dotenv").config();
var express = require('express');
var router = new express.Router();
const MongoClient = require("mongodb").MongoClient;
//const url = process.env.MLAB;


router.get('/api', function(req, res) {
	console.log("llega");
	let id=parseInt(req.query.id);
	const p = {id: id };
	console.log(p);
	getPrueba(p, (prueba)=> res.send(prueba));
});
function findPrueba (query, db, callback) {
  const collection = db.collection("demo");
  collection.findOne(query, (err, docs) => {
    if(err){console.log("no se encontro")} //se revisan que no se den errores.
    console.log("Found " + JSON.stringify(docs) + " urls");
    if (docs === null || docs === undefined) docs = { error: "no se encontro el item de prueba" }; //sino se encuentra el usuario, se responde con un error
    callback(docs); //se responde con el usuario
  });
}
function getPrueba (query, callback){
	MongoClient.connect(url, (err, client) => { // conexion a la base de datos
	if(err){console.log("Problemas con la conexion")}
	const db = client.db("parcial_1"); //se pide la collecion
	findPrueba(query, db, callback); //se busca el item en la base de datos	
	client.close(); //se cierra collecion
	});
}

module.exports = router;
