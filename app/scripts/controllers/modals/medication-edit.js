'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MedicationEditCtrl
 * @description
 * # MedicationEditCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MedicationEditCtrl', function ($scope, $modalInstance, item, $log, $q, dreFrontendEntryService,
                                                dreFrontEndPatientInfoService, dreFrontendMedicationOrder,
                                                dreFrontendPractitioners, dreFrontendMedication) {
        var err_messages = {
            test_err: 'Called method is not imlemented yet in MedicationEditCtrl',
            patient_unset: 'Patient data undefined',
            drug_save_error: 'Error while saving medication',
            prescriber_err: 'Error while saving prescriber'
        };


        var initModel = function () {
            $scope.model = {
                isActive: false,
                step: 0,
                maxStep: 4,
                err: null,
                warn: null,
                saveState: null,
                drug: null,
                drugNote: null,
                drugPeriod: {
                    isCurrent: true,
                    start: null,
                    end: null
                },
                drugType: null,
                prescriber: null,
                startDateOpts: {
                    placeholder: 'MM/DD/YYYY',
                    format: 'MM/dd/yyyy',
                    required: true
                },
                endDateOpts: {
                    placeholder: 'MM/DD/YYYY',
                    format: 'MM/dd/yyyy',
                    required: false
                },
                maxEndDate: new Date(),
                summary: null
            };
        };

        initModel();

        $scope.getMaxStartDate = function () {
            return $scope.model.drugPeriod.end || $scope.model.maxEndDate;
        };

        function initStep() {
            switch ($scope.model.step) {
                case 1:
                    $scope.model.drug = null;
                case 2:
                    $scope.model.prescriber = null;
                case 3:
                    $scope.model.drugPeriod = {
                        start: null,
                        end: null,
                        isCurrent: true
                    };
            }
            $scope.model.isActive = false;
        }

        function isValidDates() {
            var res = true;
            if (!$scope.model.drugPeriod.start) {
                $scope.model.err = "You must enter a valid start date";
                res = false;
            } else if (!$scope.model.drugPeriod.isCurrent && !$scope.model.drugPeriod.end) {
                $scope.model.err = "You must enter a valid last dose date";
                res = false;
            }
            return res;
        }

        var nextStep = function () {
            switch ($scope.model.step) {
                case 1:
                    if (!$scope.model.drug) {
                        $scope.model.err = "You must select a drug";
                    } else {
                        $scope.model.step = ($scope.model.drugType === 'prescription') ? 2 : 3;
                    }
                    break;
                case 2:
                    if (!$scope.model.prescriber) {
                        $scope.model.err = "You must select a prescriber";
                    } else {
                        $scope.model.step = 3;
                    }
                    break;
                case 3:
                    if (isValidDates()) {
                        $scope.model.summary = dreFrontendEntryService.buildTable({
                            productCode: $scope.model.drug.rxcui,
                            productCodeSystem: 'RxNorm',
                            performerName: $scope.model.prescriber.getName(),
                            performerAddress: $scope.model.prescriber.getPracticeAddress().join(', ')
                        }, []);
                        $scope.model.step = 4;
                    }
                    break;
                default:
                    $scope.model.step++;
            }
            initStep();
        };

        var prevStep = function () {
            if ($scope.entryStep === 3 && $scope.medSearchType !== 'prescription') {
                $scope.entryStep = 1;
            } else {
                if ($scope.model.step > 0) {
                    $scope.model.step--;
                }
            }
            initStep();
        };

        $scope.reset = initModel;

        $scope.next = nextStep;

        $scope.prev = prevStep;

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.setStep = function (step) {
            $scope.model.step = step;
            initStep();
        };

        $scope.setDrugType = function (drugType) {
            $scope.model.drugType = drugType;
            nextStep();
        };

        $scope.saveMedication = function () {
            $scope.model.isActive = true;
            dreFrontEndPatientInfoService.getPatientData()
                .then(function (patient) {
                    var result;
                    if (!patient.id) {
                        return result = $q.reject(err_messages.patient_unset);
                    }

                    if (!item) {
                        /* create new MedicationOrder */
                        result = dreFrontendMedicationOrder.getEmpty();
                        result.patient = { reference: 'Patient/'.patient.id };
                    } else {
                        /* update MedicationOrder */
                        result = item;
                    }
                    if (!result) {
                        result = $q.reject(err_messages.test_err);
                    }
                    return result;
                })
                .then(function(medOrder){
                    var result;
                    /* set Medication Data */
                    if (!result) {
                        result = $q.reject(err_messages.test_err);
                    }
                    return result;
                })
                .then(function(res){
                    $scope.model.saveState = "success";
                })
                .catch(function (err) {
                    $log.debug(err);
                    $scope.model.saveState = "error";
                    $scope.model.err = err.toString();
                })
                .finally(function () {
                    $scope.model.isActive = false;
                });
        };
    });
