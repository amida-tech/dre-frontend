'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MedicationsCtrl', function ($scope, dreFrontendEntryService, dreFrontendMedications, _, dreFrontEndPatientInfoService, dreFrontendUtil, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            showInactive: false,
            medicationsList: [],
            filteredMedicationList: []
        };

        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });

        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendMedications.getByPatientId(patientId).then(function (medications) {
                $scope.model.medicationsList = [];
                _.forEach(medications.entry, function (entry) {
                    $scope.model.medicationsList.push({
                        rawEntry: entry,
                        type: entry.resourceType,
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.popup
                    })
                });
                $scope.filterMedications();
                if($scope.model.filteredMedicationList.length == 0){
                    $scope.model.showInactive = true;
                    $scope.filterMedications();
                }
            });
        });

        $scope.filterMedications = function () {
            $scope.model.filteredMedicationList = $scope.model.showInactive
                ? $scope.model.medicationsList
                : _.filter($scope.model.medicationsList, function (item) {
                        return item.dates.isInactive == false;
                    });
        }
    });
