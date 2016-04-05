/// <reference path="moment.js" />
function toProperCase(text) {
    return text.replace(/w\S*/g, function(s) {
        return s.charAt(0).toLocaleUpperCase() + s.substring(1).toLocaleLowerCase();
    });
}

function getLocation(title) {
    var loc = /KẾT QUẢ XỔ SỐ (\S+) NGÀY/.exec(title)[1];
    return toProperCase(loc);
}

// link ~ "http://xskt.com.vn/ket-qua-xo-so-theo-ngay/mien-nam-xsmn/4-4-2016.html"
var parseDate = function (link) {
    var regexDate = /(\d{1,2}-\d{1,2}-\d{4})\.html/;
    var dateString = regexDate.exec(link)[1];
    return moment(dateString, "d-M-yyyy");
};

var parseResults = function(results) {
    var regexResults = /\d+/g;
    var result = [];

    var match;
    while ((match = regexResults.exec(results))) {
        result.push(match[0]);
    }

    return result;
};

var parsePrizeResults = function(prizeResults) {
    var regexPrizeResults = /(\S+): (\d+(?: - \d+)*)/g;
    var result = {};

    var match;
    while ((match = regexPrizeResults.exec(prizeResults))) {
        result[match[1]] = parseResults(match[2]);
    }

    return result;
};

// lotteryRssItem ~ "[Cà Mau] ĐB: 867367 1: 25257 2: 72703 3: 96296 - 64374 4: 41716 - 27228 - 55295 - 49221 - 88262 - 84579 - 96313 5: 6667 6: 8887 - 5926 - 8824 7: 2958: 67 [Đồng Tháp] ĐB: 191336 1: 78292 2: 00293 3: 57858 - 44925 4: 60471 - 10239 - 62221 - 77961 - 61442 - 16537 - 54927 5: 6895 6: 6433 - 5510 - 5551 7: 7408: 77 [TP.HCM] ĐB: 897149 1: 18385 2: 95415 3: 60306 - 09584 4: 42792 - 94238 - 47294 - 21925 - 50101 - 95629 - 08026 5: 9299 6: 9427 - 4825 - 6222 7: 3288: 67"
var parseLocPrizes = function (lotteryRssItem) {
    var content = lotteryRssItem.description;
    if (!/\[\S+\]/.test(content)) content = "[" + getLocation(lotteryRssItem.title) + "] " + content;
    var regexLocPrizes = /\[(\S+)\] ([^\[]+)/g;
    var result = {};

    var match;
    while ((match = regexLocPrizes.exec(content))) {
        result[match[1]] = parsePrizeResults(match[2]);
    }

    return result;
};


/*function parseRssItem(lotteryRssItem) {
    var content = lotteryRssItem.description;
    if (!/\[\S+\]/.test(content)) content = "[" + getLocation(lotteryRssItem.title) + "] " + content;

    return {
        date: parseDate(lotteryRssItem.link),
        results: parseLocPrizes(content)
    };
}*/

function parseLotteryRss(lotteryRss) {
    var result = {};

    lotteryRss.query.results.item.forEach(function(item) {
        result[parseDate(item.link)] = parseLocPrizes(item.description);
    });

    return result;
}