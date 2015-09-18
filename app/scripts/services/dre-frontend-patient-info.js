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
        var patientIdPromise = null;
        var self = {
            getPatientId: function () {
                if(patientId){
                    return $q.when(patientId);
                }else{
                    if(patientIdPromise == null){
                        patientIdPromise = $q.defer();
                    }
                    return patientIdPromise.promise;
                }
            },
            setPatientId: function (id) {
                patientId = id;
                if(patientIdPromise){
                    patientIdPromise.resolve(patientId);
                    patientIdPromise = null;
                }
            },
            clearPatientData: function () {
                patientData = null;
                patientId = null;
                if(patientIdPromise){
                    patientIdPromise.reject('logout');
                    patientIdPromise = null;
                }
            },
            getPatientData: function (force) {
                return self.getPatientId().then(function(patientId){
                    if (angular.isObject(patientData) && !force) {
                        patientDataRequest = null;
                        return $q.when(patientData);
                    }
                    if (angular.isObject(patientDataRequest) && !force) {
                        return patientDataRequest;
                    }
                    patientDataRequest = dreFrontendPatient.getById(patientId).then(function (d) {
                        patientData = d;
                        return patientData;
                    });
                    return patientDataRequest;
                });
            }
        };
        return self;
    });
