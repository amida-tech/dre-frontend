'use strict';

angular.module('dreFrontend.mocks')
    .service('dreFrontendFhirMocks', function ($log, $q, $rootScope, $httpBackend) {

        return function () {
            $log.debug('start configure fhir mocks');
            var _base_url = 'mock/fhir/';
            var data = [
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
                {
                    "resourceType": "ValueSet",
                    "id": "contact-point-use",
                    "meta": {
                        "lastUpdated": "2015-09-30T23:39:40.637+10:00",
                        "profile": [
                            "http://hl7.org/fhir/StructureDefinition/valueset-shareable-definition"
                        ]
                    },
                    "text": {
                        "status": "generated",
                        "div": "<div><h2>ContactPointUse</h2><p>Use of contact point</p><p>This value set has an inline code system http://hl7.org/fhir/contact-point-use, which defines the following codes:</p><table class=\"codes\"><tr><td><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td>home<a name=\"home\"> </a></td><td>Home</td><td>A communication contact point at a home; attempted contacts for business purposes might intrude privacy and chances are one will contact family or other household members instead of the person one wishes to call. Typically used with urgent cases, or if no other contacts are available.</td></tr><tr><td>work<a name=\"work\"> </a></td><td>Work</td><td>An office contact point. First choice for business related contacts during business hours.</td></tr><tr><td>temp<a name=\"temp\"> </a></td><td>Temp</td><td>A temporary contact point. The period can provide more detailed information.</td></tr><tr><td>old<a name=\"old\"> </a></td><td>Old</td><td>This contact point is no longer in use (or was never correct, but retained for records).</td></tr><tr><td>mobile<a name=\"mobile\"> </a></td><td>Mobile</td><td>A telecommunication device that moves and stays with its owner. May have characteristics of all other use codes, suitable for urgent matters, not the first choice for routine business.</td></tr></table></div>"
                    },
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                            "valueUri": "urn:oid:2.16.840.1.113883.4.642.2.40"
                        }
                    ],
                    "url": "http://hl7.org/fhir/ValueSet/contact-point-use",
                    "version": "1.0.1",
                    "name": "ContactPointUse",
                    "status": "draft",
                    "experimental": false,
                    "publisher": "HL7 (FHIR Project)",
                    "contact": [
                        {
                            "telecom": [
                                {
                                    "system": "other",
                                    "value": "http://hl7.org/fhir"
                                },
                                {
                                    "system": "email",
                                    "value": "fhir@lists.hl7.org"
                                }
                            ]
                        }
                    ],
                    "date": "2015-09-30T23:39:40+10:00",
                    "description": "Use of contact point",
                    "codeSystem": {
                        "extension": [
                            {
                                "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                                "valueUri": "urn:oid:2.16.840.1.113883.4.642.1.40"
                            }
                        ],
                        "system": "http://hl7.org/fhir/contact-point-use",
                        "version": "1.0.1",
                        "caseSensitive": true,
                        "concept": [
                            {
                                "code": "home",
                                "display": "Home",
                                "definition": "A communication contact point at a home; attempted contacts for business purposes might intrude privacy and chances are one will contact family or other household members instead of the person one wishes to call. Typically used with urgent cases, or if no other contacts are available."
                            },
                            {
                                "code": "work",
                                "display": "Work",
                                "definition": "An office contact point. First choice for business related contacts during business hours."
                            },
                            {
                                "code": "temp",
                                "display": "Temp",
                                "definition": "A temporary contact point. The period can provide more detailed information."
                            },
                            {
                                "code": "old",
                                "display": "Old",
                                "definition": "This contact point is no longer in use (or was never correct, but retained for records)."
                            },
                            {
                                "code": "mobile",
                                "display": "Mobile",
                                "definition": "A telecommunication device that moves and stays with its owner. May have characteristics of all other use codes, suitable for urgent matters, not the first choice for routine business."
                            }
                        ]
                    }
                },
                {
                    "resourceType": "ValueSet",
                    "id": "address-use",
                    "meta": {
                        "lastUpdated": "2015-09-30T23:39:40.637+10:00",
                        "profile": [
                            "http://hl7.org/fhir/StructureDefinition/valueset-shareable-definition"
                        ]
                    },
                    "text": {
                        "status": "generated",
                        "div": "<div><h2>AddressUse</h2><p>The use of an address<br/><br/>The use of an address (home / work / etc.).</p><p>This value set has an inline code system http://hl7.org/fhir/address-use, which defines the following codes:</p><table class=\"codes\"><tr><td><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td>home<a name=\"home\"> </a></td><td>Home</td><td>A communication address at a home.</td></tr><tr><td>work<a name=\"work\"> </a></td><td>Work</td><td>An office address. First choice for business related contacts during business hours.</td></tr><tr><td>temp<a name=\"temp\"> </a></td><td>Temporary</td><td>A temporary address. The period can provide more detailed information.</td></tr><tr><td>old<a name=\"old\"> </a></td><td>Old / Incorrect</td><td>This address is no longer in use (or was never correct, but retained for records).</td></tr></table></div>"
                    },
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                            "valueUri": "urn:oid:2.16.840.1.113883.4.642.2.37"
                        }
                    ],
                    "url": "http://hl7.org/fhir/ValueSet/address-use",
                    "version": "1.0.1",
                    "name": "AddressUse",
                    "status": "draft",
                    "experimental": false,
                    "publisher": "HL7 (FHIR Project)",
                    "contact": [
                        {
                            "telecom": [
                                {
                                    "system": "other",
                                    "value": "http://hl7.org/fhir"
                                },
                                {
                                    "system": "email",
                                    "value": "fhir@lists.hl7.org"
                                }
                            ]
                        }
                    ],
                    "date": "2015-09-30T23:39:40+10:00",
                    "description": "The use of an address\r\n\r\nThe use of an address (home / work / etc.).",
                    "codeSystem": {
                        "extension": [
                            {
                                "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                                "valueUri": "urn:oid:2.16.840.1.113883.4.642.1.37"
                            }
                        ],
                        "system": "http://hl7.org/fhir/address-use",
                        "version": "1.0.1",
                        "caseSensitive": true,
                        "concept": [
                            {
                                "code": "home",
                                "display": "Home",
                                "definition": "A communication address at a home."
                            },
                            {
                                "code": "work",
                                "display": "Work",
                                "definition": "An office address. First choice for business related contacts during business hours."
                            },
                            {
                                "code": "temp",
                                "display": "Temporary",
                                "definition": "A temporary address. The period can provide more detailed information."
                            },
                            {
                                "code": "old",
                                "display": "Old / Incorrect",
                                "definition": "This address is no longer in use (or was never correct, but retained for records)."
                            }
                        ]
                    }
                },
                {
                    "resourceType": "ValueSet",
                    "id": "address-type",
                    "meta": {
                        "lastUpdated": "2015-09-30T23:39:40.637+10:00",
                        "profile": [
                            "http://hl7.org/fhir/StructureDefinition/valueset-shareable-definition"
                        ]
                    },
                    "text": {
                        "status": "generated",
                        "div": "<div><h2>AddressType</h2><p>The type of an address (physical / postal)<br/><br/>The type of an address (physical / postal).</p><p>This value set has an inline code system http://hl7.org/fhir/address-type, which defines the following codes:</p><table class=\"codes\"><tr><td><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td>postal<a name=\"postal\"> </a></td><td>Postal</td><td>Mailing addresses - PO Boxes and care-of addresses.</td></tr><tr><td>physical<a name=\"physical\"> </a></td><td>Physical</td><td>A physical address that can be visited.</td></tr><tr><td>both<a name=\"both\"> </a></td><td>Postal &amp; Physical</td><td>An address that is both physical and postal.</td></tr></table></div>"
                    },
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                            "valueUri": "urn:oid:2.16.840.1.113883.4.642.2.38"
                        }
                    ],
                    "url": "http://hl7.org/fhir/ValueSet/address-type",
                    "version": "1.0.1",
                    "name": "AddressType",
                    "status": "draft",
                    "experimental": false,
                    "publisher": "HL7 (FHIR Project)",
                    "contact": [
                        {
                            "telecom": [
                                {
                                    "system": "other",
                                    "value": "http://hl7.org/fhir"
                                },
                                {
                                    "system": "email",
                                    "value": "fhir@lists.hl7.org"
                                }
                            ]
                        }
                    ],
                    "date": "2015-09-30T23:39:40+10:00",
                    "description": "The type of an address (physical / postal)\r\n\r\nThe type of an address (physical / postal).",
                    "codeSystem": {
                        "extension": [
                            {
                                "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                                "valueUri": "urn:oid:2.16.840.1.113883.4.642.1.38"
                            }
                        ],
                        "system": "http://hl7.org/fhir/address-type",
                        "version": "1.0.1",
                        "caseSensitive": true,
                        "concept": [
                            {
                                "code": "postal",
                                "display": "Postal",
                                "definition": "Mailing addresses - PO Boxes and care-of addresses."
                            },
                            {
                                "code": "physical",
                                "display": "Physical",
                                "definition": "A physical address that can be visited."
                            },
                            {
                                "code": "both",
                                "display": "Postal & Physical",
                                "definition": "An address that is both physical and postal."
                            }
                        ]
                    }
                },
                {
                    "resourceType": "ValueSet",
                    "id": "administrative-gender",
                    "meta": {
                        "lastUpdated": "2015-09-30T23:39:40.637+10:00",
                        "profile": [
                            "http://hl7.org/fhir/StructureDefinition/valueset-shareable-definition"
                        ]
                    },
                    "text": {
                        "status": "extensions",
                        "div": "<div><h2>AdministrativeGender</h2><p>The gender of a person used for administrative purposes.</p><p>This value set has an inline code system http://hl7.org/fhir/administrative-gender, which defines the following codes:</p><table class=\"codes\"><tr><td><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td><td><b>Comments</b></td></tr><tr><td>male<a name=\"male\"> </a></td><td>Male</td><td>Male</td><td>Male</td></tr><tr><td>female<a name=\"female\"> </a></td><td>Female</td><td>Female</td><td>Female</td></tr><tr><td>other<a name=\"other\"> </a></td><td>Other</td><td>Other</td><td>The gender of a person could not be uniquely defined as male or female, such as hermaphrodite.</td></tr><tr><td>unknown<a name=\"unknown\"> </a></td><td>Unknown</td><td>Unknown</td><td>Description:A proper value is applicable, but not known.  Usage Notes: This means the actual value is not known. If the only thing that is unknown is how to properly express the value in the necessary constraints (value set, datatype, etc.), then the OTH or UNC flavor should be used. No properties should be included for a datatype with this property unless:  Those properties themselves directly translate to a semantic of &quot;unknown&quot;. (E.g. a local code sent as a translation that conveys 'unknown') Those properties further qualify the nature of what is unknown. (E.g. specifying a use code of &quot;H&quot; and a URL prefix of &quot;tel:&quot; to convey that it is the home phone number that is unknown.)</td></tr></table></div>"
                    },
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                            "valueUri": "urn:oid:2.16.840.1.113883.4.642.2.1"
                        }
                    ],
                    "url": "http://hl7.org/fhir/ValueSet/administrative-gender",
                    "version": "1.0.1",
                    "name": "AdministrativeGender",
                    "status": "draft",
                    "experimental": false,
                    "publisher": "HL7 (FHIR Project)",
                    "contact": [
                        {
                            "telecom": [
                                {
                                    "system": "other",
                                    "value": "http://hl7.org/fhir"
                                },
                                {
                                    "system": "email",
                                    "value": "fhir@lists.hl7.org"
                                }
                            ]
                        }
                    ],
                    "date": "2015-09-30T23:39:40+10:00",
                    "description": "The gender of a person used for administrative purposes.",
                    "codeSystem": {
                        "extension": [
                            {
                                "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                                "valueUri": "urn:oid:2.16.840.1.113883.4.642.1.1"
                            }
                        ],
                        "system": "http://hl7.org/fhir/administrative-gender",
                        "version": "1.0.1",
                        "caseSensitive": true,
                        "concept": [
                            {
                                "extension": [
                                    {
                                        "url": "http://hl7.org/fhir/StructureDefinition/valueset-comments",
                                        "valueString": "Male"
                                    }
                                ],
                                "code": "male",
                                "display": "Male",
                                "definition": "Male"
                            },
                            {
                                "extension": [
                                    {
                                        "url": "http://hl7.org/fhir/StructureDefinition/valueset-comments",
                                        "valueString": "Female"
                                    }
                                ],
                                "code": "female",
                                "display": "Female",
                                "definition": "Female"
                            },
                            {
                                "extension": [
                                    {
                                        "url": "http://hl7.org/fhir/StructureDefinition/valueset-comments",
                                        "valueString": "The gender of a person could not be uniquely defined as male or female, such as hermaphrodite."
                                    }
                                ],
                                "code": "other",
                                "display": "Other",
                                "definition": "Other"
                            },
                            {
                                "extension": [
                                    {
                                        "url": "http://hl7.org/fhir/StructureDefinition/valueset-comments",
                                        "valueString": "Description:A proper value is applicable, but not known.  Usage Notes: This means the actual value is not known. If the only thing that is unknown is how to properly express the value in the necessary constraints (value set, datatype, etc.), then the OTH or UNC flavor should be used. No properties should be included for a datatype with this property unless:  Those properties themselves directly translate to a semantic of \"unknown\". (E.g. a local code sent as a translation that conveys 'unknown') Those properties further qualify the nature of what is unknown. (E.g. specifying a use code of \"H\" and a URL prefix of \"tel:\" to convey that it is the home phone number that is unknown.)"
                                    }
                                ],
                                "code": "unknown",
                                "display": "Unknown",
                                "definition": "Unknown"
                            }
                        ]
                    }
                },
                {
                    "resourceType": "ValueSet",
                    "id": "marital-status",
                    "meta": {
                        "lastUpdated": "2015-09-30T23:39:40.637+10:00",
                        "profile": [
                            "http://hl7.org/fhir/StructureDefinition/valueset-shareable-definition"
                        ]
                    },
                    "text": {
                        "status": "generated",
                        "div": "<div><h2>Marital Status Codes</h2><p>This value set defines the set of codes that can be used to indicate the marital status of a person.</p><p>This value set has an inline code system http://hl7.org/fhir/marital-status, which defines the following codes:</p><table class=\"codes\"><tr><td><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td>U<a name=\"U\"> </a></td><td>Unmarried</td><td>The person is not presently married. The marital history is not known or stated.</td></tr></table><p>In addition, this value set includes codes from other code systems:</p><ul><li>Include these codes as defined in <a href=\"v3/MaritalStatus/index.html\">http://hl7.org/fhir/v3/MaritalStatus</a><table><tr><td><b>Code</b></td><td><b>Display</b></td></tr><tr><td>A</td><td>Annulled</td><td>Marriage contract has been declared null and to not have existed</td></tr><tr><td>D</td><td>Divorced</td><td>Marriage contract has been declared dissolved and inactive</td></tr><tr><td>I</td><td>Interlocutory</td><td>Subject to an Interlocutory Decree.</td></tr><tr><td>L</td><td>Legally Separated</td><td>Legally Separated</td></tr><tr><td>M</td><td>Married</td><td>A current marriage contract is active</td></tr><tr><td>P</td><td>Polygamous</td><td>More than 1 current spouse</td></tr><tr><td>S</td><td>Never Married</td><td>No marriage contract has ever been entered</td></tr><tr><td>T</td><td>Domestic partner</td><td>Person declares that a domestic partner relationship exists.</td></tr><tr><td>W</td><td>Widowed</td><td>The spouse has died</td></tr></table></li><li>Include these codes as defined in <a href=\"v3/NullFlavor/index.html\">http://hl7.org/fhir/v3/NullFlavor</a><table><tr><td><b>Code</b></td><td><b>Display</b></td></tr><tr><td>UNK</td><td>unknown</td><td>Description:A proper value is applicable, but not known.<br/>\n                        \n                           Usage Notes: This means the actual value is not known.  If the only thing that is unknown is how to properly express the value in the necessary constraints (value set, datatype, etc.), then the OTH or UNC flavor should be used.  No properties should be included for a datatype with this property unless:<br/>\n                        \n                           Those properties themselves directly translate to a semantic of &quot;unknown&quot;.  (E.g. a local code sent as a translation that conveys 'unknown')\n                           Those properties further qualify the nature of what is unknown.  (E.g. specifying a use code of &quot;H&quot; and a URL prefix of &quot;tel:&quot; to convey that it is the home phone number that is unknown.)</td></tr></table></li></ul></div>"
                    },
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                            "valueUri": "urn:oid:2.16.840.1.113883.4.642.2.19"
                        }
                    ],
                    "url": "http://hl7.org/fhir/ValueSet/marital-status",
                    "version": "1.0.1",
                    "name": "Marital Status Codes",
                    "status": "draft",
                    "experimental": true,
                    "publisher": "FHIR Project team",
                    "contact": [
                        {
                            "telecom": [
                                {
                                    "system": "other",
                                    "value": "http://hl7.org/fhir"
                                }
                            ]
                        }
                    ],
                    "date": "2015-09-30T23:39:40+10:00",
                    "description": "This value set defines the set of codes that can be used to indicate the marital status of a person.",
                    "codeSystem": {
                        "extension": [
                            {
                                "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                                "valueUri": "urn:oid:2.16.840.1.113883.4.642.1.19"
                            }
                        ],
                        "system": "http://hl7.org/fhir/marital-status",
                        "caseSensitive": true,
                        "concept": [
                            {
                                "code": "U",
                                "_code": {
                                    "fhir_comments": [
                                        "   work around for missing code in v3 code system - should be temporary, until added in v3   "
                                    ]
                                },
                                "display": "Unmarried",
                                "definition": "The person is not presently married. The marital history is not known or stated."
                            }
                        ]
                    },
                    "compose": {
                        "include": [
                            {
                                "system": "http://hl7.org/fhir/v3/MaritalStatus",
                                "concept": [
                                    {
                                        "code": "A"
                                    },
                                    {
                                        "code": "D"
                                    },
                                    {
                                        "code": "I"
                                    },
                                    {
                                        "code": "L"
                                    },
                                    {
                                        "code": "M"
                                    },
                                    {
                                        "code": "P"
                                    },
                                    {
                                        "code": "S"
                                    },
                                    {
                                        "code": "T"
                                    },
                                    {
                                        "code": "W"
                                    }
                                ]
                            },
                            {
                                "system": "http://hl7.org/fhir/v3/NullFlavor",
                                "concept": [
                                    {
                                        "code": "UNK"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "resourceType": "ValueSet",
                    "id": "v3-MaritalStatus",
                    "meta": {
                        "lastUpdated": "2015-07-31T00:00:00.000+10:00",
                        "profile": [
                            "http://hl7.org/fhir/StructureDefinition/valueset-shareable-definition"
                        ]
                    },
                    "text": {
                        "status": "generated",
                        "div": "<div><p>Release Date: 2015-07-31</p>\r\n<p>OID for code system: 2.16.840.1.113883.5.2</p>\r\n<h2>Description</h2>\r\n<p>\n                  * * * No description supplied * * *<br/>\r\n\n                  \n                     Open Issue: The specific meanings of these codes can vary somewhat by jurisdiction and implementation so caution should be used when determining equivalency.<br/>\r\n\n               </p>\r\n<hr/>\r\n<table class=\"grid\">\r\n <tr><td><b>Level</b></td><td><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr>\r\n <tr><td>1</td><td>A<a name=\"A\"> </a></td><td>Annulled</td><td>\n                        Marriage contract has been declared null and to not have existed<br/>\r\n\n                     </td></tr>\r\n <tr><td>1</td><td>D<a name=\"D\"> </a></td><td>Divorced</td><td>\n                        Marriage contract has been declared dissolved and inactive<br/>\r\n\n                     </td></tr>\r\n <tr><td>1</td><td>I<a name=\"I\"> </a></td><td>Interlocutory</td><td>\n                        Subject to an Interlocutory Decree.<br/>\r\n\n                     </td></tr>\r\n <tr><td>1</td><td>L<a name=\"L\"> </a></td><td>Legally Separated</td><td/></tr>\r\n <tr><td>1</td><td>M<a name=\"M\"> </a></td><td>Married</td><td>\n                        A current marriage contract is active<br/>\r\n\n                     </td></tr>\r\n <tr><td>1</td><td>P<a name=\"P\"> </a></td><td>Polygamous</td><td>\n                        More than 1 current spouse<br/>\r\n\n                     </td></tr>\r\n <tr><td>1</td><td>S<a name=\"S\"> </a></td><td>Never Married</td><td>\n                        No marriage contract has ever been entered<br/>\r\n\n                     </td></tr>\r\n <tr><td>1</td><td>T<a name=\"T\"> </a></td><td>Domestic partner</td><td>\n                        Person declares that a domestic partner relationship exists.<br/>\r\n\n                     </td></tr>\r\n <tr><td>1</td><td>U<a name=\"U\"> </a></td><td>unmarried</td><td>\n                        Currently not in a marriage contract.<br/>\r\n\n                     </td></tr>\r\n <tr><td>1</td><td>W<a name=\"W\"> </a></td><td>Widowed</td><td>\n                        The spouse has died<br/>\r\n\n                     </td></tr>\r\n</table>\r\n</div>"
                    },
                    "url": "http://hl7.org/fhir/ValueSet/v3-MaritalStatus",
                    "version": "2015-07-31",
                    "name": "v3 Code System MaritalStatus",
                    "status": "active",
                    "experimental": false,
                    "publisher": "HL7, Inc",
                    "contact": [
                        {
                            "telecom": [
                                {
                                    "system": "other",
                                    "value": "http://hl7.org"
                                }
                            ]
                        }
                    ],
                    "date": "2015-07-31",
                    "description": " * * * No description supplied * * *  Open Issue:\r\nThe specific meanings of these codes can vary somewhat by jurisdiction and implementation so caution should be used when determining equivalency.",
                    "codeSystem": {
                        "extension": [
                            {
                                "url": "http://hl7.org/fhir/StructureDefinition/valueset-oid",
                                "valueUri": "urn:oid:2.16.840.1.113883.5.2"
                            }
                        ],
                        "system": "http://hl7.org/fhir/v3/MaritalStatus",
                        "caseSensitive": true,
                        "concept": [
                            {
                                "code": "A",
                                "abstract": false,
                                "display": "Annulled",
                                "definition": "Marriage contract has been declared null and to not have existed"
                            },
                            {
                                "code": "D",
                                "abstract": false,
                                "display": "Divorced",
                                "definition": "Marriage contract has been declared dissolved and inactive"
                            },
                            {
                                "code": "I",
                                "abstract": false,
                                "display": "Interlocutory",
                                "definition": "Subject to an Interlocutory Decree."
                            },
                            {
                                "code": "L",
                                "abstract": false,
                                "display": "Legally Separated",
                                "definition": "Legally Separated"
                            },
                            {
                                "code": "M",
                                "abstract": false,
                                "display": "Married",
                                "definition": "A current marriage contract is active"
                            },
                            {
                                "code": "P",
                                "abstract": false,
                                "display": "Polygamous",
                                "definition": "More than 1 current spouse"
                            },
                            {
                                "code": "S",
                                "abstract": false,
                                "display": "Never Married",
                                "definition": "No marriage contract has ever been entered"
                            },
                            {
                                "code": "T",
                                "abstract": false,
                                "display": "Domestic partner",
                                "definition": "Person declares that a domestic partner relationship exists."
                            },
                            {
                                "code": "U",
                                "abstract": false,
                                "display": "unmarried",
                                "definition": "Currently not in a marriage contract."
                            },
                            {
                                "code": "W",
                                "abstract": false,
                                "display": "Widowed",
                                "definition": "The spouse has died"
                            }
                        ]
                    }
                },

                {
                    "resourceType":"Procedure",
                    "id":"109391",
                    "meta":{
                        "versionId":"1",
                        "lastUpdated":"2015-10-16T18:43:33.510+03:00"
                    },
                    "subject":{
                        "reference":"Patient/test"
                    },
                    "code": {
                        "coding":[
                            {
                                "system":"http://snomed.info/sct",
                                "code":"2488002",
                                "display": "Prescription, fitting and dispensing of contact lens (procedure)"
                            }
                        ],
                        "test": "Prescription, fitting and dispensing of contact lens (procedure)"
                    },
                    "status":"completed",
                    "performedDateTime":"1942-01-27",
                    "focalDevice":[
                        {
                            "action":{
                                "text":"Artificial Eye Lenses"
                            },
                            "manipulated":{
                                "reference":"Device/109390"
                            }
                        }
                    ]
                }
            ];

            //isAuthenticated
            angular.forEach(data, function (_body) {
                if (_body.resourceType && _body.id) {
                    $httpBackend.whenGET(_base_url + _body.resourceType + '/' + _body.id)
                        .respond(function (method, url, data) {
                            return [
                                200,
                                _body,
                                {}
                            ];
                        });

                }
            });
        }
    });
