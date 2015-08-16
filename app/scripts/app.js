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
    'ngTouch','ngMessages']);
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
        name: 'My PHR',
        isPublic: true
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/controllers/login.html',
      controller: 'LoginCtrl',
      data: {
        name: 'My PHR | Login',
        isPublic: true
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/controllers/register.html',
      controller: 'RegisterCtrl',
      data: {
        name: 'My PHR | New User',
        isPublic: true
      }
    })
    .state('home', {
      url: '/home',
      templateUrl: 'views/controllers/home.html',
      controller: 'HomeCtrl',
      data: {
        name: 'My PHR | Home',
        isPublic: true//todo after ready set private
      }
    })
    .state('record', {
      url: '/record',
      templateUrl: 'views/controllers/record.html',
      controller: 'RecordCtrl',
      data: {
        name: 'My PHR',
        isPublic: true//todo after ready set private
      }
    })
    .state('fhir', {
      url: '/fhir',
      templateUrl: '../views/controllers/fhir.html',
      controller: 'FhirCtrl',
      data: {
        name: 'My PHR | FHIR',
        isPublic: true
      }
    });
  $urlRouterProvider.otherwise('/');

});
app.run(function ($rootScope, $state, dreFrontendAuthService) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));

  $rootScope.$on('$stateChangeStart', function (e, to) {
   //if rule not defined
    if (!angular.isDefined(to.data.isPublic)) return;
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
});