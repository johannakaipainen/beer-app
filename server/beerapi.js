//oluiden käsittelyä varten luodaan oma restful-rajapinta, alla oleva
//siirrettiin server.js:stä

//exportoi funktion 
module.exports = function (app) {

    let bodyParser = require('body-parser')
    app.use(bodyParser.json());

    //alustettu tietokanta siirretty tästä beerdaoon

    // luo rajapinnan beers-datan käsittelyä varten
    app.get('/api/beers', function (req, resp) {
        resp.json(beers);
    });

    //haetaan yksittäinen tieto
    app.get('api/beers/:id', function (req, resp) {
        let id = Number(req.params.id);
        //taulukko antaa yhden tiedon kerrallaan, 
        let beer = beers.find(b => b.id == id);
        resp.json(beer);
    });

    //lisää olut tietokantaan
    app.post('/api/beers', function (req, resp) {
        let beer = req.body;
        //reduce vertailee pareittain ja palauttaa suuremman
        //jos a on suurempi kuin b, palauttaa a:n, muussa tapauksessa b:n
        let newId = beers.reduce((a, b) => a.id > b.id ? a : b).id + 1;
        beer.id = newId;
        beers.push(beer);
        //palauttaa clientille
        resp.json(beer);
    });

    app.delete('/api/beers/:id', function (req, resp) {
        let id = Number(req.params.id);

        //etsitään index sille oluelle, jolla on tuo id
        let index = beers.findIndex(b => b.id == id);
        beers.splice(index, 1);
        resp.json({ info: "Beer deleted" }); //json-muotoinen vastaus, suluissa js-objekti
    });

    app.put('/api/beers/:id', function (req, resp) {
        let id = Number(req.params.id);
        let beer = req.body;
        let existing = beers.find(b => b.id == id);
        //vie tiedot objektilta toiselle
        Object.assign(existing, beer);
        resp.json(existing);
    });
}