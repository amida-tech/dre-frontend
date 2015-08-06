'use strict';

angular.module('dreFrontend.util')
  .service('dreFrontendAuthService', function (dreFrontendHttp, $q) {
    var authData = null;
    var urls = {
      login: '/api/v1/login',
      logout: 'api/v1/logout',
      checkAuth: '/api/v1/account'
    };
    var self = {
      login: function (login, password) {
        return dreFrontendHttp({
          url: urls.login,
          data: {username: login, password: password},
          method: 'POST'
        }).then(function () {
          authData = {isAuthenticated : true};
          return true;
        }).catch(function () {
          authData = {isAuthenticated : false};
          return false;
        });
      },
      logout: function () {
        return dreFrontendHttp({
          url: urls.logout,
          method: 'POST'
        }).finally(function () {
          authData = {isAuthenticated : false};
          return true;
        });
      },
      isAuthenticated: function () {
        if (angular.isObject(authData)) {
          return $q.when(authData.isAuthenticated);
        }
        return dreFrontendHttp({
          url: urls.checkAuth,
          method: 'GET'
        }).then(function (d) {
            authData = {isAuthenticated : d.authenticated};
            return authData.isAuthenticated;
        }).catch(function () {
          authData = {isAuthenticated : false};
          return false;
        });
      }
    };
    return self;
  });
