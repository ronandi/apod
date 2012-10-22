Apod = function(){
    this.dailyApodUrl = "http://apod.nasa.gov/apod/astropix.html";
    this.apodArchiveUrl = "http://apod.nasa.gov/apod/archivepix.html"
};

Apod.prototype.getApodArchiveData = function getApodArchiveData() {
    return [];
}

exports.Apod = Apod;

