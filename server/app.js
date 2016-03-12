"use strict";
const express = require('express');
const app = express();

const mongoUtil = require('./mongoUtil');
mongoUtil.connect();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use( express.static(__dirname + "/../client") );

app.get("/sports", (request, response) => {
  const sports = mongoUtil.sports();
  sports.find().toArray( (err, docs) => {
    if (err) {
      reponse.sendStatus(400);
    }
    const sportsNames = docs.map(sport => sport.name);
    response.json(sportsNames);
  });
});

app.get("/sports/:name", (request, response) => {
  const sportName = request.params.name;
  const sports = mongoUtil.sports();
  sports.find({name: sportName}).limit(1).next((err, doc) => {
    if (err) {
      reponse.sendStatus(400);
    }
    console.log("Name sport: ", doc);
    response.json(doc);
  });
});

app.post('/sports/:name/medals', jsonParser, (request, response) => {
  const sportName = request.params.name;
  const newMedal = request.body.medal;

  console.log('Sport name: ', sportName);
  console.log('Medal: ', newMedal);
console.log('Medal22222222: ', request.body);
  response.sendStatus(201);
});

app.listen(8888, () => console.log( "Listening on 8888" ));
