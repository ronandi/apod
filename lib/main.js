var request = require('request');
var jsdom = require('jsdom');
var ApodData = require('./ApodData');

var DATE_REGEX = /ap([0-9]+)/;
var JQUERY_URL = './jquery-1.5.min.js';
var APOD_ARCHIVE = "http://apod.nasa.gov/apod/archivepix.html";

Apod = function() {
    getArchiveData: getApodArchiveData;
};

function getApodArchiveData(callback) {
    request( { uri: APOD_ARCHIVE }, function(error, response, body) {
        if (error && response.statusCode !== 200) {
            console.log('Error contacting Apod Archive (%s)', apodArchiveUrl);
        }

        jsdom.env({
            html: body,
            scripts: [ JQUERY_URL ]
        }, function(err, window) {
            var $ = window.jQuery,
            $body = $('b');
            $links = $body.find('a');
            var apodList = new Array();
            $links.each(function() {
                var title = $(this).text();
                var url = "http://apod.nasa.gov/apod/" + $(this).attr("href");
                var date = DATE_REGEX.exec(url)[1];
                var apod = new ApodData(title, url, date);
                apodList.push(apod);
            });
            callback(apodList);
        });
    });
}

getApodArchiveData(function(list) {
    console.log(list);
});

module.exports = Apod;

