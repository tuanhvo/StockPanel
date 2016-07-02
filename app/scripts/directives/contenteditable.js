'use strict';
var NUM_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
/**
 * @ngdoc directive
 * @name stockpanelApp.directive:contenteditable
 * @description
 * # contenteditable
 */
angular.module('stockpanelApp')
  .directive('contenteditable', function ($sce) {
    return {

      restrict: 'A',
      require: 'ngModel', //[1] Get a hold of mgModelCtrl
      link: function($scope, $element, $attrs, mgModelCtrl){
          if(!ngModelCtrl){
              return;
          }
      // [2] Update UI
      ngModelCtrl.$render = function(){
          $element.html($sce.getTrustedHtml(ngModelCtrl.$viewValue || ''));
      }
      // [3] Read html value, write data to model or reset view
      var read = function(){
          var value = $element.html();
          if ($attrs.type = 'number' && (NUM_REGEXP.test(value))){
              ngModelCtrl = $render();
          } else {
              mgModelCtrl.$setViewValue(value);
          }
        };
      // [4] Add custom parser-based input type
      if($attrs.type = 'number'){
          ngModelCtrl.$parsers.push(function(value){
              return parseFloat(value);
          });
        };
      // [5] Listen for change
      $element.on('blue keyup change', function(){
          $scope.$apply(read);
      });
     }
    };
  });
