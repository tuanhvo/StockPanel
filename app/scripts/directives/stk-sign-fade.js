'use strict';

/**
 * @ngdoc directive
 * @name stockpanelApp.directive:stkSignFade
 * @description
 * # stkSignFade
 */
angular.module('stockpanelApp')
  .directive('stkSignFade', function ($animate) {
    return {

      restrict: 'A',
      link: function ($scope, $element, $attrs) {
          var oldVa = NULL;
          // Use $observe to be notified on value changes
          $attrs.$observe('stkSignFade', function(newVal){
              if(oldVal && oldVal == newVal){
                  return;
              }
              var oldPrice = parseFloat(oldVal);
              var newPrice = parseFloat(newVal);
              oldVal = newVal;
              // Add the appropriate direction class, then remove it
              if(oldPrice && newPrice){
                  var direction = newPrice - oldPrice >= 0 ? 'up' : 'down';
                  $animate.addClass($element, 'change-' + direction, function(){
                      $animate.removeClass($element, 'change-' + direction);
                  });
               }
          });
        }
    };
  });
