'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MedicationEditCtrl
 * @description
 * # MedicationEditCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MedicationEditCtrl', function ($scope, $modalInstance, item, $log, dreFrontendEntryService, dreFrontendMedicationOrderService) {

        var initModel = function () {
            $scope.model = {
                medication: item,
                drug: null,
                drugDetails: null,
                drugPeriod: {
                    isCurrent: true,
                    start: null,
                    end: null
                },
                drugType: null,
                prescriber: null,
                step: 0,
                maxStep: 4,
                err: null,
                warn: null,
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
                summary: null,
                saveState: null
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

        $scope.prepareDetails = function () {
            var summary = {};
            return
        };

        $scope.saveMedication = function () {
            $log.debug($scope.model.drug, $scope.model.prescriber);
            dreFrontendMedicationOrderService.save({
                entry: item,
                medication: $scope.model.drug,
                prescriber: $scope.model.prescriber
            })
                .then(function (res) {
                    $scope.model.saveState = "success";
                })
                .catch(function (err) {
                    $log.debug(err);
                    $scope.model.saveState = "error";
                    $scope.model.err = err;
                })
                .finally(function () {

                });

            /* get Medication */
            /* get Prescriber */
            /* fill MedicationOrder */
            /* save changes */
        };
    });
