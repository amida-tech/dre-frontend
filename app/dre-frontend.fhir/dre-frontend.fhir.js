'use strict';
angular.module('dreFrontend.fhir', ['restangular','dreFrontend.util'])
    .config(function (RestangularProvider,dreFrontendEnvironment, dreFrontendFhirServiceProvider) {
      RestangularProvider.setBaseUrl(dreFrontendEnvironment.fhirServerUrl);
      dreFrontendFhirServiceProvider.setCount(30);
  });
