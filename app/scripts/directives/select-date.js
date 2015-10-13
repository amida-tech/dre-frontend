/**
 * Created by igi on 12.10.15.
 */
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:selectDate
 * @description
 * # selectDate
 */
angular.module('dreFrontendApp')
    .directive('selectDate', function ($log) {
        return {
            templateUrl: 'views/directives/select-date.html',
            restrict: 'AE',
            scope: {
                resultDate: '=',
                minDate: '=',
                maxDate: '=',
                options: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    opened: false,
                    err: null
                };

                angular.extend($scope.model, $scope.options);

                $scope.open = function (evt) {
                    $scope.model.opened = true;
                }
            }
        };
    });
