'use strict';
angular.module('dreFrontend.fhir')
    .constant('fhirEnv', {
        page_length: 30,
        max_resource_nesting: 5,
        resourceTypes: [
            "AdverseReaction",
            "Alert",
            "AllergyIntolerance",
            "Binary",
            "CarePlan",
            "Composition",
            "ConceptMap",
            "Condition",
            "Conformance",
            "Device",
            "DeviceObservationReport",
            "DiagnosticOrder",
            "DiagnosticReport",
            "DocumentReference",
            "DocumentManifest",
            "Encounter",
            "FamilyHistory",
            "Group",
            "ImagingStudy",
            "Immunization",
            "ImmunizationRecommendation",
            "List",
            "Location",
            "Media",
            "Medication",
            "MedicationAdministration",
            "MedicationDispense",
            "MedicationPrescription",
            "MedicationStatement",
            "MessageHeader",
            "Observation",
            "OperationOutcome",
            "Order",
            "OrderResponse",
            "Organization",
            "Other",
            "Patient",
            "Practitioner",
            "Procedure",
            "Profile",
            "Provenance",
            "Query",
            "Questionnaire",
            "RelatedPerson",
            "SecurityEvent",
            "Specimen",
            "Substance",
            "Supply",
            "ValueSet"
        ],
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
            { code: "F", display: "Female", definition: "Female"},
            { code: "M", display: "Male", definition: "Male"},
            { code: "UN", display: "Undifferentiated", definition: "The gender of a person could not be uniquely defined as male or female, such as hermaphrodite."}
        ]
    });
