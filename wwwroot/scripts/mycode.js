// kutsuu ajaxia, jotta js-koodi (ei selain) juttelee palvelimen kanssa
function makeTheCall(url, method = 'get', data = null, cb = null) {
    var x = new XMLHttpRequest();
    x.onreadystatechange = function () {
        if (x.readyState == 4) if (cb) cb(JSON.parse(x.responseText));
    }
    x.open(method, url, true);
    x.setRequestHeader('Accept', 'application/json');
    x.setRequestHeader('Content-Type', 'application/json');
    x.send(data && JSON.stringify(data));
}

function showBeers(beers) {
    let beerDiv = document.getElementById("beers");
    beerDiv.innerHTML = "";
    beers.forEach(beer => {
        beerDiv.innerHTML += `<p>${beer.beerName}, ${beer.beerType}, ${beer.breweryName}, ${beer.beerRating} </p>`;
    });
}

window.onload = function () {
    makeTheCall("/api/beers", 'get', null, function (beers) {
        console.log(beers);
        showBeers(beers);
    })

    document.getElementById("add").addEventListener('click', function () {
        makeTheCall('/api/beers', 'post', { beerName: 'Sonnisaari Oatse', beerType: '6.6% Amber Lager / Vienna Lager', breweryName: 'Sonnisaari', beerRating: 3.39 }, function (beer) {
            console.log("Luotiin", beer);
            let beerDiv = document.getElementById("beers");
            beerDiv.innerHTML += `<p>${beer.beerName}, ${beer.beerType}, ${beer.breweryName}, ${beer.beerRating}</p>`;
        })
    })
} 