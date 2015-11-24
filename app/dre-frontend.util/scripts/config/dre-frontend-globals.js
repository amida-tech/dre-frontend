'use strict';

angular.module('dreFrontend.util')
    .provider('dreFrontendGlobals', function () {
        var self = {};
        //Default date format
        self.dateFormat = 'MM/dd/yyyy';

        self.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        self.defaultErrorMessage = 'An error occurred.';
        self.authEvents = {
            loggedIn: 'dreFrontend:LoggedIn',
            loggedOut: 'dreFrontend:LoggedOut',
            inProcess: 'dreFrontend:InProcess',
            notLoggedInError: 'dreFrontend:LoggedInError'
        };
        self.profileEvents = {
            updated: 'dreFrontend:ProfileUpdated'
        };

        self.recordEvents = {
            updateReviewList: 'dreFrontend:UpdateRecordReviewList'
        };

        self.menuRecordTypeEnum = {
            none: "none",
            popup: "popup",
            inline: "inline"
        };

        self.resourceTypes = {
            MedicationOrder: {
                alias: 'medications',
                title: 'Medications',
                type: 'MedicationOrder',
                fhirType: 'MedicationOrder',
                serviceName: 'dreFrontendMedicationOrder'
            },
            TestResult: {
                alias: 'testresults',
                title: 'Test Results',
                type: 'ObservationTestResult',
                fhirType: 'Observation',
                serviceName: 'dreFrontendObservations'
            },
            Vital: {
                alias: 'vitals',
                title: 'Vitals',
                type: 'ObservationVital',
                fhirType: 'Observation',
                serviceName: 'dreFrontendObservations'
            },
            Encounter: {
                alias: 'encounters',
                title: 'Encounters',
                type: 'Encounter',
                fhirType: 'Encounter',
                serviceName: 'dreFrontendEncounters'
            },
            Condition: {
                alias: 'conditions',
                title: 'Conditions',
                type: 'Condition',
                fhirType: 'Condition',
                serviceName: 'dreFrontendConditions'
            },
            SocialHistory: {
                alias: 'social-history',
                title: 'Social History',
                type: 'SocialHistory',
                fhirType: 'Observation',
                serviceName: 'dreFrontendObservations'
            },
            Procedure: {
                alias: 'procedures',
                title: 'Procedures',
                type: 'Procedure',
                fhirType: 'Procedure',
                serviceName: 'dreFrontendProcedures'
            },
            AllergyIntolerance: {
                alias: 'allergies',
                title: 'Allergies',
                type: 'AllergyIntolerance',
                fhirType: 'AllergyIntolerance',
                serviceName: 'dreFrontendAllergyIntolerances'
            },
            Immunization: {
                alias: 'immunizations',
                title: 'Immunizations',
                type: 'Immunization',
                fhirType: 'Immunization',
                serviceName: 'dreFrontendImmunizations'
            },
            Insurance: {
                alias: 'insurances',
                title: 'Insurance',
                type: 'Insurance',
                fhirType: 'Insurance',
                serviceName: null
            },
            Claim: {
                alias: 'claims',
                title: 'Claims',
                type: 'Claims',
                fhirType: 'Claims',
                serviceName: 'dreFrontendClaim'
            }
        };

        self.systemCodes = {
            "http://www.ama-assn.org/go/cpt": "CPT",
            "http://snomed.info/sct": "SNOMED-CT",
            "http://loinc.org": "LOINC",
            "http://www.nlm.nih.gov/research/umls/rxnorm": "RxNORM",
            "http://www2a.cdc.gov/vaccines/iis/iisstandards/vaccines.asp?rpt=cvx": "CVX",
            "urn:oid:2.16.840.1.113883.5.83": "HITSP C80 Observation Status",
            "urn:oid:2.16.840.1.113883.3.26.1.1": "NCI Thesaurus",
            "urn:oid:2.16.840.1.113883.3.88.12.3221.8.9": "Body Site Value Set",
            "urn:oid:2.16.840.1.113883.6.259": "Healthcare Service Location (HL7)",
            "urn:oid:2.16.840.1.113883.5.8": "HL7 v3 Act Reason",
            "http://hl7.org/fhir/v3/ParticipationType": "HL7 v3 Participation Type"
        };

        self.fieldsOrder = {
            coding: ['display', 'code', 'system']
        };

        this.$get = function () {
            return self;
        };
    });
