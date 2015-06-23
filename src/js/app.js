var page = angular.module("webpage", ["ngRoute"]);

page.controller("mainController", ["$scope", function ($scope) {
	$scope.text = "Here is some text!";
}]);