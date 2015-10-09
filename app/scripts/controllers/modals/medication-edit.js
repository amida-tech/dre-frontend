'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MedicationEditCtrl
 * @description
 * # MedicationEditCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MedicationEditCtrl', function ($scope, $modalInstance, item) {

        var initModel = function () {
            $scope.model = {
                medication: item,
                drug: null,
                drugType: null,
                prescriber: null,
                step: 0,
                maxStep: 4,
                err: null,
                warn: null
            };
        };

        initModel();

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
                    /*
                     if (!_.has($scope, 'pStart')) {
                     $scope.error = "You must enter a start date";
                     } else {
                     enteredObject(function () {
                     format.formatDate($scope.enteredMedication.date_time.low);
                     if ($scope.enteredMedication.date_time.high) {
                     format.formatDate($scope.enteredMedication.date_time.high);
                     }
                     if ($scope.enteredMedication.performer) {
                     if ($scope.enteredMedication.performer.address) {
                     format.formatAddress($scope.enteredMedication.performer.address[0]);
                     }
                     if ($scope.enteredMedication.performer.name) {
                     format.formatName($scope.enteredMedication.performer.name[0]);
                     }
                     }
                     console.log($scope.enteredMedication);
                     $scope.medication = $scope.enteredMedication;
                     $scope.model.step = 4;
                     });
                     }
                     */
                    break;
                default:
                    $scope.model.step++;
            }
        };

        var prevStep = function () {
            if ($scope.entryStep === 3 && $scope.medSearchType !== 'prescription') {
                $scope.entryStep = 1;
            } else {
                if ($scope.model.step > 0) {
                    $scope.model.step--;
                }
            }
        };

        $scope.reset = initModel;

        $scope.next = nextStep;

        $scope.prev = prevStep;

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.setStep = function (step) {
            $scope.model.step = step;
        };

        $scope.setDrugType = function (drugType) {
            $scope.model.drugType = drugType;
            nextStep();
        };
        /*** old conroller
         $scope.entryStep = 0;
         $scope.prescriberSearchActive = false;
         $scope.drugSearchActive = false;
         $scope.saveMedication = saveMedication;
         $scope.enteredMedication = {};
         $scope.saveMedicationStatus = null;
         $scope.pCurrentMedRadio = true;

         $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

         function enteredObject(callback) {

            var pmed_metadata = {};
            var pmed_product = {};
            var pmed_lowdate = {};
            var pmed_highdate = {};
            console.log("entering object...");
            if ($scope.medSearchType === 'prescription') {
                console.log("...was a prescription");
                $scope.enteredMedication = {};
                pmed_metadata = {
                    "patient_entered": true,
                    "is_prescription": true,
                    "attribution": [{
                        merged: new Date(),
                        merge_reason: "new"
                    }]
                };
                _.deepSet($scope.enteredMedication, 'med_metadata', pmed_metadata);
                if ($scope.selectedImage) {
                    _.deepSet($scope.enteredMedication, 'med_metadata.image', $scope.selectedImage);
                }

                if ($scope.pWhy) {
                    _.deepSet($scope.enteredMedication, 'sig', $scope.pWhy);
                }

                pmed_product = {
                    "name": $scope.selectedDrug.synonym,
                    "code": $scope.selectedDrug.rxcui,
                    "code_system_name": 'rxgroup'
                };
                _.deepSet($scope.enteredMedication, 'product.identifiers[0].rxcui', $scope.selectedDrug.rxcui);
                _.deepSet($scope.enteredMedication, 'product.product', pmed_product);

                _.deepSet($scope.enteredMedication, 'performer.address[0].street_lines[0]', $scope.selectedPrescriber.practice_address.address_line);
                _.deepSet($scope.enteredMedication, 'performer.address[0].city', $scope.selectedPrescriber.practice_address.city);
                _.deepSet($scope.enteredMedication, 'performer.address[0].state', $scope.selectedPrescriber.practice_address.state);
                _.deepSet($scope.enteredMedication, 'performer.name[0].first', $scope.selectedPrescriber.first_name);
                _.deepSet($scope.enteredMedication, 'performer.name[0].last', $scope.selectedPrescriber.last_name);

                if ($scope.pStart) {
                    pmed_lowdate = {
                        "date": moment($scope.pStart).format('YYYY-MM-DD') + 'T00:00:00.000Z',
                        "precision": 'day'
                    };
                    _.deepSet($scope.enteredMedication, 'date_time.low', pmed_lowdate);
                }
                if (!$scope.pCurrentMedRadio) {
                    if ($scope.pLast) {
                        pmed_highdate = {
                            "date": moment($scope.pLast).format('YYYY-MM-DD') + 'T00:00:00.000Z',
                            "precision": 'day'
                        };
                    } else {
                        pmed_highdate = {
                            "date": moment().format('YYYY-MM-DD') + 'T00:00:00.000Z',
                            "precision": 'day'
                        };
                    }
                    _.deepSet($scope.enteredMedication, 'date_time.high', pmed_highdate);
                }
            } else {

                $scope.enteredMedication = {};
                pmed_metadata = {
                    "patient_entered": true,
                    "is_prescription": false,
                    "attribution": [{
                        merged: new Date(),
                        merge_reason: "new"
                    }]
                };
                _.deepSet($scope.enteredMedication, 'med_metadata', pmed_metadata);
                if ($scope.selectedImage) {
                    _.deepSet($scope.enteredMedication, 'med_metadata.image', $scope.selectedImage);
                }

                console.log($scope.pWhy);
                if ($scope.pWhy) {
                    _.deepSet($scope.enteredMedication, 'sig', $scope.pWhy);
                }

                pmed_product = {
                    "name": $scope.selectedDrug.synonym,
                    "code": $scope.selectedDrug.rxcui,
                    "code_system_name": 'rxgroup'
                };
                _.deepSet($scope.enteredMedication, 'product.identifiers[0].rxcui', $scope.selectedDrug.rxcui);
                _.deepSet($scope.enteredMedication, 'product.product', pmed_product);

                if ($scope.pStart) {
                    pmed_lowdate = {
                        "date": moment($scope.pStart).format('YYYY-MM-DD') + 'T00:00:00.000Z',
                        "precision": 'day'
                    };
                    _.deepSet($scope.enteredMedication, 'date_time.low', pmed_lowdate);
                }
                console.log("pCurrentMedRadio" + $scope.pCurrentMedRadio);

                if (!$scope.pCurrentMedRadio) {
                    if ($scope.pLast) {
                        pmed_highdate = {
                            "date": moment($scope.pLast).format('YYYY-MM-DD') + 'T00:00:00.000Z',
                            "precision": 'day'
                        };
                    } else {
                        pmed_highdate = {
                            "date": moment().format('YYYY-MM-DD') + 'T00:00:00.000Z',
                            "precision": 'day'
                        };
                    }
                    _.deepSet($scope.enteredMedication, 'date_time.high', pmed_highdate);
                }

            }
            console.log("...entered Medication: ", $scope.enteredMedication);
            callback();
        }

         function saveMedication() {
            medications.addMedication($scope.enteredMedication, function (err, results) {
                if (err) {
                    // Display an error in the med entry modal
                    $scope.saveMedicationStatus = 'error';
                } else {
                    // Display success in the med entry modal
                    $scope.saveMedicationStatus = 'success';
                    $scope.medReset();
                    $modalInstance.close();
                    dataservice.forceRefresh();
                    $route.reload();
                }
            });
        }

         $scope.setSelectedPrescriber = function setSelectedPrescriber() {
            if (this.prescriber.selected) {
                this.prescriber.selected = false;
                $scope.selectedPrescriber = null;
            } else {
                for (var k = 0; k < $scope.prescriberResults.length; k++) {
                    $scope.prescriberResults[k].selected = false;
                }
                this.prescriber.selected = true;
                $scope.selectedPrescriber = this.prescriber;
            }
        };

         $scope.setSelectedImage = function setSelectedImage(rxImage) {
            if (rxImage.selected) {
                rxImage.selected = false;
                $scope.selectedImage = null;
            } else {
                for (var k = 0; k < $scope.rximageResults.nlmRxImages.length; k++) {
                    $scope.rximageResults.nlmRxImages[k].selected = false;
                }
                rxImage.selected = true;
                $scope.selectedImage = rxImage;
            }
        };


         $scope.initInfoSearch = function (sType) {
            if (sType === 'prescription') {
                $scope.medSearchType = 'prescription';
            } else {
                $scope.medSearchType = 'otc-supplement';
            }
            $scope.entryStep = 1;
        };

         $scope.medReset = function () {
            console.log("RESETTING MEDICATION ENTRY");
            $scope.prescriberResults = null;
            $scope.pFirstName = null;
            $scope.pLastName = null;
            $scope.pDrugName = null;
            $scope.selectedImage = null;
            $scope.pCurrentMedRadio = true;
            //$scope.openfdanameResults = null;
            $scope.rxnormResults = null;
            //$scope.medlineResults = null;
            $scope.rximageResults = null;
            //$scope.openfdacodeResults = null;
            $scope.selectedDrug = null;
            $scope.selectedPrescriber = null;
            $scope.drugError = null;
            $scope.drugWarning = null;
            $scope.prescriberError = null;
            $scope.entryStep = 0;
            $scope.pWhy = null;
            $scope.pOften = "";
            $scope.pLast = null;
            // $scope.pCurrentMedRadio = null;
            $scope.pStart = null;
            $scope.drugSpelling = null;
        };

         $scope.close = function () {
            $scope.medReset();
            $modalInstance.dismiss('cancel');
        };

         // $scope.medReset();

         */
    });
