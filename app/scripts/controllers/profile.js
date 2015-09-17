'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('ProfileCtrl', function ($scope, _, dreFrontEndPatientInfo, dreFrontendGlobals, fhirEnv, dreFrontendFhirService) {
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
            maritalStatus: ""
        };
        $scope.edit = false;
        $scope.monthNames = dreFrontendGlobals.monthNames;
        $scope.maritalStatuses = fhirEnv.maritalStatuses;
        $scope.genders = fhirEnv.gender;

        $scope.initPatientModel = function(force) {
            dreFrontEndPatientInfo.getPatientData(force).then(function (patient) {
                $scope.model.patient = patient;
                if(patient.contact.length != 0) {
                    var contact = patient.contact[0];
                    if(contact.name != undefined) {
                        if(contact.name.family != undefined) {
                            $scope.model.lastName = contact.name.given[0];
                        }
                        if(contact.name.given != undefined) {
                            $scope.model.firstName = contact.name.family[0].split(" ")[0];
                            $scope.model.middleName = contact.name.family[0].split(" ")[1];
                        }
                    }
                    if(contact.telecom != undefined) {
                        if(contact.telecom.length != 0) {
                            _.forEach(contact.telecom, function(entry) {
                                if(entry.system == "email") {
                                    $scope.model.primaryEmail = entry.value;
                                }
                            })
                        }
                    }
                }
                if(patient.maritalStatus != undefined) {
                    if(patient.maritalStatus.coding.length != 0) {
                        if(patient.maritalStatus.coding[0].display != undefined) {
                            $scope.model.maritalStatus = patient.maritalStatus.coding[0].display
                        }
                    }
                }
                if(patient.birthDate != undefined) {
                    $scope.model.dateOfBirth = new Date(patient.birthDate);
                }
                if(patient.gender != undefined) {
                    $scope.model.gender = patient.gender;
                }
            });
        };
        $scope.initPatientModel(true);

        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            $scope.model.patientId = patientId;
        });

        $scope.changeEdit = function() {
            $scope.edit = !$scope.edit;
            $scope.initPatientModel(false);
        };

        $scope.updateProfile = function() {
            var model = $scope.model;
            var patient = model.patient;
            var contact = patient.contact[0];

            contact.name.given[0] = model.lastName;
            contact.name.family = model.firstName + " " + (model.middleName == undefined ? "" : model.middleName == undefined);

            var hasEmail = false;
            if(patient.telecom != undefined) {
                if(patient.telecom.length != 0) {
                    _.forEach(patient.telecom, function(entry) {
                        if(entry.system == "email") {
                            entry.value = model.primaryEmail;
                            hasEmail = true;
                        }
                    });
                }
            } else {
                patient.telecom = [];
            }
            if(!hasEmail) {
                var entry = {};
                entry.system = "email";
                entry.value = model.primaryEmail;
                patient.telecom.push(entry);
            }

            if(patient.maritalStatus != undefined) {
                patient.maritalStatus.coding = [];
                patient.maritalStatus.coding.push(model.maritalStatus);
            } else {
                patient.maritalStatus = {};
                patient.maritalStatus.coding = [];
                patient.maritalStatus.coding.push(model.maritalStatus);
            }

            patient.birthDate = model.dateOfBirth.toISOString();

            patient.gender = model.gender;

            dreFrontendFhirService.update(patient.resourceType, patient.id, patient).then(function (r) {
                $scope.initPatientModel(true);
                //$scope.response = r;
            });


        }




  });
