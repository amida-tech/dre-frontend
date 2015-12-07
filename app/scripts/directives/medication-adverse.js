'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('medicationAdverse', function (dreFrontendMedicationService) {
        return {
            templateUrl: 'views/directives/medication-adverse.html',
            restrict: 'AE',
            scope: {
                medicationAdverse: '='
            },
            controller: function ($scope, _) {
                $scope.model = {
                    events: [],
                    total: 0,
                    wasLoaded: false
                };
                var medication = $scope.medicationAdverse.medicationReference;

                if (!$scope.model.wasLoaded && $scope.medicationAdverse) {
                    if (angular.isArray($scope.medicationAdverse.medicationAdverse)) {
                        $scope.model.events = $scope.medicationAdverse.medicationAdverse;
                        $scope.model.wasLoaded = true;
                    } else {
                        if (medication) {
                            var rxcode = dreFrontendMedicationService.getRxcuiCode(medication);
                            var medname = dreFrontendMedicationService.getMedname(medication);
                            if (rxcode || medname) {
                                $scope.model.events = dreFrontendMedicationService.getAdverseEvents(rxcode, medname).then(function (events) {
                                    $scope.model.events = events;
                                    $scope.model.total = _.sum(events, 'count');
                                    _.forEach($scope.model.events, function (item) {
                                        item.percentage = (100 * item.count / $scope.model.total).toFixed(2);
                                    });
                                    $scope.medicationAdverse.medicationAdverse = $scope.model.events;
                                }).finally(function () {
                                    $scope.model.wasLoaded = true;
                                });
                            } else {
                                $scope.model.wasLoaded = true;
                            }
                        } else {
                            $scope.model.wasLoaded = true;
                        }
                    }
                }
            }
        };
    });
