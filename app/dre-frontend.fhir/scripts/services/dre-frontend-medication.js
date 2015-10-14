"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedication', function (dreFrontendFhirService, $q, $log) {

        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new Medication(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new Medication(entry);
        }

        function setData(obj, data) {
            if (data)
                angular.extend(obj, data);
        }

        function Medication(data) {
            setData(this, data);
        }

        Medication.prototype.setBaseTemplate = function () {
            angular.extend(this, {
                "resourceType": "Medication",
                "code": {}, // Codes that identify this medication CodeableConcept
                "isBrand": null, // True if a brand <boolean>
                "manufacturer": {} // Manufacturer of the item Reference(Organization)
            });
        };

        Medication.prototype.save = function () {
            var _data = angular.fromJson(angular.toJson(this));
            if (_data.id) {
                return dreFrontendFhirService.update(_data.resourceType, _data.id, _data)
                    .then(proceedEntry);
            } else {
                return dreFrontendFhirService.create(_data.resourceType, _data)
                    .then(proceedEntry);
            }
        };

        var medications = {
            getById: function (id) {
                return dreFrontendFhirService.read('Medication', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Medication')
                    .then(proceedBundle);
            },
            getByCode: function (code) {
                return dreFrontendFhirService.search('Medication', {code: code})
                    .then(proceedBundle);
            },
            getByRxNormData: function (data, forceCreate) {
                return dreFrontendFhirService.search('Medication', {code: "RxNorm|" + data.rxcui})
                    .then(function (bundle) {
                        var result;

                        if (bundle.entry.length < 1) {
                            if (forceCreate) {
                                var medication = new Medication();
                                medication.setBaseTemplate();
                                angular.extend(medication, {
                                    code: {
                                        coding: [
                                            {
                                                system: "RxNorm",
                                                code: data.rxcui,
                                                display: data.name
                                            }
                                        ],
                                        text: data
                                    }
                                });
                                result = medication.save();
                            } else {
                                result = $q.reject('No medication data found');
                            }
                        } else {
                            result = new Medication(bundle.entry[0]);
                        }
                        return result;
                    });
            }
        };

        return medications;
    });
