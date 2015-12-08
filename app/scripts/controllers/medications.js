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
            showInactive: true,
            medicationsList: [],
            filteredMedicationList: [],
            entryType: 'medications'
        };

        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
            dreFrontendMedicationOrder.getByPatientId(patient.id).then(function (medications) {
                $scope.model.medicationsList = [];
                _.forEach(medications.entry, function (entry) {
                    $scope.model.medicationsList.push(dreFrontendEntryService.getEntry(
                            entry,
                            dreFrontendGlobals.resourceTypes.MedicationOrder.type,
                            dreFrontendGlobals.menuRecordTypeEnum.popup
                        )
                    );
                });
                $scope.filterMedications();
                if ($scope.model.filteredMedicationList.length === 0) {
                    $scope.model.showInactive = true;
                    $scope.filterMedications();
                }
            });
        });

        $scope.filterMedications = function () {
            $scope.model.filteredMedicationList = $scope.model.showInactive ?
                $scope.model.medicationsList : _.filter($scope.model.medicationsList, function (item) {
                return item.dates.isActive !== false;
            });
        };
        $scope.showMedicationEdit = function () {
            dreFrontendModalsService.showMedicationEdit();
        };
    });
