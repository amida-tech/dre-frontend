'use strict';

angular.module('dreFrontend.mocks')
    .service('dreFrontendFhirMocks', function ($log, $q, $rootScope, $httpBackend) {
        return function () {
            $log.debug('start configure fhir mocks');

            //isAuthenticated
            $httpBackend.whenGET('mock/fhir/Patient/3768').respond(function (method, url, data) {
                return [
                    200,
                    {
                        "resourceType": "Patient",
                        "id": "3768",
                        "meta": {
                            "versionId": "1",
                            "lastUpdated": "2015-08-11T23:31:46.699+03:00"
                        },
                        "extension": [{
                            "url": "http://hl7.org/fhir/StructureDefinition/us-core-religion",
                            "valueCodeableConcept": {
                                "coding": [{
                                    "system": "urn:oid:2.16.840.1.113883.5.1076",
                                    "code": "1013",
                                    "display": "Christian (non-Catholic, non-specific)"
                                }
                                ]
                            }
                        }, {
                            "url": "http://hl7.org/fhir/Profile/us-core#race",
                            "valueCodeableConcept": {
                                "coding": [{
                                    "system": "urn:oid:2.16.840.1.113883.6.238",
                                    "code": "2106-3",
                                    "display": "White"
                                }
                                ]
                            }
                        }, {
                            "url": "http://hl7.org/fhir/Profile/us-core#ethnicity",
                            "valueCodeableConcept": {
                                "coding": [{
                                    "system": "urn:oid:2.16.840.1.113883.6.238",
                                    "code": "2186-5",
                                    "display": "Not Hispanic or Latino"
                                }
                                ]
                            }
                        }, {
                            "url": "http://hl7.org/fhir/StructureDefinition/birthPlace",
                            "valueAddress": {
                                "city": "Beaverton",
                                "state": "OR",
                                "postalCode": "97867",
                                "country": "US"
                            }
                        }
                        ],
                        "text": {
                            "status": "generated",
                            "div": "<div><div class=\"hapiHeaderText\"> Isabella Isa <b>JONES </b></div><table class=\"hapiPropertyTable\"><tbody><tr><td>Identifier</td><td>998991</td></tr><tr><td>Address</td><td><span>1357 Amber Drive </span><br /><span>Beaverton </span><span>OR </span><span>US </span></td></tr><tr><td>Date of birth</td><td><span>01 May 1975</span></td></tr></tbody></table></div>"
                        },
                        "identifier": [{
                            "system": "urn:oid:2.16.840.1.113883.19.5.99999.2",
                            "value": "998991"
                        }, {
                            "system": "urn:oid:2.16.840.1.113883.4.1",
                            "value": "111-00-2330"
                        }
                        ],
                        "name": [{
                            "use": "L",
                            "family": [
                                "Jones"
                            ],
                            "given": [
                                "Isabella",
                                "Isa"
                            ]
                        }
                        ],
                        "telecom": [{
                            "value": "tel:(816)276-6909",
                            "use": "HP"
                        }
                        ],
                        "gender": "F",
                        "birthDate": "1975-05-01",
                        "address": [{
                            "use": "HP",
                            "line": [
                                "1357 Amber Drive"
                            ],
                            "city": "Beaverton",
                            "state": "OR",
                            "postalCode": "97867",
                            "country": "US"
                        }
                        ],
                        "maritalStatus": {
                            "coding": [{
                                "system": "urn:oid:2.16.840.1.113883.5.2",
                                "code": "M",
                                "display": "Married"
                            }
                            ]
                        },
                        "contact": [{
                            "relationship": [{
                                "coding": [{
                                    "system": "urn:oid:2.16.840.1.113883.5.111",
                                    "code": "PRN",
                                    "display": "Parent"
                                }
                                ]
                            }
                            ],
                            "name": {
                                "family": [
                                    "Jones"
                                ],
                                "given": [
                                    "Ralph"
                                ]
                            },
                            "telecom": [{
                                "value": "tel:(816)276-6909",
                                "use": "HP"
                            }
                            ],
                            "address": {
                                "line": [
                                    "1357 Amber Drive"
                                ],
                                "city": "Beaverton",
                                "state": "OR",
                                "postalCode": "97867",
                                "country": "US"
                            }
                        }
                        ],
                        "communication": [{
                            "language": {
                                "coding": [{
                                    "code": "en"
                                }
                                ]
                            },
                            "preferred": true
                        }
                        ],
                        "managingOrganization": {
                            "reference": "Organization/3769"
                        }
                    },
                    {}
                ];
            });

            $httpBackend.whenGET('mock/fhir/Claim/108717').respond(function (method, url, data) {
                return [
                    200,
                    {
                        "resourceType": "Claim",
                        "id": "108717",
                        "meta": {
                            "versionId": "5",
                            "lastUpdated": "2015-10-14T15:01:00.879-04:00"
                        },
                        "type": "professional",
                        "identifier": [
                            {
                                "value": "522"
                            }
                        ],
                        "created": "2014-09-01",
                        "target": {
                            "reference": "Organization/245"
                        },
                        "provider": {
                            "reference": "Practitioner/563"
                        },
                        "organization": {
                            "reference": "Organization/566"
                        },
                        "use": "complete",
                        "priority": {
                            "code": "stat"
                        },
                        "payee": {
                            "type": {
                                "code": "provider"
                            }
                        },
                        "diagnosis": [
                            {
                                "sequence": 1,
                                "diagnosis": {
                                    "code": "654456"
                                }
                            }
                        ],
                        "patient": {
                            "reference": "Patient/test"
                        },
                        "coverage": [
                            {
                                "sequence": 1,
                                "focal": true,
                                "coverage": {
                                    "reference": "Coverage/567"
                                },
                                "relationship": {
                                    "code": "self"
                                }
                            }
                        ],
                        "item": [
                            {
                                "sequence": 1,
                                "type": {
                                    "code": "service"
                                },
                                "provider": {
                                    "reference": "Practitioner/276"
                                },
                                "service": {
                                    "system": "http://hl7.org/fhir/ex-pharmaservice",
                                    "code": "smokecess"
                                },
                                "serviceDate": "2013-02-01",
                                "unitPrice": {
                                    "value": 740,
                                    "system": "urn:std:iso:4217",
                                    "code": "USD"
                                },
                                "net": {
                                    "value": 740,
                                    "system": "urn:std:iso:4217",
                                    "code": "USD"
                                }
                            }
                        ]
                    },
                    {}
                ]
            });
        }
    });
