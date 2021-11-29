const assert = require('assert');

describe('BeerDAO', function () {
    const dao = require('./beerdao');
    describe('getAll', function () {
        it('Should be an array', function () {
            let ret = dao.getAll();
            assert(Array.isArray(ret), "Not an array")
        });
    });
    describe('create', function () {
        it('Should validate', function () {
            let a = dao.create({});
            assert(!a, "Failed to validate empty");
        })
        it('Should add', function () {
            let beforeLen = dao.getAll().length;
            let a = dao.create({ beerName: 'Elvis Juice', breweryName: 'BrewDog', breweryCountry: "Scotland", beerType: '6.5% India Pale Ale', beerRating: '3.76' });
            assert(a, "Failed to create");
            let afterLen = dao.getAll().length;
            assert(beforeLen + 1 == afterLen, 'Not actually added');
        });
    });
});
