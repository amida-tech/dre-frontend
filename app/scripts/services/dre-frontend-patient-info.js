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
        var patientDataRequest = null;
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
                if(!patientId){
                    return $q.reject('patientId is null');
                }
                if (angular.isObject(patientData) && !force) {
                    return $q.when(patientData);
                }
                if (angular.isObject(patientDataRequest) && !force) {
                    return patientDataRequest;
                }
                patientDataRequest = dreFrontendPatient.getById(patientId).then(function (d) {
                    patientData = d;
                    patientDataRequest = null;
                    return patientData;
                });
                return patientDataRequest;
            }
        };
        return self;
    });
