'use strict';
angular.module('dreFrontend.fhir')
    .constant('fhirEnv', {
        page_length: 30,
        max_resource_nesting: 5,
        resourceTypes: {
            "AdverseReaction": {},
            "Alert": {},
            "AllergyIntolerance": {
                details: ["recorder ","substance","reaction","sensitivityTest"]
            },
            "Binary": {},
            "CarePlan": {
                details: ["concern","member","actionResulting","detail","location","performer","product"]
            },
            "Composition": {},
            "ConceptMap": {},
            "Condition": {},
            "Conformance": {},
            "Device": {},
            "DeviceObservationReport": {},
            "DiagnosticOrder": {
                details: ["orderer","encounter","specimen","actor"]
            },
            "DiagnosticReport": {},
            "DocumentReference": {},
            "DocumentManifest": {},
            "Encounter": {
                details: ["individual","indication","origin","bed","destination","dischargeDiagnosis","location","serviceProvider","partOf"]
            },
            "FamilyHistory": {},
            "Group": {},
            "ImagingStudy": {},
            "Immunization": {},
            "ImmunizationRecommendation": {},
            "List": {},
            "Location": {},
            "Media": {},
            "Medication": {
                details: ["manufacturer", "item"]
            },
            "MedicationAdministration": {},
            "MedicationDispense": {},
            "MedicationPrescription": {
                details: ["prescriber", "reasonReference", "medication"]
            },
            "MedicationStatement": {},
            "MessageHeader": {},
            "Observation": {
                details: ["performer","subject","specimen","target"]
            },
            "OperationOutcome": {},
            "Order": {},
            "OrderResponse": {},
            "Organization": {},
            "Other": {},
            "Patient": { },
            "Practitioner": {
                details: ["organization", "location", "issuer"]
            },
            "Procedure": {},
            "Profile": {},
            "Provenance": {},
            "Query": {},
            "Questionnaire": {},
            "RelatedPerson": {},
            "SecurityEvent": {},
            "Specimen": {},
            "Substance": {},
            "Supply": {},
            "ValueSet": {}
        },
        bundleType: "Bundle",
        vital_signs: {
            body_weight: ["29463-7","27113001","3141-9"],
            body_height: ["8302-2"],
            systolic_blood_pressure: ["8480-6","271649006"],
            diastolic_blood_pressure: ["8462-4","271650006"],
            bmi: ["39156-5","60621009"]
        },
        humanNames:{
            "usual": {
                codes: ["usual","C","D"]
            },
            "official": {
                codes: ["official","OR","L"]
            },
            "temp": {
                codes: ["temp","T","TEMP"]
            },
            "nickname": {
                codes: ["nickname","P","N"]
            },
            "anonymous": {
                codes: ["anonymous","ANON","S"]
            },
            "old": {
                codes: ["old","OLD","NOUSE","BAD"]
            },
            "maiden": {
                codes: ["maiden", "M"]
            }
        },
        maritalStatuses: [
            { code: "A", display: "Annulled", definition: "Marriage contract has been declared null and to not have existed"},
            { code: "D", display: "Divorced", definition: "Marriage contract has been declared dissolved and inactive"},
            { code: "I", display: "Interlocutory", definition: "Subject to an Interlocutory Decree"},
            { code: "L", display: "Legally", definition: "Separated"},
            { code: "M", display: "Married", definition: "A current marriage contract is active"},
            { code: "P", display: "Polygamous", definition: "More than 1 current spouse"},
            { code: "S", display: "Never Married", definition: "No marriage contract has ever been entered"},
            { code: "T", display: "Domestic partner", definition: "Person declares that a domestic partner relationship exists."},
            { code: "W", display: "Widowed", definition: "The spouse has died"}
        ],
        races: [
        ],
        gender: [
            { code: "F", display: "female", definition: "Female"},
            { code: "M", display: "male", definition: "Male"},
            { code: "UN", display: "other", definition: "The gender of a person could not be uniquely defined as male or female, such as hermaphrodite."}
        ],
        addressCodes: [
            { code: "BAD", display: "bad address", definition: ""},
            { code: "CONF", display: "confidential address", definition: ""},
            { code: "H", display: "home address", definition: ""},
            { code: "HP", display: "primary home", definition: ""},
            { code: "HV", display: "vacation home", definition: ""},
            { code: "OLD", display: "no longer in use", definition: ""},
            { code: "TMP", display: "temporary address", definition: ""},
            { code: "WP", display: "work place", definition: ""},
            { code: "DIR", display: "direct", definition: ""},
            { code: "PUB", display: "public", definition: ""},
            { code: "PHYS", display: "physical visit address", definition: ""},
            { code: "PST", display: "postal address", definition: ""},
            { code: "AS", display: "answering service", definition: ""},
            { code: "EC", display: "emergency contact", definition: ""},
            { code: "MC", display: "mobile contact", definition: ""},
            { code: "PG", display: "pager", definition: ""}
        ],
        contactSystemCodes: {
            phone: "phone",
            fax: "fax",
            email: "email",
            url: "url"
        },
        raceExtensionUrl: "http://hl7.org/fhir/Profile/us-core#race",
        raceCodes: [
            {code: "1002-5", display: "American Indian or Alaska Native"},
            {code: "2054-5", display: "Black or African American"},
            {code: "2028-9", display: "Asian"},
            {code: "2076-8", display: "Native Hawaiian or Other Pacific Islander"},
            {code: "2106-3", display: "White"},
            {code: "2131-1", display: "Other Race"}
        ],
        ethnicityExtensionUrl: "http://hl7.org/fhir/Profile/us-core#ethnicity",
        ethnicityCodes: [
            {code: "2135-2", display: "Hispanic or Latino"},
            {code: "2186-5", display: "Not Hispanic or Latino"},
        ]
    });
