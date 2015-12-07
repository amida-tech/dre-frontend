"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedication', function (_, dreFrontendFhirService, $q, FhirMedication, dreFrontendGlobals) {
        var _rxnormSystem = _.findKey(dreFrontendGlobals.systemCodes, function (v) {
            return v === 'RxNORM';
        });

        return {
            getById: function (id) {
                return dreFrontendFhirService.read('Medication', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Medication');
            },
            getByCode: function (code) {
                return dreFrontendFhirService.search('Medication', {code: code});
            },
            getByRxNormData: function (data, forceCreate) {
                return dreFrontendFhirService.search('Medication', {code: _rxnormSystem+"|" + data.rxcui})
                    .then(function (bundle) {
                        var result;

                        if (bundle.entry.length < 1) {
                            if (forceCreate) {
                                var medication = new FhirMedication();
                                medication.setBaseTemplate();
                                angular.extend(medication, {
                                    code: {
                                        coding: [
                                            {
                                                system: _rxnormSystem,
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
                            result = new FhirMedication(bundle.entry[0]);
                        }
                        return result;
                    });
            }
        };
    });
