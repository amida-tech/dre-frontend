'use strict';

angular.module('dreFrontend.util')
  .factory('dreFrontendHttp', function ($http, $log, $q, $rootScope, dreFrontendGlobals, dreFrontendEnvironment) {

    var defaults = {
      cache: false,
      withCredentials: true
    };

    var msgs = {
      defaultNetwork: 'Network or server error. Please try again or call helpdesk.'
    };
    var buildServiceUrl = function (apiPath) {
      return dreFrontendEnvironment.serverUrl + apiPath;
    };
    return function (options) {
      //build service url
      options.url = buildServiceUrl(options.url);

      return $http(angular.extend(angular.copy(defaults), options)).then(
        function (d) {
          $log.debug('http success (' + options.url + '):', options);
          $log.debug(d);
          if (d.status === 200) {
            return d.data;
          }
          return $q.reject(msgs.defaultNetwork);

        },
        function (e) {
          $log.debug('http failure(' + options.url + '):', options);
          $log.debug(e);
          return $q.reject(msgs.defaultNetwork);
        }
      )
    }
  });
