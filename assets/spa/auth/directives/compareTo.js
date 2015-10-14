(function() {
    'use strict';

    angular
        .module('dabou.auth')
        .directive('compareTo', compareTo);

    compareTo.$inject = [];

    /**
     * @ngdoc directive
     * @name dabou.auth.directive:compareTo
     * @restrict
     * @description
     */
     
    function compareTo() {
        var directive = {
            link: link,
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                otherModelValue: '=compareTo'
            }
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue === scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    }
})();
