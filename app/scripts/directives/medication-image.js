'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('medicationImage', function (dreFrontendMedicationService) {
        return {
            templateUrl: 'views/directives/medication-image.html',
            restrict: 'AE',
            scope: {
                medicationImage: '=',
                rxcui: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    images: [],
                    wasLoaded: false
                };
                if (!$scope.model.wasLoaded && ($scope.medicationImage || $scope.rxcui)) {

                    if (angular.isArray($scope.medicationImage.medicationImage)) {
                        $scope.model.images = $scope.medicationImage.medicationImage;
                        $scope.model.wasLoaded = true;
                    } else {
                        var rxcode = $scope.rxcui, medname;

                        if (!rxcode && $scope.medicationImage.medication) {
                            rxcode = dreFrontendMedicationService.getRxcuiCode($scope.medicationImage.medication);
                            medname = dreFrontendMedicationService.getMedname($scope.medicationImage.medication);
                        }

                        if (rxcode || medname) {
                            $scope.model.images = dreFrontendMedicationService.getRxImages(rxcode, medname).then(function (images) {
                                $scope.model.images = images;
                                $scope.medicationImage.medicationImage = $scope.model.images;
                            }).finally(function () {
                                $scope.model.wasLoaded = true;
                            });
                        } else {
                            $scope.model.wasLoaded = true;
                        }
                    }
                }
            }
        };
    });
