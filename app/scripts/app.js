'use strict';

/**
 * @ngdoc overview
 * @name dreFrontendApp
 * @description
 * # dreFrontendApp
 *
 * Main module of the application.
 */
var app = angular
    .module('dreFrontendApp', ['ui.router', 'ui.bootstrap', 'dreFrontend.core', 'dreFrontend.fhir', 'dreFrontend.util',
        'ngTouch', 'ngMessages', 'nvd3', 'dreFrontend.mocks', 'angularFileUpload', 'ngTable', 'ngFileSaver',
        'angularSpinner', 'ngImgCrop', 'dreFrontend.resource']);

app.config(function ($logProvider, dreFrontendEnvironment, $urlMatcherFactoryProvider, $locationProvider, datepickerConfig,
                     datepickerPopupConfig, dreFrontendGlobalsProvider, $urlRouterProvider, $stateProvider) {
    var dreFrontendGlobals = dreFrontendGlobalsProvider.$get();

    //Enable/disable browser log console. Disable only for production release
    $logProvider.debugEnabled(dreFrontendEnvironment.enableDebugLog);
    $urlMatcherFactoryProvider.strictMode(false);
    $locationProvider.html5Mode(false);

    datepickerConfig.startingDay = 0;
    datepickerConfig.showWeeks = false;
    datepickerConfig.formatYear = 'yyyy';
    datepickerPopupConfig.datepickerPopup = dreFrontendGlobals.dateFormat;
    datepickerPopupConfig.closeText = 'Close';
    //routes
    $stateProvider
        .state('main', {
            url: '/?returnTo',
            templateUrl: 'views/controllers/main.html',
            controller: 'MainCtrl',
            data: {
                name: '',
                isPublic: true
            }
        })
        .state('login', {
            url: '/login?returnTo',
            templateUrl: 'views/controllers/login.html',
            controller: 'LoginCtrl',
            data: {
                name: 'Login',
                isPublic: true
            }
        })
        .state('register', {
            url: '/register?returnTo',
            templateUrl: 'views/controllers/register.html',
            controller: 'RegisterCtrl',
            data: {
                name: 'New User',
                isPublic: true
            }
        })
        .state('wideRoot', {
            url: '',
            abstract: true,
            templateUrl: 'views/controllers/wide-root.html'
        })
        .state('homeRoot', {
            url: '',
            templateUrl: 'views/controllers/home-root.html',
            abstract: true
        })
        .state('home', {
            url: '/home',
            parent: 'homeRoot',
            data: {
                name: 'Home',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {},
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/account-history.html",
                    controller: "AccountHistoryCtrl"
                }
            }
        })
        .state('record', {
            url: '/record?id',
            parent: 'home',
            data: {
                name: 'My Records',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/record-menu.html",
                    controller: "RecordsMenuCtrl"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/record-history.html",
                    controller: "RecordHistoryCtrl"
                }
            }
        })
        .state('record.' + dreFrontendGlobals.resourceTypes.MedicationOrder.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.MedicationOrder.alias,
            parent: 'record',
            data: {
                name: 'My Medications',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/medications.html",
                    controller: "MedicationsCtrl"
                }
            }
        })
        .state('record.' + dreFrontendGlobals.resourceTypes.TestResult.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.TestResult.alias,
            parent: 'record',
            data: {
                name: 'My Results',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/records-common.html",
                    controller: "TestresultsCtrl"
                }
            }
        })
        .state('record.' + dreFrontendGlobals.resourceTypes.Encounter.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.Encounter.alias,
            parent: 'record',
            data: {
                name: 'My Encounters',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/records-common.html",
                    controller: "EncountersCtrl"
                }
            }
        })
        .state('record.' + dreFrontendGlobals.resourceTypes.Condition.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.Condition.alias,
            parent: 'record',
            data: {
                name: 'My Conditions',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/records-common.html",
                    controller: "ConditionsCtrl"
                }
            }
        })
        .state('record.' + dreFrontendGlobals.resourceTypes.SocialHistory.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.SocialHistory.alias,
            parent: 'record',
            data: {
                name: 'My Social History',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/records-common.html",
                    controller: "SocialHistoryCtrl"
                }
            }
        })
        .state('record.' + dreFrontendGlobals.resourceTypes.Procedure.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.Procedure.alias,
            parent: 'record',
            data: {
                name: 'My Procedures',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/records-common.html",
                    controller: "ProceduresCtrl"
                }
            }
        })
        .state('record.' + dreFrontendGlobals.resourceTypes.Vital.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.Vital.alias,
            parent: 'record',
            data: {
                name: 'My Vitals',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/records-common.html",
                    controller: "VitalsCtrl"
                }
            }
        })
        .state('record.' + dreFrontendGlobals.resourceTypes.Immunization.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.Immunization.alias,
            parent: 'record',
            data: {
                name: 'My Immunizations',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/records-common.html",
                    controller: "ImmunizationsCtrl"
                }
            }
        })
        .state('record.' + dreFrontendGlobals.resourceTypes.AllergyIntolerance.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.AllergyIntolerance.alias,
            parent: 'record',
            data: {
                name: 'My Allergies',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/records-common.html",
                    controller: "AllergiesCtrl"
                }
            }
        })
        .state('notes', {
            url: '/notes/{group}',
            parent: 'home',
            data: {
                name: 'My Notes',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/groups-menu.html",
                    controller: "NotesMenuCtrl"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/notes.html",
                    controller: "NotesCtrl"
                }
            }
        })
        .state('record.review', {
            url: '/review/{group}',
            parent: 'home',
            data: {
                name: 'Review Updates',
                isPublic: false
            },
            /*
             templateUrl: "views/controllers/record-review.html",
             controller: "RecordReviewCtrl"
             */
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/groups-menu.html",
                    controller: "ReviewMenuCtrl"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/record-review.html",
                    controller: "RecordReviewCtrl"
                }
            }
        })
        .state('files', {
            url: '/files',
            parent: 'home',
            data: {
                name: 'My Files',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {},
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/files.html",
                    controller: 'FilesCtrl'
                }
            }
        })
        .state('files.upload', {
            url: '/upload',
            parent: 'files',
            data: {
                name: 'Upload File',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {},
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/files-upload.html",
                    controller: 'FilesUploadCtrl'
                }
            }
        })
        .state('printMyrecord', {
            url: '/home/record/print',
            params: {additionalData: null},
            templateUrl: "views/controllers/print-myrecord.html",
            controller: "PrintMyrecordCtrl",
            data: {
                name: 'Print',
                isPublic: false
            }
        })
        .state('billing', {
            url: '/billing?id',
            parent: 'home',
            data: {
                name: 'My Billings',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/billing-menu.html",
                    controller: "BillingMenuCtrl"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/billing-history.html",
                    controller: "BillingHistoryCtrl"
                }
            }
        })
        .state('billing.' + dreFrontendGlobals.resourceTypes.Insurance.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.Insurance.alias,
            parent: 'billing',
            data: {
                name: 'My Insurance',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/records-common.html",
                    controller: "InsuranceCtrl"
                }
            }
        })
        .state('billing.' + dreFrontendGlobals.resourceTypes.Claim.alias, {
            url: '/' + dreFrontendGlobals.resourceTypes.Claim.alias,
            parent: 'billing',
            data: {
                name: 'My Claims',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/records-common.html",
                    controller: "ClaimsCtrl"
                }
            }
        })
        .state('profile', {
            url: '/profile',
            parent: 'home',
            data: {
                name: 'My Profile',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/profile-menu.html",
                    controller: 'ProfileMenuCtrl'
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/profile.html",
                    controller: 'ProfileCtrl'
                }
            }
        })
        .state('profile.contact', {
            url: '/contact-info',
            parent: 'profile',
            data: {
                name: 'Contact Info',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/profile-menu.html",
                    controller: 'ProfileMenuCtrl'
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/profile-contact-info.html",
                    controller: 'ProfileCtrl'
                }
            }
        })
        .state('profile.photo', {
            url: '/photo',
            parent: 'profile',
            data: {
                name: 'Photo',
                isPublic: false
            },
            views: {
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/profile-photo.html",
                    controller: 'ProfilePhotoCtrl'
                }
            }
        })
        .state('account', {
            url: '/account',
            parent: 'home',
            data: {
                name: 'My Account',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {},
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/account.html",
                    controller: 'AccountCtrl'
                }
            }
        })
        .state('fhir', {
            url: '/fhir',
            templateUrl: 'views/controllers/fhir.html',
            controller: 'FhirCtrl',
            data: {
                name: 'My PHR | FHIR',
                isPublic: true
            }
        });
    $urlRouterProvider.otherwise('/');

});

app.run(function ($rootScope, $state, $stateParams, dreFrontendAuthService, dreFrontEndPatientInfoService,
                  dreFrontendGlobals, dreFrontendNotesService, dreFrontendMergeService) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));

    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
        //if rule not defined
        if (!angular.isDefined(toState.data.isPublic)) {
            return;
        }
        //Check auth
        dreFrontendAuthService.isAuthenticated().then(function (isAuthenticated) {
            //if private state and user is not authenticated
            if (!toState.data.isPublic) {
                if (!isAuthenticated) {
                    e.preventDefault();
                    $stateParams.returnTo = toState.name;
                    $state.go('main');
                } else {
                    if (fromParams.returnTo && fromParams.returnTo !== toState.name) {
                        $state.go(fromParams.returnTo, {reload: true});
                    }
                }
            }
        });
    });

    $rootScope.$on(dreFrontendGlobals.authEvents.loggedIn, function (event, userId) {
        dreFrontEndPatientInfoService.setPatientId(userId);
        dreFrontendNotesService.getAllNotes();
    });

    $rootScope.$on(dreFrontendGlobals.authEvents.loggedOut, function () {
        dreFrontEndPatientInfoService.clearPatientData();
        dreFrontendNotesService.clearAllNotes();
        dreFrontendMergeService.clear();
    });
});
