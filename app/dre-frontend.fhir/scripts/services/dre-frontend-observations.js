"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendObservations', function (dreFrontendFhirService, fhirEnv, _, FhirResource) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirResource(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirResource(entry);
        }


        function searchData(code_name, patient_id, count) {
            var codes = (code_name == "vital_signs") ? _.flatten(_.valuesIn(fhirEnv.vital_signs)) : fhirEnv.vital_signs[code_name];

            var params = {
                "code": codes.join(','),
                "subject:Patient": patient_id,
                "_sort:desc": "date"
            };

            if (count)
                params._count = count;

            return dreFrontendFhirService.search("Observation", params)
                .then(proceedEntry);
        }

        return {
            getSocialHistory: function (patient_id) {
                return dreFrontendFhirService.search("Observation", {patient: patient_id, category: 'social-history'})
                    .then(proceedBundle);
            },
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
                return searchData("systolic_blood_pressure", patient_id, 1);
            },
            getBloodPressureDiastolicHistory: function (patient_id, count) {
                return searchData("diastolic_blood_pressure", patient_id);
            },
            getLastBloodPressureDiastolic: function (patient_id) {
                return searchData("diastolic_blood_pressure", patient_id, 1);
            },
            getWeightHistory: function (patient_id, count) {
                return searchData("body_weight", patient_id);
            },
            getLastWeight: function (patient_id) {
                return searchData("body_weight", patient_id, 1);
            },
            getHeightHistory: function (patient_id, count) {
                return searchData("body_height", patient_id);
            },
            getLastHeight: function (patient_id) {
                return searchData("body_height", patient_id, 1);
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
                        var exclude_codes = _.flatten(_.valuesIn(fhirEnv.vital_signs));

                        angular.forEach(bundle.entry, function (resource) {
                            /* exclude weight, height, blood pressures & BMI resources */
                            if (resource.code && _.intersection(_.pluck(resource.code.coding, "code"), exclude_codes).length == 0)
                                new_entry.push(resource);
                        });

                        bundle.entry = new_entry;

                        return proceedBundle(bundle);
                    });
            },
            getVitalSigns: function (patient_id, count) {
                return searchData("vital_signs", patient_id);
            }
        };
    });
