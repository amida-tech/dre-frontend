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

        self.menuRecordTypeEnum = {
            none: "none",
            popup: "popup",
            inline: "inline"
        };

        self.resourceTypes = {
            MedicationPrescription: {
                alias: 'medications',
                title: 'Medications',
                type: 'MedicationPrescription'
            },
            ObservationTestResult: {
                alias: 'testresults',
                title: 'Results',
                type: 'ObservationTestResult'
            },
            ObservationVital: {
                alias: 'vitals',
                title: 'Vitals',
                type: 'ObservationVital'
            },
            Encounter: {
                alias: 'encounters',
                title: 'Encounters',
                type: 'Encounter'
            },
            Condition: {
                alias: 'conditions',
                title: 'Conditions',
                type: 'Condition'
            },
            SocialHistory: {
                alias: 'social-history',
                title: 'SocialHistory',
                type: 'SocialHistory'
            },
            Procedure: {
                alias: 'procedures',
                title: 'Procedures',
                type: 'Procedure'
            },
            AllergyIntolerance: {
                alias: 'allergies',
                title: 'Allergies',
                type: 'AllergyIntolerance'
            },
            Immunization: {
                alias: 'immunization',
                title: 'Immunizations',
                type: 'Immunization'
            }
        };

        this.$get = function () {
            return self;
        };
    });
