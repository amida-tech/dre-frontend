"use strict";

angular.module("dreFrontend.util")
    .factory("dreFrontendUtil", function (dreFrontendEnvironment) {
        return {
            capitalise: function (_str) {
                return _str.charAt(0).toUpperCase() + _str.substr(1).toLowerCase();
            },
            buildServiceUrl: function (api_path) {
                return dreFrontendEnvironment.baseServerUrl + api_path;
            },
            getURLparams: function (url) {
                var res = {};
                var params = url.slice(url.indexOf('?') + 1).split('&');
                for (var i = 0; i < params.length; i++) {
                    var param = params[i].split('=');
                    res[param[0]] = param[1];
                }
                return res;
            }

        };
    });
