var page = angular.module("webpage", ["ngRoute"]);

page.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "pages/home.html",
			controller: "announcementController"
	})
		.when("/announcements", {
			templateUrl: "pages/home.html",
			controller: "announcementController"
	})
		.when("/assignments", {
			templateUrl: "pages/assignments.html",
			controller: "assignmentController"
	})
		.when("/forum", {
			templateUrl: "pages/forum.html",
			controller: "forumController"
		});
	
	
//	When HTML5 Mode is enabled, configure URL rewriting server-side
//	$routeProvider.html5Mode(true);
	
});

page.run(["$location", function ($location) {
	if ($location.url() === "/") {
		$(".announce").toggleClass("active");
	} else if ($location.url() === "/announcements") {
		$(".announce").toggleClass("active");
	} else if ($location.url() === "/assignments") {
		$(".assign").toggleClass("active");
	} else if ($location.url() === "/forum") {
		$(".forum").toggleClass("active");
	}
}]);

page.controller("mainController", ["$scope", "$location", function ($scope, $location) {
	$scope.text = "Here are some static words.";
}]);

page.controller("announcementController", ["$scope", function ($scope) {
	$scope.text1 = "Announcement! Announcement!";
}]);

page.controller("assignmentController", ["$scope", function ($scope) {
	$scope.text2 = "Do some stuff! Do some other stuff!";
}]);

page.controller("forumController", ["$scope", function ($scope) {
	$scope.text3 = "Talk amongst yourselves!";
}]);

$(document).ready(function () {
	$(".button-collapse").sideNav();
	
	$("nav li").click(function () {
		var pickedClass = "." + $(this).attr("class").split(" ")[2];
		$(".active").toggleClass("active");
		$(pickedClass).toggleClass("active");
	});
});