'use strict';

angular.module('dreFrontend.util')
  .service('dreFrontendAuthService', function (dreFrontendHttp, $q, dreFrontendGlobals, $rootScope,$log) {
    var authData = null;
    var urls = {
      login: '/api/v1/login',
      logout: '/api/v1/logout',
      checkAuth: '/api/v1/account',
      validateLogin: '/api/v1/users',
      register: '/api/v1/register'
    };
    var self = {
      login: function (login, password) {
        $rootScope.$emit(dreFrontendGlobals.authEvents.inProcess);
        return dreFrontendHttp({
          url: urls.login,
          data: {username: login, password: password},
          method: 'POST'
        }).then(function () {
          authData = {
            isAuthenticated: true
          };
          $rootScope.$emit(dreFrontendGlobals.authEvents.loggedIn);
          return true;
        }).catch(function () {
          authData = {
            isAuthenticated: false
          };
          $rootScope.$emit(dreFrontendGlobals.authEvents.loggedOut);
          return $q.reject(false);
        });
      },
      logout: function () {
        $rootScope.$emit(dreFrontendGlobals.authEvents.inProcess);
        return dreFrontendHttp({
          url: urls.logout,
          method: 'POST'
        }).finally(function () {
          authData = {
            isAuthenticated: false
          };
          $rootScope.$emit(dreFrontendGlobals.authEvents.loggedOut);
          return true;
        });
      },
      isAuthenticated: function (force) {
        if (angular.isObject(authData) && !force) {
          return $q.when(authData.isAuthenticated);
        }
        return dreFrontendHttp({
          url: urls.checkAuth,
          method: 'GET'
        }).then(function (d) {
          var origState = angular.isObject(authData) && authData.isAuthenticated;
          authData = {isAuthenticated: d.authenticated};
          if (authData.isAuthenticated != origState) {
            $rootScope.$emit(authData.isAuthenticated ? dreFrontendGlobals.authEvents.loggedIn : dreFrontendGlobals.authEvents.loggedOut);
          }
          return authData.isAuthenticated;
        }).catch(function () {
          authData = {
            isAuthenticated: false
          };
          return false;
        });
      },
      isFreeLogin: function (login) {
        return dreFrontendHttp({
          url: urls.validateLogin,
          data: {username: login},
          method: 'POST'
        }).then(function (used) {
          return !used;
        }).catch(function () {
          return false;
        });
      },
      registerUser: function (username,password,email,firstName,middleName,lastName,dob,gender) {
        return dreFrontendHttp({
          url: urls.register,
          data: {
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            dob: dob,
            gender: gender
          },
          method: 'POST'
        }).then(function () {
          return true;
        }).catch(function (error) {
          $log.debug('$log',error);
          return $q.reject(error.message);
        });
      }
    };
    return self;
  });
