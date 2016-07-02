'use strict';

/**
 * @ngdoc directive
 * @name stockpanelApp.directive:stkSignColor
 * @description
 * # stkSignColor
 */
angular.module('stockpanelApp')
  .directive('stkSignColor', function () {
    return {

      restrict: 'A',
      link: function (scope, $element, $attrs) {
      // [1] Use $observe to watch for change
        $attrs.$observe('stkSignColor', function(newVal){
            var newSign = parseFloat(newVal);
            if(newSign > 0){
                $element.style.color = 'Green';
            }else {
                $element.style.color = 'Blue';
            }
        });
      }
    };
  });
