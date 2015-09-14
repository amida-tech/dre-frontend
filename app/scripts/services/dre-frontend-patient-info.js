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
                    patientIdPromise = $q.defer();
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
                patientIdPromise.reject('logout');
                patientIdPromise = null;
            },
            getPatientData: function (force) {
                //if patient id is not defined, wait it, and only then return patient Info
                if(!patientId){
                    return self.getPatientId().then(function(){
                        return self.getPatientData(force);
                    });
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
