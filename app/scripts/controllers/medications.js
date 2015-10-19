'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MedicationsCtrl', function ($scope, dreFrontendEntryService, dreFrontendMedicationOrder, _,
                                             dreFrontEndPatientInfoService, dreFrontendUtil, dreFrontendGlobals,
                                             dreFrontendModalsService) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            showInactive: false,
            medicationsList: [],
            filteredMedicationList: [],
            updates: 5, //TODO hardcoded, need to get updates fromo SERVICE
            entryType: 'medications'
        };

        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });

        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendMedicationOrder.getByPatientId(patientId).then(function (medications) {
                $scope.model.medicationsList = [];
                _.forEach(medications.entry, function (entry) {
                    $scope.model.medicationsList.push({
                        rawEntry: entry,
                        type: dreFrontendGlobals.resourceTypes.MedicationOrder.type,
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.popup,
                        updates: 2
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
                        return item.dates.isInactive === false;
                    });
        };
        $scope.showMedicationEdit = function() {
            dreFrontendModalsService.showMedicationEdit();
        }
    });
