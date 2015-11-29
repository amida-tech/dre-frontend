"use strict";

angular.module("dreFrontend.util")
    .factory("dreFrontendUtil", function ($injector, dreFrontendEnvironment, $filter, fhirEnv, dreFrontendGlobals, $log) {
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
                    var _name = 'Fhir' + data.resourceType;
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
                var _length;

                if (data && data.length) {
                    _length = data.length;
                } else {
                    _length = null;
                }

                var _type = typeof data;
                var _full_dt = new RegExp("^\\d{2,4}([-\\.\\/])\\d{1,2}\\1\\d{1,2}([T\\ ]\\d{2}(:\\d{2}){1,2})?");
                var _short_dt = /\d{2,4}([-\.\/])\d{1,2}\1\d{1,4}/;

                if (_type !== 'function') {
                    if (angular.isArray(data)) {
                        _type = 'array';
                    } else if (!isNaN(data * 1)) {
                        _type = 'number';
                    } else if (angular.isString(data)) {
                        if (angular.isDate(data) || data.match && (data.match(_short_dt) || data.match(_full_dt))) {
                            _type = 'date';
                        } else {
                            _type = 'string';
                        }
                    } else if (angular.isObject(data)) {
                        _type = 'object';
                    }
                }
                return _type;
            },
            encodeSystemURL: function (url) {
                var _res = dreFrontendGlobals.systemCodes[url];

                if (!_res) {
                    return 'UNKNOWN';
                } else {
                    return _res;
                }
            },
            reorderObjectFields: function (_obj, objType) {
                var _keys = dreFrontendGlobals.fieldsOrder[objType];
                if (_keys) {
                    var res = {};
                    angular.forEach(_keys, function (_key) {
                        if (_obj[_key]) {
                            res[_key] = _obj[_key];
                        }
                    });
                    angular.extend(res, _obj);
                    return res;
                }
            }
        };
    });
