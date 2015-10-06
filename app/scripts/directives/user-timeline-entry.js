'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userTimelineEntry', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals,
                                              dreFrontendModalsService, $stateParams, $uiViewScroll, $timeout) {
        return {
            templateUrl: 'views/directives/user-timeline-entry.html',
            restrict: 'AE',
            scope: {
                userTimelineEntry: '='
            },
            link: function ($scope, element) {
                $scope.menuTypes = dreFrontendGlobals.menuRecordTypeEnum;

                $scope.showMedicationInfo = function () {
                    dreFrontendModalsService.showMedicationInfo($scope.userTimelineEntry);
                };

                var toggleMenu = function () {
                    if ($scope.userTimelineEntry.menuType == dreFrontendGlobals.menuRecordTypeEnum.popup) {
                        $scope.showMedicationInfo();
                    }
                    if ($scope.userTimelineEntry.menuType == dreFrontendGlobals.menuRecordTypeEnum.inline) {
                        $scope.userTimelineEntry.isDetailsOpen = !$scope.userTimelineEntry.isDetailsOpen;
                    }
                };

                var toggleMenuCleanEvent = $scope.$on('toggleMenu', function (event) {
                    toggleMenu();
                });

                $scope.$on('$destroy', function () {
                    toggleMenuCleanEvent();
                });
                if ($stateParams.id && $scope.userTimelineEntry.rawEntry.id == $stateParams.id) {
                    element.addClass('bg-warning');
                    $timeout(function () {
                        element.removeClass('bg-warning');
                        $state.go($state.current.name,{id:undefined},{notify:false, reload:false})
                    }, 3000);

                    $timeout(function () {
                        $uiViewScroll(element);
                        toggleMenu();
                    });
                }
            }
        };
    });