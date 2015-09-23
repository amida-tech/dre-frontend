'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ImmunizationsCtrl
 * @description
 * # ImmunizationsCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ImmunizationsCtrl', function ($scope, dreFrontendImmunizations, dreFrontEndPatientInfo, _, dreFrontendGlobals) {
        $scope.model = {
            lastUpdate: new Date(),
            userName: '',
            immunizations: []
        };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            dreFrontendImmunizations.getByPatientId(patientId).then(function(immunizations) {
                _.forEach(immunizations.entry, function(entry){
                    var immunization = {
                        rawEntry: entry,
                        type: entry.resourceType,
                        additionalInfo: '',
                        title: '',
                        startDate: entry.date != undefined ? entry.date : null,
                        endDate: null,
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                    };
                    if(angular.isDefined(entry.vaccineType)) {
                        if(angular.isDefined(entry.vaccineType.coding)) {
                            if(entry.vaccineType.coding.length != 0) {
                                immunization.title = entry.vaccineType.coding[0].display;
                            }
                        }
                    }
                    $scope.model.immunizations.push(immunization);
                });
            })
        });
    });
