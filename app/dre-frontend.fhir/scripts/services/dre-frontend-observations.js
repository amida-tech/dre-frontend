"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendObservations', function (dreFrontendFhirService, fhirEnv, _, FhirObservation) {
        var exclude_codes = _.flatten(_.valuesIn(fhirEnv.vital_signs));

        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirObservation(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirObservation(entry);
        }


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

            return dreFrontendFhirService.search("Observation", params)
                .then(proceedBundle);
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
            res = res && (resource.code && _.intersection(_.pluck(resource.code.coding, "code"), exclude_codes).length === 0);
            res = res && (resource.category && _.intersection(_.pluck(resource.category.coding, "code"), 'social-history') === 0);
            if (res) console.log(resource);
            return res;
        }

        return {
            getSocialHistory: function (patient_id) {
                return dreFrontendFhirService.search("Observation", {patient: patient_id, category: 'social-history'})
                    .then(proceedBundle);
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
                return dreFrontendFhirService.search("Observation", {patient: patient_id})
                    .then(proceedBundle);
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Observation', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Observation')
                    .then(proceedBundle);
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

                        return proceedBundle(bundle);
                    });
            },
            getVitalSigns: function (patient_id, count) {
                return searchData("vital_signs", patient_id, count);
            }
        };
    });
