var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function ($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })

    // route for the conf list page
    .when('/review', {
        templateUrl: 'pages/list.html',
        controller: 'aboutController'
    })
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function ($scope) {
    // create a message to display in our view
    $scope.message = 'haha';
});

scotchApp.controller('aboutController', function ($scope) {
    $scope.message = '';
});
