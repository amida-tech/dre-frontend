"use strict";

angular.module("dreFrontend.util")
    .factory("dreFrontendUtil", function (dreFrontendEnvironment, $filter, fhirEnv) {
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
            },
            buildObjectByPath: function(path, val) {
                var res, prev, current;
                var p = path.slice(0);

                var f = function (_path) {
                    var n = _path.shift();

                    var res;
                    switch (typeof n) {
                        case "number":
                            res=[];
                            res[n] = f(_path);
                            break;
                        case "string":
                            res = {};
                            res[n] = f(_path);
                            break;
                        default:
                            res = val;
                    }

                    return res;
                };

                return f(p);
            },
            isFhirResource: function(resourceType) {
                return fhirEnv.resourceTypes.hasOwnProperty(resourceType);
            },
            parseResourceReference: function(reference) {
                var expr = /([\w\d]+?\/){2}(_history)?\/.+?$/;
                var query = expr.exec(reference);

                return  query[0].split('/');
            }
        };
    });
