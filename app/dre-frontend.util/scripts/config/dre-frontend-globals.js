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
                title: 'SocialHistory',
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

        this.$get = function () {
            return self;
        };
    });
