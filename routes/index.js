"use strict";
require("dotenv").config();
var express = require('express');
var router = new express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = process.env.MLAB;

var db;

MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('parcial_1') 
})

router.post('/api/view/create', (req, res) => {
  db.collection('views').save(req.body, (err, result) => {

    if (err) res.send({
      succes: false,
      message: "Error: saving the view in the db"
    }) 
    res.send({
      succes: true,
      result: result
    });
  })
});

router.get('/api/views', (req, res)=>{
  db.collection('views').find().limit(20).toArray(function(err, results){
    if(!err){
    res.send({
      succes: true,
      result: results
    });
    }
    else{
      res.send({
        succes: false,
        message: "Error getting from db"
      });
    }
  })
});

module.exports = router;
