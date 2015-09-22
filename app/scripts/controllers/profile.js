'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('ProfileCtrl', function ($scope, _, dreFrontEndPatientInfo, dreFrontendGlobals, fhirEnv, dreFrontendFhirService, $location, $anchorScroll) {

        $scope.init = function() {
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
            maritalStatuses: fhirEnv.maritalStatuses,
            genders: fhirEnv.gender,
            addressCodes: fhirEnv.addressCodes
        };

        $scope.contactSystemCodes = fhirEnv.contactSystemCodes;

        $scope.initPatientModel = function(force) {
            $scope.init();
            dreFrontEndPatientInfo.getPatientData(force).then(function (patient) {
                var model = $scope.model;
                model.patient = patient;
                if(patient.name != undefined && patient.name.length != 0) {
                    var names = patient.name[0];
                    if(names.family != undefined && names.family.length != 0) model.lastName = names.family[0];
                    if(names.given != undefined && names.given.length != 0) {
                        model.firstName = names.given[0];
                        if(names.given.length != 1) {
                            model.middleName = names.given[1];
                        }
                    }
                }
                if(patient.telecom != undefined) {
                    if(patient.telecom.length != 0) {
                        _.forEach(patient.telecom, function(entry) {
                            if(entry.system === $scope.contactSystemCodes.email) {
                                model.primaryEmail = entry.value;
                            }
                            if(entry.system === $scope.contactSystemCodes.phone) {
                                model.phones.push(entry);
                            }
                        })
                    }
                }
                if(patient.maritalStatus != undefined) {
                    if(patient.maritalStatus.coding.length != 0) {
                        if(patient.maritalStatus.coding[0].display != undefined) {
                            model.maritalStatus = patient.maritalStatus.coding[0];
                        }
                    }
                }
                if(patient.birthDate != undefined) {
                    model.dateOfBirth = new Date(patient.birthDate);
                }
                if(patient.gender != undefined) {
                    model.gender = patient.gender;
                }
                if(patient.address.length != 0) {
                    model.addresses = patient.address;
                }
                _.forEach(model.addresses, function(entry) {
                    $scope.setContactType(entry);
                });
                _.forEach(model.phones, function(entry) {
                    $scope.setContactType(entry);
                });
            });
        };
        $scope.initPatientModel(true);

        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            $scope.model.patientId = patientId;
        });

        $scope.changeEditProfileSection = function(force) {
            $scope.view.edit = !$scope.view.edit;
            $scope.initPatientModel(force);
        };

        $scope.changeEditAddressSection = function(force) {
            $scope.view.addressEdit = !$scope.view.addressEdit;
            $scope.initPatientModel(force);
        };

        $scope.changeEditPhoneSection = function(force) {
            $scope.view.phoneEdit = !$scope.view.phoneEdit;
            $scope.initPatientModel(force);
        };

        $scope.setContactType = function(address) {
            _.forEach($scope.view.addressCodes, function(entry) {
                if(address.use === entry.code) {
                    address.contactType = entry;
                }
            });
        };


        //TODO Check for bad response, SHOW IT in the GUI
        $scope.updateProfile = function() {
            var model = $scope.model;
            var patient = model.patient;
            patient.name = [{ given: [model.firstName, model.middleName], family: [model.lastName] }];
            patient.telecom = [];
            patient.telecom = patient.telecom.concat(model.phones);
            patient.telecom.push({system: $scope.contactSystemCodes.email, value: model.primaryEmail});
            patient.maritalStatus = {coding: [model.maritalStatus]};
            patient.birthDate = model.dateOfBirth.toISOString();
            patient.gender = model.gender;

            dreFrontendFhirService.update(patient.resourceType, patient.id, patient).then(function (response) {
                $scope.changeEditProfileSection(true);
            });
        };

        $scope.updateAddress = function() {
            dreFrontendFhirService.update($scope.model.patient.resourceType, $scope.model.patient.id, $scope.model.patient).then(function (response) {
               $scope.changeEditAddressSection(true);
            });
        };

        $scope.updatePhone = function() {
            //patient.telecom = patient.telecom.concat(model.phones);
            dreFrontendFhirService.update($scope.model.patient.resourceType, $scope.model.patient.id, $scope.model.patient).then(function (response) {
                $scope.changeEditPhoneSection(true);
            });
        };

        $scope.scroll = function(link) {
            var old = $location.hash();
            $location.hash(link);
            $anchorScroll();
            $location.hash(old);
        };
  });
