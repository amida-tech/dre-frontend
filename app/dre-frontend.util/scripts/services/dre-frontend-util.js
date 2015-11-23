"use strict";

angular.module("dreFrontend.util")
    .factory("dreFrontendUtil", function ($injector, dreFrontendEnvironment, $filter, fhirEnv, $log) {
        var _capitalise = function (_str) {
            return _str.charAt(0).toUpperCase() + _str.substr(1).toLowerCase();
        };

        return {
            capitalise: _capitalise,
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
            formatFhirDate: function (dateString) {
                if (angular.isString(dateString)) {
                    var date = new Date(dateString);
                    if (date.getUTCHours() === 0 && date.getUTCMinutes() === 0 && date.getUTCSeconds() === 0) {
                        return $filter('date')(date, 'longDate');
                    } else {
                        return $filter('date')(date, 'MMM d, y h:mm a');
                    }
                } else {
                    return '';
                }
            },
            buildObjectByPath: function (path, val) {
                var p = path.slice(0);

                var f = function (_path) {
                    var n = _path.shift();

                    var res;
                    switch (typeof n) {
                        case "number":
                            res = [];
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
            isFhirResource: function (resourceType) {
                return fhirEnv.resourceTypes.hasOwnProperty(resourceType);
            },
            parseResourceReference: function (reference) {
                var expr = /(\w+)(\/[\w\d]+)(\/_history(\/\d+)?)?($|\"|\')/;
                var query = expr.exec(reference);
                if (!query) {
                    $log.debug(reference, query);
                    return [];
                } else {
                    return query[0].split('/');
                }
            },
            camelCaseToString: function (camelCase) {
                var words = camelCase.split(/(?=[A-Z])/);
                for (var i = 0; i < words.length; i++) {
                    words[i] = _capitalise(words[i]);
                }
                return words.join(' ');

            },
            asFhirObject: function (data) {
                if (data && data.resourceType) {
                    var Class;
                    var _name = 'Fhir' + _capitalise(data.resourceType);
                    try {
                        Class = $injector.get(_name);
                    } catch (e) {
                        $log.debug(_name + ' not found. Using FhirResource class');
                        Class = $injector.get('FhirResource');
                    }
                    data = new Class(data);
                }
                return data;
            },
            guessDataType: function (data) {
                var _length = data.length ? data.length : NaN;
                var _type = typeof data;
                var _date_delimeters = [':','-','/'];

                if (angular.isArray(data)) {
                    _type = 'array';
                } else if (!isNaN(data * 1)) {
                    _type = 'number';
                } else if (angular.isDate(data) || (_length > 6 && !isNaN(Date.parse(data)))){
                    _type = 'date';
//                } else if (angular.isString(data)) {
//                    _type = 'string';
                } else if (angular.isObject(data)) {
                    _type = 'object';
                }
                return _type;
            }
        };
    });
