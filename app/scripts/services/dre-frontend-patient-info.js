'use strict';

/**
 * @ngdoc service
 * @name dreFrontendApp.patientInfo
 * @description
 * # patientInfo
 * Service in the dreFrontendApp.
 */
angular.module('dreFrontendApp')
    .factory('dreFrontendPatientInfoService', function ($rootScope, $q, dreFrontendPatient) {
        var patientData = null;
        var patientPromise = null;
        var patientId = null;

        this.getPatientId = function () {
            if (patientId) {
                return $q.resolve(patientId);
            } else {
                return $q.reject('not logged in');
            }
        };

        this.getPatientData = function (force) {
            var res;
            if (patientData && !force) {
                res = $q.resolve(patientData);
            } else {
                if (!patientPromise || force) {
                    patientPromise = this.getPatientId()
                        .then(dreFrontendPatient.getById)
                        .then(function (data) {
                            patientData = data;
                            patientPromise = null;
                            return patientData;
                        })
                        .finally(function () {
                            patientPromise = null;
                        });
                }
                res = patientPromise;
            }
            return res;
        };

        this.setPatientId = function (id) {
            patientId = id;
            return this.getPatientData(true);
        };

        this.clearPatientData = function () {
            patientData = null;
            patientPromise = null;
            patientId = null;
            return $q.resolve(true);
        };

        return this;
    });
