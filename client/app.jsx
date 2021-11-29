import React from 'react';
import ReactDOM from 'react-dom';

function UserView(){
    return <section className="main user">
        <h2>User</h2>
        <nav>
            <a className="selected">Beers</a>
            <a>Breweries</a>
            <a>Places</a>
        </nav>
        <div className="list beerList">
            <div className="listItem beerItem">
                <div className="beerTools">
                    <a className="toolicon close"></a>
                </div>
                <div className="beerBrief">
                    <h3 className="beerName">Hailuotolainen Spezial</h3>
                    <p className="breweryName">Hailuodon Panimo</p>
                    <p className="beerType">5.3% Premium Lager</p>
                    <p className="beerRating">3.46</p>
                </div>    
            </div>
            <div className="listItem beerItem">
                <div className="beerTools">
                    <a className="toolicon close"></a>
                </div>
                <div className="beerBrief">
                    <h3 className="beerName">Maku IPA</h3>
                    <p className="breweryName">Maku Brewing</p>
                    <p className="beerType">7.3% India Pale Ale</p>
                    <p className="beerRating">3.72</p>
                </div>    
            </div>
        </div>
    </section>
}

window.onload=function(){
    ReactDOM.render(<UserView />,document.getElementById('appcontent'))
}