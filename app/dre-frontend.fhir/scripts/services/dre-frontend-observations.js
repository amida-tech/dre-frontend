"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendObservations', function (dreFrontendFhirService, fhirEnv, _) {

        function Observations(data) {
            this.setData(data);
        }

        Observations.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };

        function searchData(code_name, patient_id, count) {
            var codes = (code_name == "vital_signs") ? _.flatten(_.valuesIn(fhirEnv.vital_signs)):fhirEnv.vital_signs[code_name];

            var params = {
                "code": codes.join(','),
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
            getSocialHistory: function(patient_id){
                return dreFrontendFhirService.search("Observation", {patient: patient_id})
                    .then(function (response) {
                        return new Observations({
                            "entry":[
                                {
                                    "resourceType":"Observation",
                                    "id":"18467",
                                    "meta":{
                                        "versionId":"1",
                                        "lastUpdated":"2015-09-11T15:51:59.149+03:00"
                                    },
                                    "code":{
                                        "coding":[
                                            {
                                                "system":"http://loinc.org",
                                                "code":"3141-9",
                                                "display":"Tobacco use and exposure"
                                            }
                                        ]
                                    },
                                    "valueQuantity":{
                                        "value":160,
                                        "units":"[lb_av]"
                                    },
                                    "appliesDateTime":"2012-10-02",
                                    "status":"completed",
                                    "identifier":[
                                        {
                                            "value":"1.3.6.1.4.1.22812.3.99930.3.4.6"
                                        },
                                        {
                                            "value":"1.3.6.1.4.1.22812.3.99930.3.4.6"
                                        }
                                    ],
                                    "subject":{
                                        "reference":"Patient/test"
                                    }
                                },
                                {
                                    "resourceType":"Observation",
                                    "id":"18467",
                                    "meta":{
                                        "versionId":"1",
                                        "lastUpdated":"2015-09-11T15:51:59.149+03:00"
                                    },
                                    "code":{
                                        "coding":[
                                            {
                                                "system":"http://loinc.org",
                                                "code":"3141-9",
                                                "display":"Tobacco use and exposure"
                                            }
                                        ]
                                    },
                                    "valueQuantity":{
                                        "value":160,
                                        "units":"[lb_av]"
                                    },
                                    "appliesDateTime":"2012-10-01",
                                    "status":"inactive",
                                    "identifier":[
                                        {
                                            "value":"1.3.6.1.4.1.22812.3.99930.3.4.6"
                                        },
                                        {
                                            "value":"1.3.6.1.4.1.22812.3.99930.3.4.6"
                                        }
                                    ],
                                    "subject":{
                                        "reference":"Patient/test"
                                    }
                                }
                            ]
                        });
                    });
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
                        var exclude_codes = _.flatten(_.valuesIn(fhirEnv.vital_signs));

                        angular.forEach(response.entry, function (resource) {
                            /* exclude weight, height, blood pressures & BMI resources */
                            if (resource.code && _.intersection(_.pluck(resource.code.coding, "code"), exclude_codes).length == 0)
                                new_entry.push(resource);
                        });

                        response.entry = new_entry;

                        return new Observations(response);
                    });
            },
            getVitalSigns: function(patient_id, count) {
                return searchData("vital_signs", patient_id);
            }
        };

        return observations;
    });
