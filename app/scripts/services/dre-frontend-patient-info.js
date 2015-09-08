'use strict';

/**
 * @ngdoc service
 * @name dreFrontendApp.patientInfo
 * @description
 * # patientInfo
 * Service in the dreFrontendApp.
 */
angular.module('dreFrontendApp')
    .service('dreFrontEndPatientInfo', function ($rootScope, $q, dreFrontendPatient) {
        var patientData = null;
        var patientId = null;
        var self = {
            getPatientId: function () {
                return patientId;
            },
            setPatientId: function (id) {
                patientId = id;
            },
            clearPatientData: function () {
                patientData = null;
                patientId = null;
            },
            getPatientData: function (force) {
                if (angular.isObject(patientData) && !force) {
                    return $q.when(patientData);
                }
                return dreFrontendPatient.getById(patientId).then(function (d) {
                    patientData = d;
                    return patientData;
                });
            }
        };
        return self;
    });
