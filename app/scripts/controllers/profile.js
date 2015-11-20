'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ProfileCtrl', function ($scope, _, dreFrontEndPatientInfoService, dreFrontendGlobals, fhirEnv,
                                         dreFrontendFhirService, fhirValueSet) {

        $scope.init = function () {
            $scope.model = {
                patient: null,
                patientId: null,
                firstName: "",
                middleName: "",
                lastName: "",
                dateOfBirth: "",
                gender: "",
                primaryEmail: "",
                race: "",
                ethnicity: "",
                maritalStatus: "",
                addresses: [],
                phones: []
            };
        };
        $scope.init();

        $scope.view = {
            edit: false,
            addressEdit: false,
            phoneEdit: false,
            monthNames: dreFrontendGlobals.monthNames,
            maritalStatuses: [],
            genders: [],
            ethnicityCodes: fhirEnv.ethnicityCodes,
            raceCodes: fhirEnv.raceCodes,
            addressTypes: [],
            contactUse: []
        };

//todo refactor controller

        fhirValueSet.get("AddressType")
            .then(function (data) {
                $scope.view.addressTypes = data;
            });

        fhirValueSet.get("ContactPointUse")
            .then(function (data) {
                $scope.view.contactUse = data;
            });

        fhirValueSet.get("AdministrativeGender")
            .then(function (data) {
                $scope.view.genders = data;
            });

        fhirValueSet.get("v3 Code System MaritalStatus")
            .then(function (data) {
                $scope.view.maritalStatuses = data;
            });

        var _initTelecom = function (patient) {
            if (!patient.telecom || patient.telecom.length === 0) {
                patient.telecom = [
                    {system: fhirEnv.contactSystemCodes.email, value: ''},
                    {system: fhirEnv.contactSystemCodes.phone, value: ''}
                ];
            } else {
                var qty = {};
                angular.forEach(fhirEnv.contactSystemCodes, function (v) {
                    qty[v] = 0;
                });
                angular.forEach(patient.telecom, function (v) {
                    qty[v.system]++;
                });
                angular.forEach(qty, function (v, k) {
                    if (v < 1) {
                        patient.telecom.push({system: k, value: null});
                    }
                });
            }

        };

        $scope.contactSystemCodes = fhirEnv.contactSystemCodes;

        $scope.initPatientModel = function (force) {
            $scope.init();
            dreFrontEndPatientInfoService
                .getPatientData(force)
                .then(function (patient) {
                    var model = $scope.model;
                    model.patient = patient;
                    $scope.model.patientId = patient.id;

                    if (patient.name !== undefined && patient.name.length !== 0) {
                        var names = patient.name[0];
                        if (names.family !== undefined && names.family.length !== 0) {
                            model.lastName = names.family[0];
                        }
                        if (names.given !== undefined && names.given.length !== 0) {
                            model.firstName = names.given[0];
                            if (names.given.length > 1) {
                                model.middleName = names.given[1];
                            }
                        }
                    }
                    _initTelecom(patient);

                    if (patient.telecom && patient.telecom.length > 0) {
                        _.forEach(patient.telecom, function (entry) {
                            if (entry.system === $scope.contactSystemCodes.email) {
                                model.primaryEmail = entry.value;
                            }
                            if (entry.system === $scope.contactSystemCodes.phone) {
                                model.phones.push(entry);
                            }
                        });
                    }

                    if (patient.maritalStatus && patient.maritalStatus.coding.length > 0) {
                        model.maritalStatus = patient.maritalStatus.coding[0];
                    }

                    var extensionInfo;
                    if (patient.extension && patient.extension.length > 0) {
                        extensionInfo = patient.extension;
                    }

                    if (patient.birthDate) {
                        model.dateOfBirth = new Date(patient.birthDate);
                    }

                    if (patient.gender) {
                        model.gender = patient.gender;
                    }

                    if (patient.address && patient.address.length !== 0) {
                        model.addresses = patient.address;
                    } else {
                        patient.address = [];
                        model.addresses = patient.address;
                    }

                    _.forEach(model.addresses, function (entry) {
                        $scope.setContactType(entry);
                    });

                    _.forEach(model.phones, function (entry) {
                        $scope.setContactType(entry);
                    });

                    _.forEach(extensionInfo, function (entry) {
                        if (entry.url) {
                            var _url_type = null;
                            if (entry.url === fhirEnv.raceExtensionUrl) {
                                _url_type = 'race';
                            }
                            if (entry.url === fhirEnv.ethnicityExtensionUrl) {
                                _url_type = 'ethnicity';
                            }
                            if (_url_type && entry.valueCodeableConcept && entry.valueCodeableConcept.coding && entry.valueCodeableConcept.coding.length > 0) {
                                model[_url_type] = entry.valueCodeableConcept.coding[0];
                            }

                        }
                    });
                });
        };
        $scope.initPatientModel(true);

        $scope.changeEditProfileSection = function (force) {
            $scope.view.edit = !$scope.view.edit;
            $scope.initPatientModel(force);
        };

        $scope.changeEditAddressSection = function (force) {
            $scope.view.addressEdit = !$scope.view.addressEdit;
            $scope.initPatientModel(force);
        };

        $scope.changeEditPhoneSection = function (force) {
            $scope.view.phoneEdit = !$scope.view.phoneEdit;
            $scope.initPatientModel(force);
        };

        $scope.setContactType = function (address) {
            _.forEach($scope.view.addressCodes, function (entry) {
                if (address.use === entry.code) {
                    address.contactType = entry;
                }
            });
        };

        //TODO Check for bad response, SHOW IT in the GUI

        var _updatePatient = function (_patient, _editSection) {
            _patient.update()
                .then(function () {
                    $scope.view[_editSection]= false;
                    $scope.initPatientModel(true);
                });
        };

        $scope.updateProfile = function () {
            var model = $scope.model;
            var patient = model.patient;
            patient.name = [{given: [model.firstName, model.middleName], family: [model.lastName]}];
            patient.telecom = [];
            patient.telecom = patient.telecom.concat(model.phones);
            patient.telecom.push({system: $scope.contactSystemCodes.email, value: model.primaryEmail});
            patient.maritalStatus = {coding: [model.maritalStatus]};
            patient.birthDate = model.dateOfBirth.toISOString();
            patient.gender = model.gender;


            var extensionInfo;
            if (patient.extension && patient.extension.length > 0) {
                extensionInfo = patient.extension;
            } else {
                patient.extension = [];
                extensionInfo = patient.extension;
            }

            var raceFound = false;
            var ethnicityFound = false;
            _.forEach(extensionInfo, function (entry) {
                if (entry.url) {
                    if (entry.url === fhirEnv.raceExtensionUrl) {
                        entry.valueCodeableConcept = {};
                        entry.valueCodeableConcept.coding = [model.race];
                        raceFound = true;
                    }
                    if (entry.url === fhirEnv.ethnicityExtensionUrl) {
                        entry.valueCodeableConcept = {};
                        entry.valueCodeableConcept.coding = [model.ethnicity];
                        ethnicityFound = true;
                    }

                }
            });

            if (!raceFound) {
                var raceObj = {};
                raceObj.url = fhirEnv.raceExtensionUrl;
                raceObj.valueCodeableConcept = {};
                raceObj.valueCodeableConcept.coding = [model.race];
                patient.extension.push(raceObj);
            }

            if (!ethnicityFound) {
                var ethnicityObj = {};
                ethnicityObj.url = fhirEnv.ethnicityExtensionUrl;
                ethnicityObj.valueCodeableConcept = {};
                ethnicityObj.valueCodeableConcept.coding = [model.ethnicity];
                patient.extension.push(ethnicityObj);
            }

            _updatePatient($scope.model.patient, 'edit');
        };

        $scope.updateAddress = function () {
            _updatePatient($scope.model.patient, 'addressEdit');
        };

        $scope.updatePhone = function () {
            _updatePatient($scope.model.patient, 'phoneEdit');
        };
    });
