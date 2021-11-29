let serverPort=9000, 
    webDir="../wwwroot";

let express = require('express');

// web-palvelu
let app = express();
app.use(express.static(webDir)); 
 
// server.js:stä siirrettiin sisältö bookapi.js:ään ja korvattiin tällä:
let beerApi=require('./beerapi');
beerApi(app);

//kuunnellaan tuota porttia
app.listen(serverPort);
//ilmoittaa alla olevat tiedot komentoriville, kun käynnistetään localhost
console.log('Server listening on http://localhost:'+serverPort);
console.log('Distributing site from: '+webDir);