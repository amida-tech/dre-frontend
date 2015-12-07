'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userTimelineEntryIcon', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals) {
        return {
            template: '<a class="text-center center-block" ng-class="{\'timeline-entry-icon\': model.isActive, ' +
            '\'timeline-entry-icon-inactive\': !model.isActive}" ng-click="toggleDetails()"> ' +
            '<i class="fa fa-2x {{model.displayClass}}"></i></a>',
            restrict: 'AE',
            scope: {
                userTimelineEntryIcon: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    displayClass: '',
                    isActive: true
                };
                switch ($scope.userTimelineEntryIcon.type) {
                    case 'initAccount':
                        $scope.model.displayClass = 'fa-user';
                        break;
                    case 'loggedIn':
                        $scope.model.displayClass = 'fa-sign-in';
                        break;
                    case 'loggedOut':
                        $scope.model.displayClass = 'fa-sign-out';
                        break;
                    case 'fileUploaded':
                        $scope.model.displayClass = 'fa-cloud-upload';
                        break;
                    case 'fileDownloaded':
                        $scope.model.displayClass = 'fa-cloud-download';
                        break;
                    case 'labResults':
                        $scope.model.displayClass = 'fa-flask';
                        break;
                    case 'passwordChange':
                        $scope.model.displayClass = 'fa-cog';
                        break;
                    case 'infoUpdate':
                        $scope.model.displayClass = 'fa-pencil';
                        break;
                    case 'medUpdate':
                        $scope.model.displayClass = 'icon-pill';
                        break;
                    case dreFrontendGlobals.resourceTypes.MedicationOrder.type:
                        $scope.model.displayClass = 'icon-pill';
//                        $scope.model.isActive = ($scope.userTimelineEntryIcon.dates.isActive === true);
                        break;
                    case dreFrontendGlobals.resourceTypes.TestResult.type:
                        $scope.model.displayClass = 'fa-flask';
                        break;
                    case dreFrontendGlobals.resourceTypes.Encounter.type:
                        $scope.model.displayClass = 'fa-stethoscope';
                        break;
                    case dreFrontendGlobals.resourceTypes.Vital.type:
                        $scope.model.displayClass = 'fa-heart';
                        break;
                    case dreFrontendGlobals.resourceTypes.Immunization.type:
                        $scope.model.displayClass = 'fa-shield';
                        break;
                    case dreFrontendGlobals.resourceTypes.Condition.type:
                        $scope.model.displayClass = 'fa-list';
                        break;
                    case dreFrontendGlobals.resourceTypes.SocialHistory.type:
                        $scope.model.displayClass = 'fa-group';
                        break;
                    case dreFrontendGlobals.resourceTypes.Procedure.type:
                        $scope.model.displayClass = 'fa-medkit';
                        break;
                    case dreFrontendGlobals.resourceTypes.AllergyIntolerance.type:
                        $scope.model.displayClass = 'fa-exclamation-triangle';
                        break;
                    case dreFrontendGlobals.resourceTypes.Insurance.type:
                        $scope.model.displayClass = 'fa-pencil';
                        break;
                    case dreFrontendGlobals.resourceTypes.Claim.type:
                        $scope.model.displayClass = 'fa-pencil';
                        break;
                    default:
                        $scope.model.displayClass = '';
                }
                $scope.toggleDetails = function () {
                    $scope.$emit('toggleMenu', $scope.userTimelineEntryIcon);
                };
            }
        };
    });
