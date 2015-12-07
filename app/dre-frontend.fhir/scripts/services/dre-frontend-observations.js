"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendObservations', function (dreFrontendFhirService, fhirEnv, _) {
        var exclude_codes = _.flatten(_.valuesIn(fhirEnv.vital_signs));

        function searchData(code_name, patient_id, count) {
            var codes = (code_name === "vital_signs") ? _.flatten(_.valuesIn(fhirEnv.vital_signs)) : fhirEnv.vital_signs[code_name];

            var params = {
                "code": codes.join(','),
                "patient": patient_id,
                "_sort:desc": "date"
            };

            if (count) {
                params._count = count;
            }

            return dreFrontendFhirService.search("Observation", params);
        }

        function getFirst(bundle) {
            if (bundle.entry.length > 0) {
                return bundle.entry[0];
            } else {
                return null;
            }
        }

        function isTestResult(resource) {
            var res = true;
            if (resource.code) {
                res = res && (_.intersection(_.pluck(resource.code.coding, "code"), exclude_codes).length === 0);
            }
            if (resource.category) {
                res = res && (_.intersection(_.pluck(resource.category.coding, "code"), 'social-history') === 0);
            }
            return res;
        }

        return {
            getSocialHistory: function (patient_id) {
                return dreFrontendFhirService.search("Observation", {patient: patient_id, category: 'social-history'});
            },
            getBMIHistory: function (patient_id, count) {
                return searchData("bmi", patient_id, count);
            },
            getLastBMI: function (patient_id) {
                return searchData("bmi", patient_id, 1)
                    .then(getFirst);
            },
            getBloodPressureSystolicHistory: function (patient_id, count) {
                return searchData("systolic_blood_pressure", patient_id, count);
            },
            getLastBloodPressureSystolic: function (patient_id) {
                return searchData("systolic_blood_pressure", patient_id, 1)
                    .then(getFirst);
            },
            getBloodPressureDiastolicHistory: function (patient_id, count) {
                return searchData("diastolic_blood_pressure", patient_id, count);
            },
            getLastBloodPressureDiastolic: function (patient_id) {
                return searchData("diastolic_blood_pressure", patient_id, 1)
                    .then(getFirst);
            },
            getWeightHistory: function (patient_id, count) {
                return searchData("body_weight", patient_id, count);
            },
            getLastWeight: function (patient_id) {
                return searchData("body_weight", patient_id, 1)
                    .then(getFirst);
            },
            getHeightHistory: function (patient_id, count) {
                return searchData("body_height", patient_id, count);
            },
            getLastHeight: function (patient_id) {
                return searchData("body_height", patient_id, 1)
                    .then(getFirst);
            },
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Observation", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Observation', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Observation');
            },
            getTestResults: function (patient_id, count) {
                return dreFrontendFhirService.search("Observation", {patient: patient_id, _count: count || 50})
                    .then(function (bundle) {
                        var new_entry = [];

                        angular.forEach(bundle.entry, function (resource) {
                            /* exclude weight, height, blood pressures & BMI resources */
                            if (isTestResult(resource)) {
                                new_entry.push(resource);
                            }
                        });

                        bundle.entry = new_entry;

                        return bundle;
                    });
            },
            getVitalSigns: function (patient_id, count) {
                return searchData("vital_signs", patient_id, count);
            }
        };
    });
