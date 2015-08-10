'use strict';
angular.module('dreFrontend.fhir', ['restangular','dreFrontend.util'])
    .config(function (RestangularProvider,dreFrontendEnvironment) {
      RestangularProvider.setBaseUrl(dreFrontendEnvironment.fhirServerUrl);
  });
