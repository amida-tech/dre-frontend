/**
 * Created by igi on 08.10.15.
 */
'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:drugSearch
 * @description
 * # drugSearch
 */
angular.module('dreFrontendApp')
    .directive('drugSearch', function () {
        return {
            templateUrl: 'views/directives/drug-search.html',
            restrict: 'AE',
            scope: {
                resultDrug: '='
            },
            controller: function ($scope, $http) {
                $scope.model = {
                    search: {
                        query: null,
                        filter: null,
                        active: false
                    },
                    drugSpell: [],
                    RxNorm: [],
                };

                $scope.search = function() {

                };
            }
        };
    });
