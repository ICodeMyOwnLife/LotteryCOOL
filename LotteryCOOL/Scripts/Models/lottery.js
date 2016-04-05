/// <reference path="moment.js" />
function toProperCase(text) {
    return text.replace(/w\S*/g, function(s) {
        return s.charAt(0).toLocaleUpperCase() + s.substring(1).toLocaleLowerCase();
    });
}

// title ~ "KẾT QUẢ XỔ SỐ BÌNH DƯƠNG NGÀY 01/04 (Thứ Sáu)
function getLocation(title) {
    var regexLocation = /KẾT QUẢ XỔ SỐ (\S+) NGÀY/;
    var loc = regexLocation.exec(title)[1];
    return toProperCase(loc);
}

// link ~ "http://xskt.com.vn/ket-qua-xo-so-theo-ngay/mien-nam-xsmn/4-4-2016.html"
var parseDate = function(link) {
    var regexDate = /(\d{1,2}-\d{1,2}-\d{4})\.html/;
    var dateString = regexDate.exec(link)[1];
    return moment(dateString, "DD-MM-yyyy");
};

// results ~ "867367" or "96296 - 64374" or "41716 - 27228 - 55295 - 49221 - 88262 - 84579 - 96313"
var parseResults = function(results) {
    var regexResults = /\d+/g;
    var result = [];

    var match;
    while ((match = regexResults.exec(results))) {
        var fullResult = match[0];

        result.push({
            full: fullResult,
            trailing: fullResult.substring(fullResult.length - 2)
        });
    }

    return result;
};


// prizeResults ~ "ĐB: 867367 1: 25257 2: 72703 3: 96296 - 64374 4: 41716 - 27228 - 55295 - 49221 - 88262 - 84579 - 96313 5: 6667 6: 8887 - 5926 - 8824 7: 2958: 67"
var parsePrizeResults = function(prizeResults) {
    var regexPrizeResults = /(\S+): (\d+(?: - \d+)*)/g;
    var result = [];

    var match;
    while ((match = regexPrizeResults.exec(prizeResults))) {
        //result[match[1]] = parseResults(match[2]);
        result.push({
            prize: match[1],
            results: parseResults(match[2])
        });
    }

    return result;
};

var parseLocPrizes = function(lotteryRssItem) {
    // content ~ "[Cà Mau] ĐB: 867367 1: 25257 2: 72703 3: 96296 - 64374 4: 41716 - 27228 - 55295 - 49221 - 88262 - 84579 - 96313 5: 6667 6: 8887 - 5926 - 8824 7: 2958: 67 [Đồng Tháp] ĐB: 191336 1: 78292 2: 00293 3: 57858 - 44925 4: 60471 - 10239 - 62221 - 77961 - 61442 - 16537 - 54927 5: 6895 6: 6433 - 5510 - 5551 7: 7408: 77 [TP.HCM] ĐB: 897149 1: 18385 2: 95415 3: 60306 - 09584 4: 42792 - 94238 - 47294 - 21925 - 50101 - 95629 - 08026 5: 9299 6: 9427 - 4825 - 6222 7: 3288: 67"
    var content = lotteryRssItem.description;
    var regexStartWithLoc = /\[[^\[\]]+\]/;

    if (!regexStartWithLoc.test(content)) {
        content = "[" + getLocation(lotteryRssItem.title) + "] " + content;
    }
    var regexLocPrizes = /\[([^\[\]]+)\] ([^\[]+)/g;
    var result = [];

    var match;
    while ((match = regexLocPrizes.exec(content))) {
        //result[match[1]] = parsePrizeResults(match[2]);
        result.push({
            location: match[1],
            prizeResults: parsePrizeResults(match[2])
        });
    }

    return result;
};

function parseLotteryRss(lotteryRss) {
    var result = [];

    lotteryRss.query.results.item.forEach(function(item) {
        result.push({
            date: parseDate(item.link),
            locationPrizes: parseLocPrizes(item)
        });
    });

    return result;
}