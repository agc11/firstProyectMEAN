"use strict";
let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );

app.get("/sports", (request, response) => {
  let sports = mongoUtil.sports();
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
  let sports = mongoUtil.sports();
  sports.find({name: sportName}).limit(1).next((err, doc) => {
    if (err) {
      reponse.sendStatus(400);
    }
    console.log("Name sport: ", doc);
    response.json(doc);
  });
});

app.listen(8888, () => console.log( "Listening on 8888" ));
