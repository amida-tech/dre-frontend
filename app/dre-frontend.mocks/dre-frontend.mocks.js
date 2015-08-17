'use strict';
angular.module('dreFrontend.mocks', ['ngMockE2E'])
  .run(function ($log, $q, $rootScope, $httpBackend, dreFrontendAuthMocks) {
    dreFrontendAuthMocks();
    //Pass requests for real server side
    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
  });
