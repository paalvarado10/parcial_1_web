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

router.get('/api/reting/rate', (req, res)=>{
  const { query }=req;
  const { id } =query;
  db.collection('rates').find({ id: id}).limit(10).toArray(function(err, results){
    if(err){
      res.send({
        succes: false,
        message: "Error getting from db"
      });
    }
    else {
      res.send({
        succes: true,
        result: results
      });
    }
  })
});
router.post('/api/rating/create', (req, res) => {
  let body =req.body;
  db.collection('rates').find({"user": body.user ,"id": body.id}).toArray(function(err, results){
    if(err){
      console.log(err);
      res.send({
      succes: false,
      message: "Error: in the db"
    }) 
    }
    if(results.length>0){
      res.send({
      succes: false,
      message: "Error: the user al ready rate the view"
    }) 
    }
    else {
      db.collection('rates').save(req.body, (err, result) => {
    if (err){ 
      console.log(err);
      res.send({
      succes: false,
      message: "Error: saving the review in the db"
    }) 
      }
      else{

    res.send({
      succes: true,
      result: "exit saving the review"
    });
    }
    })
  }
})
});
router.post('/api/view/create', (req, res) => {
  db.collection('views').save(req.body, (err, result) => {

    if (err){ 
      console.log(err);
      res.send({
      succes: false,
      message: "Error: saving the view in the db"
    }) 
      }
      else{

    res.send({
      succes: true,
      result: "exit saving the view"
    });
    }
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
