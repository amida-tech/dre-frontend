'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('medicationMore', function (dreFrontendMedicationService) {
        return {
            templateUrl: 'views/directives/medication-more.html',
            restrict: 'AE',
            scope: {
                medicationMore: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    links: [],
                    wasLoaded: false
                };
                if (!$scope.model.wasLoaded && $scope.medicationMore) {
                    if(angular.isArray($scope.medicationMore.medicationMore)){
                        $scope.model.links = $scope.medicationMore.medicationMore;
                        $scope.model.wasLoaded = true;
                    }else{
                        if($scope.medicationMore.medication){
                            var rxcode = dreFrontendMedicationService.getRxcuiCode($scope.medicationMore.medication);
                            var medname = dreFrontendMedicationService.getMedname($scope.medicationMore.medication);
                            if(rxcode || medname){
                                $scope.model.links = dreFrontendMedicationService.getMedlineInfo(rxcode, medname).then(function(links){
                                    $scope.model.links = links;
                                    $scope.medicationMore.medicationMore = $scope.model.links;
                                }).finally(function(){
                                    $scope.model.wasLoaded = true;
                                });
                            }else{
                                $scope.model.wasLoaded = true;
                            }
                        }else{
                            $scope.model.wasLoaded = true;
                        }
                    }
                }
            }
        };
    });
