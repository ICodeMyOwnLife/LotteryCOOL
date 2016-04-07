/// <reference path="angular.js" />
/// <reference path="jquery-2.2.2.js" />
/// <reference path="../Libraries/moment.js" />
/// <reference path="../Libraries/moment-with-locales.js" />
/// <reference path="../Libraries/uri.js" />
/// <reference path="../Models/yql.js" />
/// <reference path="../Models/lottery.js" />
/// <reference path="../Custom/custom-filters-angular.js" />

var model = {
    items: [],
    selectedItem: {},
    links: [],
    selectedLink: {},
    url: "http://xskt.com.vn/rss-feed/mien-nam-xsmn.rss"
};

var lotteryApp = angular.module("lotteryApp", ["filtersModule"]);

var selectRssLink = function (url, $http) {
    $http.jsonp(Yql.getYqlUrl(url, "rss", "json")).then(function (response) {
        var items = parseLotteryRss(response.data);
        model.items = items;
        if (items.length > 0) model.selectedItem = items[0];
    });
};

var mainController = lotteryApp.controller("mainController", function ($scope, $http) {
    $scope.model = model;

    $scope.fetchFeed = function () {
        //$http.jsonp(Yql.getYqlUrl($scope.model.url, "rss", "json")).then(function(response) {
        //    model.items = parseLotteryRss(response.data);
        //});

        selectRssLink($scope.model.url, $http);
    };


    var panelColors = ["danger", "success", "warning", "info"];
    $scope.getPanelStyle = function (index) {
        return "panel panel-" + panelColors[index % panelColors.length];
    }

    $scope.getTabActiveState = function (item) {
        return item === $scope.model.selectedItem ? "active" : "";
    }

    $scope.selectLink = function (link) {
        $scope.model.selectedLink = link;
        selectRssLink(link.url, $http);
    };

    $scope.selectItem = function (item) {
        $scope.model.selectedItem = item;
    };
});


lotteryApp.run(function ($http) {
    moment.locale("vi-VN");
    var sourceUrl = "http://xskt.com.vn/rss/";
    var parser = document.createElement("a");
    parser.href = sourceUrl;
    var host = parser.hostname;

    var getRssLinks = function (data) {
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

    $http.jsonp(Yql.getYqlUrl(sourceUrl, "html", "xml")).then(function (response) {
        var links = getRssLinks(response.data);
        if (links.length === 0) return;

        model.links = links;
        model.selectedLink = links[0];
        selectRssLink(model.selectedLink.url, $http);
    });
});