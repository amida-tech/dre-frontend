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
                fhirType: 'MedicationOrder'
            },
            MedicationPrescription: {
                alias: 'medications',
                title: 'Medications',
                type: 'MedicationPrescription',
                fhirType: 'MedicationPrescription'
            },
            TestResult: {
                alias: 'testresults',
                title: 'Test Results',
                type: 'ObservationTestResult',
                fhirType: 'Observation'
            },
            Vital: {
                alias: 'vitals',
                title: 'Vitals',
                type: 'ObservationVital',
                fhirType: 'Observation'
            },
            Encounter: {
                alias: 'encounters',
                title: 'Encounters',
                type: 'Encounter',
                fhirType: 'Encounter'
            },
            Condition: {
                alias: 'conditions',
                title: 'Conditions',
                type: 'Condition',
                fhirType: 'Condition'
            },
            SocialHistory: {
                alias: 'social-history',
                title: 'SocialHistory',
                type: 'SocialHistory',
                fhirType: 'SocialHistory'
            },
            Procedure: {
                alias: 'procedures',
                title: 'Procedures',
                type: 'Procedure',
                fhirType: 'Procedure'
            },
            AllergyIntolerance: {
                alias: 'allergies',
                title: 'Allergies',
                type: 'AllergyIntolerance',
                fhirType: 'AllergyIntolerance'
            },
            Immunization: {
                alias: 'immunizations',
                title: 'Immunizations',
                type: 'Immunization',
                fhirType: 'Immunization'
            },
            Insurance: {
                alias: 'insurances',
                title: 'Insurance',
                type: 'Insurance',
                fhirType: 'Insurance'
            },
            Claim: {
                alias: 'claims',
                title: 'Claims',
                type: 'Claims',
                fhirType: 'Claims'
            }
        };

        this.$get = function () {
            return self;
        };
    });
