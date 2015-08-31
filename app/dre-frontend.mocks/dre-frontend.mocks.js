'use strict';
angular.module('dreFrontend.mocks', ['ngMockE2E'])
  .run(function ($log, $q, $rootScope, $httpBackend, dreFrontendAuthMocks,dreFrontendFhirMocks,dreFrontendNotesMocks) {
    dreFrontendAuthMocks();
    dreFrontendNotesMocks();
    dreFrontendFhirMocks();
    //Pass requests for real server side
    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
  });
