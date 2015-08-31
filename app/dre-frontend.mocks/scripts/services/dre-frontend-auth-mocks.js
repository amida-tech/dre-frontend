'use strict';

angular.module('dreFrontend.mocks')
  .service('dreFrontendAuthMocks', function ($log, $q, $rootScope, $httpBackend) {
  return function(){
    $log.debug('start configure auth mocks');
    var isAuthenticated = true;
    var defaultUserName = 'isabella';
    //login
    $httpBackend.whenPOST('mock/login').respond(function (method, url, data) {
      var params = angular.fromJson(data);
      if (params.username.toLowerCase() == defaultUserName) {
        isAuthenticated = true;
        return [200, {}, {}];
      }
      return [401, 'Unauthorized'];
    });
    //logout
    $httpBackend.whenPOST('mock/logout').respond(function (method, url, data) {
      isAuthenticated = false;
      return [200, {}, {}];
    });
    //isAuthenticated
    $httpBackend.whenGET('mock/account').respond(function (method, url, data) {
      return [200, {authenticated: isAuthenticated}, {}];
    });
    //isFreeLogin
    $httpBackend.whenPOST('mock/users').respond(function (method, url, data) {
      var params = angular.fromJson(data);
      return [200, params.username.toLowerCase() == defaultUserName, {}];
    });
    //registerUser
    $httpBackend.whenPOST('mock/register').respond(function (method, url, data) {
      var params = angular.fromJson(data);
      defaultUserName = params.username.toLowerCase();
      return [200, true, {}];
    });
  }
  });
