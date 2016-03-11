"use strict";
let express = require('express');
let app = express();

app.use( express.static(__dirname + "/../client") );

app.get("/sports", (request, response) => {
  response.json(['Weghtlifting', 'cycling']);
});
app.listen(8888, () => console.log( "Listening on 8888" ));
