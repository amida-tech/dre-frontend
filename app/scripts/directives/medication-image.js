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
                var rxcode = $scope.rxcui;
                var medication = $scope.medicationImage ? $scope.medicationImage.medicationReference : undefined;

                if (!$scope.model.wasLoaded && (medication || rxcode)) {

                    if (medication && angular.isArray(medication.medicationImage)) {
                        $scope.model.images = medication.medicationImage;
                        $scope.model.wasLoaded = true;
                    } else {
                        var medname;

                        if (medication && !rxcode) {
                            rxcode = dreFrontendMedicationService.getRxcuiCode(medication);
                            medname = dreFrontendMedicationService.getMedname(medication);
                        }
                        if (rxcode || medname) {
                            $scope.model.images = dreFrontendMedicationService.getRxImages(rxcode, medname).then(function (images) {
                                $scope.model.images = images;
                                if (medication) {
                                    medication.medicationImage = $scope.model.images;
                                }
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
