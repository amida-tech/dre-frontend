'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userTimeline', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals, dreFrontendModalsService) {
        return {
            templateUrl: 'views/directives/user-timeline.html',
            restrict: 'AE',
            scope: {
                userTimeline: '='
            },
            controller: function ($scope) {
                $scope.menuTypes = dreFrontendGlobals.menuRecordTypeEnum;

                $scope.showMedicationInfo = function (item) {
                    dreFrontendModalsService.showMedicationInfo(item);
                };

                var toggleMenuCleanEvent = $scope.$on('toggleMenu', function (event, item) {
                    if (item.menuType == dreFrontendGlobals.menuRecordTypeEnum.popup) {
                        $scope.showMedicationInfo(item);
                    }
                    if (item.menuType == dreFrontendGlobals.menuRecordTypeEnum.inline) {
                        console.log('event', item);
                        item.isDetailsOpen = !item.isDetailsOpen;
                    }
                });

                $scope.$on('$destroy', function () {
                    toggleMenuCleanEvent();
                });
            }
        };
    });
