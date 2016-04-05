﻿/// <reference path="angular.js" />
/// <reference path="../Models/yql.js" />
/// <reference path="jquery-2.2.2.js" />

var model = {
    items: []
};

var lotteryApp = angular.module("lotteryApp", []);
var mainController = lotteryApp.controller("mainController", function($scope) {
    $scope.model = model;

    $scope.fetchFeed = function() {
        $.getJSON(Yql.getYqlUrl($scope.url), function(data) {
            model.items = data.query.results.item;
            $scope.$apply();
        });
    };
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