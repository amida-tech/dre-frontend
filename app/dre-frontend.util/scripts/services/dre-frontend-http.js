'use strict';

angular.module('dreFrontend.util')
    .factory('dreFrontendHttp', function ($http, $log, $q, dreFrontendUtil) {

        var defaults = {
            cache: false,
            withCredentials: true
        };

        return function (options) {
            //build service url
            options.url = dreFrontendUtil.buildServiceUrl(options.url);

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
            );
        };
    });
