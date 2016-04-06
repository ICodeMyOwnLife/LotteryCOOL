/// <reference path="Libraries/angular.js" />
var testApp = angular.module("testApp", []);
var testCtrl = testApp.controller("testCtrl", function($scope) {
    $scope.items = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"];
})