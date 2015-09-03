"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendObservations', function (dreFrontendFhirService, fhirEnv) {

        function Observations(data) {
            this.setData(data);
        }

        Observations.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };

        function searchData(code_name, patient_id, count) {
            var params = {
                "code": fhirEnv.codes[code_name].join(','),
                "subject:Patient": patient_id,
                "_sort:desc": "date"
            };

            if (count)
                params._count = count;

            return dreFrontendFhirService.search("Observation", params)
                .then(function (response) {
                    return new Observations(response);
                });
        }

        var observations = {
            getBMIHistory: function (patient_id, count) {
                return searchData("bmi", patient_id);
            },
            getLastBMI: function (patient_id) {
                return searchData("bmi", patient_id, 1);
            },
            getBloodPressureSystolicHistory: function (patient_id, count) {
                return searchData("systolic_blood_pressure", patient_id);
            },
            getLastBloodPressureSystolic: function (patient_id) {
                return searchData("systolic_blood_pressure", patient_id,1);
            },
            getBloodPressureDiastolicHistory: function (patient_id, count) {
                return searchData("diastolic_blood_pressure", patient_id);
            },
            getLastBloodPressureDiastolic: function (patient_id) {
                return searchData("diastolic_blood_pressure", patient_id,1);
            },
            getWeightHistory: function (patient_id, count) {
                return searchData("body_weight", patient_id);
            },
            getLastWeight: function (patient_id) {
                return searchData("body_weight", patient_id,1);
            },
            getHeightHistory: function (patient_id, count) {
                return searchData("body_height", patient_id);
            },
            getLastHeight: function (patient_id) {
                return searchData("body_height", patient_id,1);
            },
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Observation", {patient: patient_id})
                    .then(function (response) {
                        return new Observations(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Observation', id)
                    .then(function (response) {
                        return new Observations(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('Observation')
                    .then(function (response) {
                        return new Observations(response);
                    });
            },
            getTestResults: function (patient_id, count) {
                return dreFrontendFhirService.search("Observation", {patient: patient_id, _count: count || 50})
                    .then(function (response) {
                        var new_entry = [];
                        var exclude_codes = _.flatten(_.valuesIn(fhirEnv.codes));

                        angular.forEach(response.entry, function (resource) {
                            /* exclude weight, height, blood pressures & BMI resources */
                            if (_.intersection(_.pluck(resource.code.coding, "code"), exclude_codes).length == 0)
                                new_entry.push(resource);
                        });

                        response.entry = new_entry;

                        return new Observations(response);
                    });
            }
        };

        return observations;
    });
