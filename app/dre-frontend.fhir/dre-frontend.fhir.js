'use strict';
angular.module('dreFrontend.fhir', ['restangular','dreFrontend.util'])
    .config(function (RestangularProvider,dreFrontendEnvironment, dreFrontendFhirServiceProvider,fhirEnv) {
      RestangularProvider.setBaseUrl(dreFrontendEnvironment.fhirServerUrl);
      dreFrontendFhirServiceProvider.setCount(fhirEnv.page_length);
  });
