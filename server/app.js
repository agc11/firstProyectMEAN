"use strict";
let express = require('express');
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );

app.get("/sports", (request, response) => {
  let sports = mongoUtil.sports();
  sports.find().toArray( (err, docs) => {
    const sportsNames = docs.map(sport => sport.name);
    response.json(sportsNames);
  });
});

app.get("/sports/:name", (request, response) => {
  const sportName = request.params.name;
  console.log("Name sport: ", sportName);
  const sport = {
    "name": "Cycling",
    "goldMedals": [{
      "division": "Men's Sprint",
      "country": "UK",
      "year": 2012
    }, {
      "division": "Women's Sprint",
      "country": "Australia",
      "year": 2012
    }]
  };
  response.json(sport);
});

app.listen(8888, () => console.log( "Listening on 8888" ));
