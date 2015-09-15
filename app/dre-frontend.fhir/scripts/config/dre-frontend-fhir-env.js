'use strict';
angular.module('dreFrontend.fhir')
    .constant('fhirEnv', {
        page_length: 30,
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
        }
    });
