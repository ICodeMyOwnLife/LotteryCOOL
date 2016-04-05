/// <reference path="angular.js" />
/// <reference path="jquery-2.2.2.js" />
/// <reference path="../Libraries/uri.js" />
/// <reference path="../Models/yql.js" />
/// <reference path="../Models/lottery.js" />

var model = {
    items: [],
    links: [],
    selectedLink: {},
    url: "http://xskt.com.vn/rss-feed/mien-nam-xsmn.rss"
};

var lotteryApp = angular.module("lotteryApp", []);

var mainController = lotteryApp.controller("mainController", function ($scope, $http) {
    $scope.model = model;

    var selectRssLink = function(url) {
        $http.jsonp(Yql.getYqlUrl(url, "rss", "json")).then(function (response) {
            model.items = parseLotteryRss(response.data);
        });
    };

    $scope.fetchFeed = function () {
        /*$.getJSON(Yql.getYqlUrl($scope.model.url, "rss", "json"), function (data) {
            model.items = parseLotteryRss(data);
            $scope.$apply();
        });*/

        $http.jsonp(Yql.getYqlUrl($scope.model.url, "rss", "json")).then(function(response) {
            model.items = parseLotteryRss(response.data);
        });

        selectRssLink($scope.model.url);
    };

    $scope.selectLink = function() {
        selectRssLink($scope.model.selectedLink.url);
    };
});


lotteryApp.run(function ($http) {
    var sourceUrl = "http://xskt.com.vn/rss/";
    var parser = document.createElement("a");
    parser.href = sourceUrl;
    var host = parser.hostname;

    var getRssLinks= function(data) {
        var rssLinks = [];
        var links = $(data.results[0]).find("#ulrss>li>a");

        links.each(function (index, item) {
            item.hostname = host;
            item.port = 80;

            rssLinks.push({
                content: item.textContent,
                url: item.href
            });
        });

        return rssLinks;
    }

    /*$.getJSON(Yql.getYqlUrl(sourceUrl, "html", "xml"), function (data) {
        /*var links = $(data.results[0]).find("#ulrss>li>a");
        links.each(function (index, item) {
            model.links.push({
                content: item.textContent,
                url: item.href
            });
        });#1#
        model.links = getRssLinks(data);
    });*/

    $http.jsonp(Yql.getYqlUrl(sourceUrl, "html", "xml")).then(function (response) {
        var links = getRssLinks(response.data);
        if (links.length === 0) return;

        model.links = links;
        model.selectedLink = links[0];
    });
});