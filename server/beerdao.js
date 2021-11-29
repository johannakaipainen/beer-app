let beers = [
    {
        id: 1,
        beerName: "Hailuotolainen Spezial", 
        breweryName: "Hailuodon Panimo", 
        breweryCountry: "Finland",
        beerType: "5.3% Premium Lager", 
        beerRating: 3.46
        //beerDescription: “Spezial is an old beer type based in Baden Wurttemberg in the area around Stuttgart. It is a Lager brewed for special occasions and therefore has a little bit more of everything.” 
        //beerImage: ""
    },
    {
        id: 2,
        beerName: "Maku IPA", 
        breweryName: "Maku Brewing", 
        breweryCountry: "Finland",
        beerType: "7.3% India Pale Ale", 
        beerRating: 3.72
       // beerDescription: “Nut-brown, full-bodied, cloudy, strongly hopped, caramel malt notes, citrus notes, plum notes, herbal notes, balanced.”
       // beerImage: ""
    }
]; 

function verify(beer){
    if (!beer.beerName) return false;
    return true;
}
//eksportoi objektin
module.exports={
    getAll(){
        return beers;
    },

    get(id){
        return beers.find(b => b.id==id);
    }, 

    create(beer){
        if (!verify(beer)) return null;
        beer.id=beers.reduce((a,b) => a.id>b.id ? a : b, {id:0}).id;
        beers.push(beer);
        return beer;
    }, 

    update(id, beer){
        let existing = beers.find(b => b.id==beer.id);
        if (existing) Object.assign(existing, beer);
        return existing;
        //palauttaa muokatun oluen
    }, 

    deleteBeer(id){
        let index = beers.findIndex(b => b.id==id);
        if (index > 0) beers.splice(index,1);
    }
}