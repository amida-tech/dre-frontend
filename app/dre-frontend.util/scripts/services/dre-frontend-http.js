'use strict';

angular.module('dreFrontend.util')
  .factory('dreFrontendHttp', function ($http, $log, $q, $rootScope, dreFrontendGlobals, dreFrontendEnvironment) {

    var defaults = {
      cache: false,
      withCredentials: false
    };

    var buildServiceUrl = function (apiPath) {
      return dreFrontendEnvironment.baseServerUrl + apiPath;
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
          return $q.reject(d.data);

        },
        function (e) {
          $log.debug('http failure(' + options.url + '):', options);
          $log.debug(e);
          return $q.reject(e.data);
        }
      )
    }
  });