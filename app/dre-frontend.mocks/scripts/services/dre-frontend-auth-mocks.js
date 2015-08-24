'use strict';

angular.module('dreFrontend.mocks')
  .service('dreFrontendAuthMocks', function ($log, $q, $rootScope, $httpBackend) {
  return function(){
    $log.debug('start configure auth mocks');
    var isAuthenticated = true;
    var defaultUserName = 'isabella';
    //login
    $httpBackend.whenPOST('mock/api/v1/login').respond(function (method, url, data) {
      var params = angular.fromJson(data);
      if (params.username.toLowerCase() == defaultUserName) {
        isAuthenticated = true;
        return [200, {}, {}];
      }
      return [401, 'Unauthorized'];
    });
    //logout
    $httpBackend.whenPOST('mock/api/v1/logout').respond(function (method, url, data) {
      isAuthenticated = false;
      return [200, {}, {}];
    });
    //isAuthenticated
    $httpBackend.whenGET('mock/api/v1/account').respond(function (method, url, data) {
      return [200, {authenticated: isAuthenticated}, {}];
    });
    //isFreeLogin
    $httpBackend.whenPOST('mock/api/v1/users').respond(function (method, url, data) {
      var params = angular.fromJson(data);
      return [200, params.username.toLowerCase() == defaultUserName, {}];
    });
    //registerUser
    $httpBackend.whenPOST('mock/api/v1/register').respond(function (method, url, data) {
      var params = angular.fromJson(data);
      defaultUserName = params.username.toLowerCase();
      return [200, true, {}];
    });
  }
  });
