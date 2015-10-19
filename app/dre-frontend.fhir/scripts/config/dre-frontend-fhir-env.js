'use strict';
angular.module('dreFrontend.fhir')
    .constant('fhirEnv', {
        page_length: 30,
        max_resource_nesting: 5,
        resourceTypes: {
            "AdverseReaction": {dstu: 1},
            "Alert": {dstu: 1},
            "AllergyIntolerance": {
                dstu: 2,
                details: ["recorder ", "substance", "reaction", "sensitivityTest"]
            },
            "Appointment": {dstu: 2},
            "AppointmentResponse": {dstu: 2},
            "AuditEvent": {dstu: 2},
            "Basic": {dstu: 2},
            "Binary": {dstu: 2},
            "BodySite": {dstu: 2},
            "Bundle": {dstu: 2},
            "CarePlan": {
                dstu: 2,
                details: ["concern", "member", "actionResulting", "detail", "location", "performer", "product"]
            },
            "Claim": {dstu: 2},
            "ClaimResponse": {dstu: 2},
            "ClinicalImpression": {dstu: 2},
            "Communication": {dstu: 2},
            "CommunicationRequest": {dstu: 2},
            "Composition": {dstu: 2},
            "ConceptMap": {dstu: 2},
            "Condition": {dstu: 2},
            "Conformance": {dstu: 2},
            "DetectedIssue": {dstu: 2},
            "Coverage": {dstu: 2},
            "DataElement": {dstu: 2},
            "Device": {dstu: 2},
            "DeviceComponent": {dstu: 2},
            "DeviceMetric": {dstu: 2},
            "DeviceObservationReport": {dstu: 1},
            "DeviceUseRequest": {dstu: 2},
            "DeviceUseStatement": {dstu: 2},
            "DiagnosticOrder": {
                dstu: 2,
                details: ["orderer", "encounter", "specimen", "actor"]
            },
            "DiagnosticReport": {dstu: 2},
            "DocumentManifest": {dstu: 2},
            "DocumentReference": {dstu: 2},
            "EligibilityRequest": {dstu: 2},
            "EligibilityResponse": {dstu: 2},
            "Encounter": {
                dstu: 2,
                details: ["individual", "indication", "origin", "bed", "destination", "dischargeDiagnosis", "location", "serviceProvider", "partOf"]
            },
            "EnrollmentRequest": {dstu: 2},
            "EnrollmentResponse": {dstu: 2},
            "EpisodeOfCare": {dstu: 2},
            "ExplanationOfBenefit": {dstu: 2},
            "FamilyHistory": {dstu: 1},
            "FamilyMemberHistory": {dstu: 2},
            "Flag": {dstu: 2},
            "Goal": {dstu: 2},
            "Group": {dstu: 2},
            "HealthcareService": {dstu: 2},
            "ImagingObjectSelection": {dstu: 2},
            "ImagingStudy": {dstu: 2},
            "Immunization": {dstu: 2},
            "ImmunizationRecommendation": {dstu: 2},
            "ImplementationGuide": {dstu: 2},
            "List": {dstu: 2},
            "Location": {dstu: 2},
            "Media": {dstu: 2},
            "Medication": {
                dstu: 2,
                details: ["manufacturer", "item"]
            },
            "MedicationAdministration": {dstu: 2},
            "MedicationDispense": {dstu: 2},
            "MedicationOrder": {dstu: 2},
            "MedicationPrescription": {
                dstu: 1,
                details: ["prescriber", "reasonReference", "medication"]
            },
            "MedicationStatement": {dstu: 2},
            "MessageHeader": {dstu: 2},
            "NamingSystem": {dstu: 2},
            "NutritionOrder": {dstu: 2},
            "Observation": {
                dstu: 2,
                details: ["performer", "subject", "specimen", "target"]
            },
            "OperationDefinition": {dstu: 2},
            "OperationOutcome": {dstu: 2},
            "Order": {dstu: 2},
            "OrderResponse": {dstu: 2},
            "Organization": {dstu: 2},
            "Other": {dstu: 1},
            "Parameters": {dstu: 2},
            "Patient": {dstu: 2},
            "PaymentNotice": {dstu: 2},
            "PaymentReconciliation": {dstu: 2},
            "Person": {dstu: 2},
            "Practitioner": {
                dstu: 2,
                details: ["organization", "location", "issuer"]
            },
            "Procedure": {dstu: 2},
            "ProcessRequest": {dstu: 2},
            "ProcessResponse": {dstu: 2},
            "ProcedureRequest": {dstu: 2},
            "Profile": {dstu: 1},
            "Provenance": {dstu: 2},
            "Query": {dstu: 1},
            "Questionnaire": {dstu: 2},
            "QuestionnaireResponse": {dstu: 2},
            "ReferralRequest": {dstu: 2},
            "RelatedPerson": {dstu: 2},
            "RiskAssessment": {dstu: 2},
            "Schedule": {dstu: 2},
            "SearchParameter": {dstu: 2},
            "SecurityEvent": {dstu: 1},
            "Slot": {dstu: 2},
            "Specimen": {dstu: 2},
            "StructureDefinition": {dstu: 2},
            "Subscription": {dstu: 2},
            "Substance": {dstu: 2},
            "Supply": {dstu: 1},
            "SupplyRequest": {dstu: 2},
            "SupplyDelivery": {dstu: 2},
            "TestScript": {dstu: 2},
            "ValueSet": {dstu: 2},
            "VisionPrescription": {dstu: 2}
        },
        bundleType: "Bundle",
        vital_signs: {
            body_weight: ["29463-7", "27113001", "3141-9"],
            body_height: ["8302-2"],
            systolic_blood_pressure: ["8480-6", "271649006"],
            diastolic_blood_pressure: ["8462-4", "271650006"],
            bmi: ["39156-5", "60621009"]
        },
        humanNames: {
            "usual": {
                codes: ["usual", "C", "D"]
            },
            "official": {
                codes: ["official", "OR", "L"]
            },
            "temp": {
                codes: ["temp", "T", "TEMP"]
            },
            "nickname": {
                codes: ["nickname", "P", "N"]
            },
            "anonymous": {
                codes: ["anonymous", "ANON", "S"]
            },
            "old": {
                codes: ["old", "OLD", "NOUSE", "BAD"]
            },
            "maiden": {
                codes: ["maiden", "M"]
            }
        },
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
            {code: "2186-5", display: "Not Hispanic or Latino"}
        ]
    });
