'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:inputEquals
 * @description
 * # inputEquals
 */
angular.module('dreFrontendApp')
    .directive('uniqueUsernameValidator', function (dreFrontendAuthService, $q) {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function (scope, elem, attrs, ngModel) {
                if (ngModel) { // do nothing if no ng-model
                    ngModel.$asyncValidators.uniqueUsername = function (modelValue) {
                        return dreFrontendAuthService.isFreeLogin(modelValue).then(function (isFree) {
                            if (isFree) {
                                return true;
                            } else {
                                return $q.reject(false);
                            }
                        });
                    };
                }
            }
        };
    });
