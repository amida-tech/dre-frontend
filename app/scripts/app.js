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
        'ngTouch', 'ngMessages', 'nvd3', 'dreFrontend.mocks', 'angularFileUpload', 'ngTable', 'ngFileSaver']);
app.config(function ($logProvider, dreFrontendEnvironment, $urlMatcherFactoryProvider, $locationProvider, datepickerConfig,
                     datepickerPopupConfig, dreFrontendGlobalsProvider, $urlRouterProvider, $stateProvider) {
    //Enable/disable browser log console. Disable only for production release
    $logProvider.debugEnabled(dreFrontendEnvironment.enableDebugLog);
    $urlMatcherFactoryProvider.strictMode(false);
    $locationProvider.html5Mode(false);

    datepickerConfig.startingDay = 0;
    datepickerConfig.showWeeks = false;
    datepickerConfig.formatYear = 'yyyy';
    datepickerPopupConfig.datepickerPopup = dreFrontendGlobalsProvider.$get().dateFormat;
    datepickerPopupConfig.closeText = 'Close';
    //routes
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'views/controllers/main.html',
            controller: 'MainCtrl',
            data: {
                name: '',
                isPublic: true
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/controllers/login.html',
            controller: 'LoginCtrl',
            data: {
                name: 'Login',
                isPublic: true
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/controllers/register.html',
            controller: 'RegisterCtrl',
            data: {
                name: 'New User',
                isPublic: true
            }
        })
        .state('homeRoot', {
            url: '/home',
            templateUrl: 'views/controllers/home-root.html',
            abstract: true
        })
        .state('home', {
            url: '',
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
            url: '/record',
            parent: 'home',
            data: {
                name: 'My Records',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/record-menu.html"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/record-history.html",
                    controller: "RecordHistoryCtrl"
                }
            }
        })
        .state('record.medications', {
            url: '/medications',
            parent: 'record',
            data: {
                name: 'My Medications',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/record-menu.html"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/medications.html",
                    controller: "MedicationsCtrl"
                }
            }
        })
        .state('record.testresults', {
            url: '/results',
            parent: 'record',
            data: {
                name: 'My Results',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/record-menu.html"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/testresults.html",
                    controller: "TestresultsCtrl"
                }
            }
        })
        .state('record.encounters', {
            url: '/encounters',
            parent: 'record',
            data: {
                name: 'My Encounters',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/record-menu.html"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/encounters.html",
                    controller: "EncountersCtrl"
                }
            }
        })
        .state('record.conditions', {
            url: '/conditions',
            parent: 'record',
            data: {
                name: 'My Conditions',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/record-menu.html"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/conditions.html",
                    controller: "ConditionsCtrl"
                }
            }
        })
        .state('record.procedures', {
            url: '/procedures',
            parent: 'record',
            data: {
                name: 'My Procedures',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/record-menu.html"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/procedures.html",
                    controller: "ProceduresCtrl"
                }
            }
        })
        .state('record.vitals', {
            url: '/vitals',
            parent: 'record',
            data: {
                name: 'My Vitals',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/record-menu.html"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/vitals.html",
                    controller: "VitalsCtrl"
                }
            }
        })
        .state('record.immunizations', {
            url: '/immunizations',
            parent: 'record',
            data: {
                name: 'My Immunizations',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/record-menu.html"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/immunizations.html",
                    controller: "ImmunizationsCtrl"
                }
            }
        })
        .state('record.allergies', {
            url: '/allergies',
            parent: 'record',
            data: {
                name: 'My Allergies',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/record-menu.html"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/allergies.html",
                    controller: "AllergiesCtrl"
                }
            }
        })
        .state('notes', {
            url: '/notes',
            parent: 'home',
            data: {
                name: 'My Notes',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/notes-menu.html",
                    controller: "NotesMenuCtrl"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/notes.html",
                    controller: "NotesCtrl"
                }
            }
        })
        .state('notes', {
            url: '/{noteType}',
            parent: 'home',
            data: {
                name: 'My Notes',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {
                    templateUrl: "views/controllers/notes-menu.html",
                    controller: "NotesMenuCtrl"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/notes.html",
                    controller: "NotesCtrl"
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
        .state('record.matches', {
            url: '/matches',
            parent: 'record',
            data: {
                name: 'Review Updates',
                isPublic: false
            },
            views: {
                'homeMenu@homeRoot': {},
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/matches.html",
                    controller: "MatchesCtrl"
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
                    templateUrl: "views/controllers/profile-menu.html"
                },
                'pageBody@homeRoot': {
                    templateUrl: "views/controllers/profile.html",
                    controller: 'ProfileCtrl'
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
app.run(function ($rootScope, $state, dreFrontendAuthService, dreFrontEndPatientInfo, dreFrontendGlobals, dreFrontendNotesService) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeStart', function (e, to) {
        //if rule not defined
        if (!angular.isDefined(to.data.isPublic)) {
            return;
        }
        //Check auth
        //TODO maybe replace with function without promise
        dreFrontendAuthService.isAuthenticated().then(function (isAuthenticated) {
            //if private state and user is not authenticated
            if (!to.data.isPublic && !isAuthenticated) {
                e.preventDefault();
                $state.go('main');
            }
        });
    });
    $rootScope.$on(dreFrontendGlobals.authEvents.loggedIn, function (event, userId) {
        dreFrontEndPatientInfo.setPatientId(userId);
        dreFrontendNotesService.getAllNotes();
    });
    $rootScope.$on(dreFrontendGlobals.authEvents.loggedOut, function () {
        dreFrontEndPatientInfo.clearPatientData();
        dreFrontendNotesService.clearAllNotes();
    });
});
