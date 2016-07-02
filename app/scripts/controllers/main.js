'use strict';

/**
 * @ngdoc function
 * @name stockpanelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockpanelApp
 */
angular.module('stockpanelApp')
  .controller('MainCtrl', function ($scope, $location, WatchlistService) {
        //[1] Populate watchlists for dynamic nav links
        $scope.watchlists = WatchlistService.query();
        //[2] Using the $location path() function as a $watch expression
        $scope.$watch(function(){
               return $location.path();
        }, function (path) {
            if (_.contains(path, 'watchlist')) {
                $scope.activeView = 'watchlist';
            } else {
                $scope.activeView = 'dashboard';
            }
        };
    });

