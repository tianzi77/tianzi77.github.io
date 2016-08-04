/*
    create by angular
    ie9+
    weiwzhang@Ctrip.com
*/

(function () {
    'use strict';

    var lofi = angular.module('lofi', ['appController', 'ngRoute', 'ui.bootstrap'])
        .config(function ($routeProvider, $locationProvider) {
            var getAxureData = function ($q, $rootScope) {
                var deferred = $q.defer();
                if (!$rootScope.axureData) {
                    $.ajax({
                        url: 'http://prototype.local.sh.ctriptravel.com/git/Corp/test/json_list.php',
                        dataType: "json",
                        jsonp: "jsonpcallback",
                        success: function (data) {
                            $rootScope.axureData = data;
                            console.log(data.length);
                            deferred.resolve(data);
                        }
                    });
                } else {
                    deferred.resolve($rootScope.axureData);
                }

                return deferred.promise;
            };
            var getPromise = function (contrller, templates) {
                return {
                    templateUrl: templates,
                    controller: contrller,
                    resolve: {
                        axure: getAxureData
                    }
                };
            };
            $locationProvider.html5Mode(false).hashPrefix('!');
            $routeProvider
                .when('/', getPromise('search', 'templates/search.html'))
                .otherwise('/');
        });

    angular.module('appController', [])
        .controller('search', function ($scope, $rootScope, axure) {
            $rootScope.nav = 1;
            $('#qSearch').get(0).select();
            var reset = function () {
                $scope.n100 = axure.slice(0, 300);
                $scope.title = '只显示最新300条更新记录：';
            };
            reset();

            $scope.result = function () {
                if ($scope.qSearch.length) {
                    $scope.searchResult = _.filter(axure, function (chr) {
                        return chr.title.toLowerCase().match(new RegExp($scope.qSearch.toLowerCase()));
                    });
                    $scope.n100 = $scope.searchResult;
                    $scope.title = '搜索结果' + $scope.searchResult.length + '条';
                } else {
                    reset();
                }
            };
            $scope.qt = function (qSearch) {
                $scope.qSearch = qSearch;
                $scope.result();
            };
        });  
}());