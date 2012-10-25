var request = require('request');
var cheerio = require('cheerio');
var ApodData = require('./ApodData');

var DATE_REGEX = /ap([0-9]+)/;
var APOD_ARCHIVE = "http://apod.nasa.gov/apod/archivepix.html";
var URL_PREFIX = "http://apod.nasa.gov/apod/";

Apod = function() {
    getArchiveData: getApodArchiveData;
};

function getApodArchiveData(callback) {
    request( { uri: APOD_ARCHIVE }, function(error, response, body) {
        if (error && response.statusCode !== 200) {
            console.log('Error contacting Apod Archive (%s)', apodArchiveUrl);
        }
        var $ = cheerio.load(body);
        $body = $('b');
        $links = $body.find('a');
        var apodList = new Array();
        $links.each(function() {
            var title = $(this).text();
            var url = URL_PREFIX + $(this).attr("href");
            var date = DATE_REGEX.exec(url)[1];
            var apod = new ApodData(title, url, date);
            apodList.push(apod);
        });
        callback(apodList);
    });
}

getApodArchiveData(function(apodList) {
    console.log(apodList);
});

module.exports = Apod;

