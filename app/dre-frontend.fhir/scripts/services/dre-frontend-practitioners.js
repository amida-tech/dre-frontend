"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendPractitioners', function (dreFrontendFhirService, FhirPractitioner, $q) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirPractitioner(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirPractitioner(entry);
        }

        function convertNpiAddress(_use, _type, addr) {
            return {
                use: _use,
                type: _type,
                line: addr.address_line,
                city: addr.city,
                state: addr.state,
                postalCode: addr.zip,
                country: addr.country_code
            };
        }

        function addNpitelecom(dest, addr) {
            var _fields = ['fax','phone'];
            for(var n=0; n<_fields.length; n++) {
                if (addr[_fields[n]]) {
                    dest.push({system:_fields[n], value: addr[_fields[n]]});
                }
            }
        }

        return {
            getById: function (id) {
                return dreFrontendFhirService.read('Practitioner', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Practitioner')
                    .then(proceedBundle);
            },
            getByNpiData: function (data,forceCreate) {
                return dreFrontendFhirService.search('Practitioner', {identifier: "NPI|" + data.npi})
                    .then(function (bundle) {
                        var result;

                        if (bundle.entry.length < 1) {
                            if (forceCreate) {
                                var obj = new FhirPractitioner();
                                obj.setBaseTemplate();
                                angular.extend(obj, {
                                    name: {
                                        use: 'official',
                                        given: [data.first_name, data.middle_name],
                                        prefix: [data.name_prefix],
                                        family: [data.last_name],
                                        suffix: [data.credential]
                                    },
                                    gender: data.gender,
                                    identifier: {
                                        system: "NPI",
                                        value: data.npi
                                    }
                                });
                                if (data.business_address) {
                                    obj.address.push(convertNpiAddress('work','postal',data.business_address));

                                    addNpitelecom(obj.telecom, data.business_address);
                                }
                                if (data.practice_address) {
                                    obj.address.push(convertNpiAddress('work','physical',data.practice_address));
                                    addNpitelecom(obj.telecom, data.practice_address);
                                }
                                result = obj.save();
                            } else {
                                result = $q.reject('No Practitioner data found');
                            }
                        } else {
                            result = new FhirPractitioner(bundle.entry[0]);
                        }
                        return result;
                    });
            }
        };
    });
