/// <reference path="angular.js" />
/// <reference path="jquery-2.2.2.js" />
/// <reference path="../Models/yql.js" />
/// <reference path="../Models/lottery.js" />

var model = {
    items: [],
    links: [{ content: "mySite", url: "http://mySite.com" }],
    url: "http://xskt.com.vn/rss-feed/mien-nam-xsmn.rss"
};

var lotteryApp = angular.module("lotteryApp", []);

var mainController = lotteryApp.controller("mainController", function ($scope) {
    $scope.model = model;

    $scope.fetchFeed = function () {
        $.getJSON(Yql.getYqlUrl($scope.model.url, "rss", "json"), function (data) {
            model.items = parseLotteryRss(data);
            $scope.$apply();
        });
    };
});

lotteryApp.run(function () {
    var sourceUrl = "http://xskt.com.vn/rss/";
    $.getJSON(Yql.getYqlUrl(sourceUrl, "html", "xml"), function (data) {
        var links = $(data.results[0]).find("#ulrss>li>a");
        links.each(function (index, item) {
            model.links.push({
                content: item.textContent,
                url: item.href
            });
        });
    });
});

/*$(function() {
    var url = "http://xskt.com.vn/rss-feed/mien-nam-xsmn.rss";

    var yqlUrl = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from rss where url='" + url + "'"),
        "&format=json&callback=?"
    ].join("");

    var getYqlUrl = function() {
        var url = $("#txtUrl").val();
        return [
            "http://query.yahooapis.com/v1/public/yql",
            "?q=" + encodeURIComponent("select * from rss where url='" + url + "'"),
            "&format=json&callback=?"
        ].join("");
    };

    $("#cmdGetFeed").click(function() {
        $.getJSON(getYqlUrl(), function(data) {
            /*var content = data.results[0];
            $("#txtRss").text(content);#1#
            model.items = data.query.results.item;
        });
    });
});*/