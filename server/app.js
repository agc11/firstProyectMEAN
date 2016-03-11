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
app.listen(8888, () => console.log( "Listening on 8888" ));
