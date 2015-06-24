$(document).ready(function () {
	$(".button-collapse").sideNav();
});

var page = angular.module("webpage", ["ngRoute"]);

page.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "pages/home.html",
			controller: "mainController"
	})
		.when("/announcements", {
			templateUrl: "pages/home.html",
			controller: "mainController"
	})
		.when("/assignments", {
			templateUrl: "pages/assignments.html",
			controller: "assignmentController"
	})
		.when("/forum", {
			templateUrl: "pages/forum.html",
			controller: "forumController"
	});
	
});

page.controller("mainController", ["$scope", function ($scope) {
	$scope.text1 = "Announcement! Announcement!";
}]);

page.controller("assignmentController", ["$scope", function ($scope) {
	$scope.text2 = "Do some stuff! Do some other stuff!";
}]);

page.controller("forumController", ["$scope", function ($scope) {
	$scope.text3 = "Talk amongst yourselves!";
}]);