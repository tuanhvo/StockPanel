'use strict';

/**
 * @ngdoc service
 * @name stockpanelApp.CompanyService
 * @description
 * # CompanyService
 * Service in the stockpanelApp.
 */
angular.module('stockpanelApp')
  .service('CompanyService', function CompanyService($resource) {
     return $resource('companies:json');
  });
