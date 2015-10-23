'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:printMyrecordCtrl
 * @description
 * # printMyrecordCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('PrintMyrecordCtrl', function ($scope, $stateParams, dreFrontEndPatientInfoService, dreFrontendGlobals) {

        var blocks = ["AllergyIntolerance", "MedicationOrder", "Condition", "Procedure", "TestResult",
            "Encounter", "Immunization", "Insurance", "Claim", "SocialHistory", "Vital"];

        $scope.model= {
            data: [],
            patient: null,
            isDone: true,
            profileTitle: 'Demographics'
        };

        console.log('additionalData', $stateParams.additionalData);
        dreFrontEndPatientInfoService.getPatientData()
            .then(function (patient) {
                $scope.model.patient = patient;
                angular.forEach(blocks, function (block_name) {
                    $scope.model.data.push(
                        angular.extend(
                            angular.copy(dreFrontendGlobals.resourceTypes[block_name]),
                            {"withUserData":  $stateParams.additionalData}
                        )
                    );
                });
            });
    });
