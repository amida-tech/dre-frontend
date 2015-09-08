"use strict";

angular.module("dreFrontend.util")
    .factory("dreFrontendUtil", function (dreFrontendEnvironment) {
        return {
            capitalise: function (_str) {
                return _str.charAt(0).toUpperCase() + _str.substr(1).toLowerCase();
            },
            buildServiceUrl: function (api_path) {
                return dreFrontendEnvironment.baseServerUrl + api_path;
            }
        };
    });
