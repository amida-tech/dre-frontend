"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendTestresults', function (dreFrontendFhirService, $q) {

        function _initResults(response) {
            angular.forEach(response.entry, function (v, k) {
                response.entry[k] = new Testresult(v);
            });
            return new Testresults(response);
        }

        function Testresult(data) {
            this.setData(data);
        }

        Testresult.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };

        Testresult.prototype.getObservations = function () {
            var result_data = [];
            angular.forEach(this.result, function (res, key) {

            });
            return this.load();
        };

        function Testresults(data) {
            if (data)
                angular.extend(this, data);
        }

        Testresults.prototype.getResults = function () {
            return this;
        };

        var testresult = {
            getById: function (id) {
                return dreFrontendFhirService.read('DiagnosticReport', id)
                    .then(function (response) {
                        return new Testresult(response);
                    });
            },

            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search('DiagnosticReport', {
                    "patient": patient_id,
                    "_sort:desc": "date"
                })
                    .then(_initResults);
            },

            getAll: function () {
                return dreFrontendFhirService.read('DiagnosticReport')
                    .then(_initResults);
            }
        };

        return testresult;
    });
