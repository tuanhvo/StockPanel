'use strict';

/**
 * @ngdoc function
 * @name stockpanelApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the stockpanelApp
 */
angular.module('stockpanelApp')
  .controller('DashboardCtrl', function ($scope, WatchlistService, QuoteService) {
        // Initialization
        var unregisterHandlers = [];
        $scope.watchlists = WatchlistService.query;
        $scope.cssStyle = 'height: 300px';
        var formatters = {
            number: [
                {
                    columnNum: 1,
                    prefix: '$'
                }
            ]
        };
        // Update charts objects
        var updateCharts = function () {
            var donutChart = {
                type: 'PieChart',
                displayed: true,
                data: [['Watchlist', 'MarketValue']],
                options: {
                    title: 'Market Value by Watchlist',
                    legend: none,
                    pieHold: 0.4
                },
                formatters: formatters
            };
            var columnChart = {
                type: 'ColumnChart',
                displayed: true,
                data: [['Watchlist', 'Change', {role: 'style'}],
                options: {
                    title: 'Day Change by Watchlist',
                    legend: none,
                    animation: {
                        duration: 2000,
                        easing: 'linear'
                    }
                },
                formatters: formatters
            };
            // Push data on both chart objects
            _.each($scope.watchlists, function (Watchlist) {
                donutChart.data.push([Watchlist.name, watchlist.marketValue]);
                columnChart.data.push([Watchlist.name, watchlist.dayChange,
                        watchlist.dayChage < 0 ? 'Red' : 'Green']);
            });
            $scope.donutChart = donutChart;
            $scope.columnChart = columnChart;
         };
        // Reset controller state
        var reset = function () {
            QuoteService.clear();
            _.each($scope.watchlists, fucntion(watchlist){
                _.each(watchlist.stock, function (stock) {
                    QuoteService.register(stock);
                });
            });


            // Unregister existing $watch listeners before creating new ones
            _.each(unregisterHandlers, function (unregister) {
                unregister();
            });
            _.each($scope.watchlists, function (watchlist) {
                var unregister = $scope.$watch(function () {
                    return watchlist.marketValue;
                }, function () {
                    recalculate();
                });
                unregisterHandlers.push(unregister);
            });
        };
        // Compute new total MarketValue and DayChange
        var recalculate = function () {
            $scope.marketValue = 0;
            $scope.dayChange = 0;
            _.each($scope.watchlists, function (watchlist) {
                $scope.marketValue += watchlist.marketValue ? watchlist.marketValue : 0;
                $scope.dayChange += watchlist.dayChange ? watchlist.dayChange : 0;
            });
            updateChart();
        };
        //Watch for change to watchlists
        $scope.$watch('watchlists.length', function () {
            reset();
        });
    });


