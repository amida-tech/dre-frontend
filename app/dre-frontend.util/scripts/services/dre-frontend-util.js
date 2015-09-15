"use strict";

angular.module("dreFrontend.util")
    .factory("dreFrontendUtil", function (dreFrontendEnvironment, $filter) {
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
            },
            formatFhirDate: function(dateString){
                if(angular.isString(dateString)){
                    var date = new Date(dateString);
                    if(date.getUTCHours() == 0 && date.getUTCMinutes() == 0 && date.getUTCSeconds() == 0){
                        return $filter('date')(date, 'longDate');
                    }else{
                        return $filter('date')(date, 'MMM d, y h:mm a');
                    }
                }else{
                    return '';
                }
            }

        };
    });
