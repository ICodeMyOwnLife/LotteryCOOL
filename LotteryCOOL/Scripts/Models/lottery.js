/// <reference path="moment.js" />
var regex = /(\S+): (\d+(?: - \d+)*)/g;


while (m = regex.exec(input)) {
    console.log(m[1], m[2]);
}


function toProperCase(text) {
    return text.replace(/w\S*/g, function(s) {
        return s.charAt(0).toLocaleUpperCase() + s.substring(1).toLocaleLowerCase();
    });
}

function getLocation(title) {
    var loc = /KẾT QUẢ XỔ SỐ (\S+) NGÀY/.exec(title)[2];
    return toProperCase(loc);
}

var parseDate = function(link) {
    var dateString = /\/([^\.]+)\.html/.exec(link)[2];
    return moment(dateString, "d-M-yyyy");
};

var parseResults = function(results) {
    var regexResults = /(\S+): (\d+(?: - \d+)*)/g;
    var result = {};

    var match;
    while ((match = regexResults.exec(results))) {
        result[match[1]] = p
    }

    return result;
};


var parseLocPrizes = function(locPrizes) {
    var regexLocResults = /\[(\S+)\] ([^\[]+)/g;
    var result = {};

    var match;
    while ((match = regexLocResults.exec(locPrizes))) {
        result[match[1]] = parseResults(match[2]);
    }

    return result;
};


function parseRssItem(lotteryRssItem) {
    var content = lotteryRssItem.description;
    if (!/\[\S+\]/.test(content)) content = "[" + getLocation(lotteryRssItem.title) + "] " + content;

    return {
        date: parseDate(lotteryRssItem.link),
        results: parseLocPrizes(content)
    };
}