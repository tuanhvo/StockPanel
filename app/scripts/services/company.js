/**
 * Created by TuanhVo on 6/25/2016.
 */
'use strict';
angular.module('stockpanelApp').service('CompanyService', function CompanyService($resource){
    return $resource('companies.json');
});