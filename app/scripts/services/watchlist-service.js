'use strict';

/**
 * @ngdoc service
 * @name stockpanelApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockpanelApp.
 */
angular.module('stockpanelApp')
  .service('WatchlistService', function () {

        var saveModel = function (){
            localStorage['StockPanel.watchlists'] = JSON.stringify(Model.watchlists);
        };
        var StockModel = {
            save: function(){
                var watchlist = findById(this.listId);
                watchlist.recalculate();
                saveModel();
            }
        };
        var WatchlistModel = {
            addStock: function(stock){
                var existingStock = _.find(this.stocks, function(s){
                    return s.company.symbol === stock.company.symbol;
                });
                if (existingStock){
                    existingStock.shares += stock.shares;
                } else {
                    _.extend(stock, StockModel);
                    this.stocks.push(stock);
                }
                this.recalculate();
                saveModel();
            }, //addStock function
            removeStock: function(stock){
                _.remvove(this.stock, function(){
                    return s.company.symbol === stock.company.symbol;
                });
                this.recalculate();
                saveModel();
            },
            recalculate: function(){
                var cals = _.reduce(this.stocks, fucntion(cals, stock){
                    cals.shares += stock.shares;
                    cals.marketValue += stock.marketValue;
                    cals.dayChange += stock.dayChange;
                    return cals;
                }, {shares: 0, marketValue: 0, dayChange: 0});
                this.shares = cals.shares;
                this.marketValue = cals.marketValue;
                this.dayChange = cals.dayChange;
            }
        };
        var loadModel = function(){
            var model = {
                watchlists: localStorage['StockPanel.watchlists'] ? JSON.parse(localStorage['StockPane.watachlists']) : [],
                nextId: localStorage['StockPanel.nextId'] ? parseInt(localStorage['StockPanel.nextId']) : 0
            };
            _.each(model.watchlists, function(watchlist){
                _.extend(watchlist, WatchlistModel);
                _.each(watchlist.stocks, function(stock){
                    _.extend(stock, StockModel);
                });
            });
            return model;
        }; //function loadModel

    // [3] Use lodash to find a watchlist with given ID
        var findById = function(listId){
            return _.find(Model.watchlists, function(watchlist){
                return watchlist.id === parseInt(listId);
            });
        }; // function findById
    // [4] Return all watchlists
        this.query = function(listId){
            if (listId){
                return findById(listId);
            }else {
                return Model.watchlists;
            }
        };
    // [5] Save new watchlist to watchlists model
        this.save = function(watchlist){
            watchlist.id = Model.nextId++;
            Model.watchlists.push(watchlist);
            saveModel();
        };
    // [6] Remove given watchlist from watchlists model
        this..remove = function(watchlist){
            _.remove(Model.watchlists, function(list){
                return list.id === watchlist.id;
            });
            saveModel();
        };
     // [7] Initialize model for singleton service
        var Model = loadModel();
  });
