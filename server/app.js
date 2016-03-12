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
    ifMongoThrowError(response, err);
    const sportsNames = docs.map(sport => sport.name);
    response.json(sportsNames);
  });
});

app.get("/sports/:name", (request, response) => {
  const sportName = request.params.name;
  const sports = mongoUtil.sports();
  sports.find({name: sportName}).limit(1).next((err, doc) => {
    ifMongoThrowError(response, err);
    console.log("Name sport: ", doc);
    response.json(doc);
  });
});

app.post('/sports/:name/medals', jsonParser, (request, response) => {
  const sportName = request.params.name;
  const newMedal = request.body.medal || {};

  if (!newMedal.division || !newMedal.country || !newMedal.year) {
    response.sendStatus(400);
  }

  const sports = mongoUtil.sports();
  const query = {name: sportName};
  const update = {$push: {goldMedals: newMedal}};
  sports.findOneAndUpdate(query, update, (err, resolve) => {
    ifMongoThrowError(response, err);
    response.sendStatus(201);
  });
});

app.listen(8888, () => console.log( "Listening on 8888" ));

const ifMongoThrowError = function(response, err) {
  if (err) {
    response.sendStatus(400);
  }
};
