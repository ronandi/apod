var should = require ('should');
var Apod = require('../lib/main').Apod;

describe('Apod urls', function() {
    it('are valid', function() {
        var apod = new Apod();
        (typeof apod.dailyApodUrl).should.eql('string');
    });
});

describe('getApodArchiveData', function() {
    describe('with no arguments', function() {
        var apod = new Apod();
        var result = apod.getApodArchiveData();
        it('returns an array of ApodData objects', function() {
            (result instanceof Array).should.be.true;
            (result[0] instanceof ApodData).should.be.true;
        });

        it('ApodData objects should have a title', function() {
            should.exist(result.title);
        });

        it('ApodData objects should have a date', function() {
            should.exist(result.date);
        });

        it('ApodData objects should have a url', function() {
            should.exist(result.url);
        });
    });
})

