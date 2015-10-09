'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendMedicationService', function (dreFrontendHttp, _, $q) {
        var urls = {
            rximage: '/rximage',
            rxspelling: '/rxnorm/spelling',
            rxname: '/rxnorm/name',
            rxgroup: '/rxnorm/group',
            adverse: '/openfda/code',
            medline: '/medlineplus'
        };

        var self = {
            getRxcuiCode: function (medication) {
                if (angular.isObject(medication) && angular.isObject(medication.code) && angular.isArray(medication.code.coding)) {
                    return _.get(_.find(medication.code.coding, {system: 'http://www.nlm.nih.gov/research/umls/rxnorm'}), 'code');
                }
                return undefined;
            },
            getMedname: function (medication) {
                if (angular.isObject(medication) && angular.isObject(medication.code) && angular.isArray(medication.code.coding)) {
                    return _.get(_.find(medication.code.coding, {system: 'http://www.nlm.nih.gov/research/umls/rxnorm'}), 'display');
                }
                return undefined;
            },

            getRxImages: function (rxcode, medname) {
                return dreFrontendHttp({
                    url: urls.rximage,
                    data: {rxcui: rxcode, medname: medname},
                    method: 'POST'
                }).then(function (response) {
                    if (angular.isArray(response.nlmRxImages)) {
                        return _.pluck(response.nlmRxImages, 'imageUrl');
                    }
                    return [];
                });
            },

            getAdverseEvents: function (rxcode, medname) {
                return dreFrontendHttp({
                    url: urls.adverse,
                    data: {rxcui: rxcode, medname: medname},
                    method: 'POST'
                }).then(function (response) {
                    if (angular.isArray(response.results)) {
                        return response.results;
                    }
                    return [];
                });
            },

            getMedlineInfo: function (rxcode, medname) {
                return dreFrontendHttp({
                    url: urls.medline,
                    data: {rxcui: rxcode, medname: medname},
                    method: 'POST'
                }).then(function (response) {
                    if (angular.isObject(response.feed) && angular.isArray(response.feed.entry)) {
                        var linksArray = [];
                        _.forEach(response.feed.entry, function (item) {
                            if (angular.isArray(item.link)) {
                                linksArray = _.union(linksArray, item.link);
                            }
                        });
                        return linksArray;
                    }
                    return [];
                });
            },

            getSpelling: function (medname) {
                return dreFrontendHttp({
                    url: urls.rxspelling,
                    method: 'POST',
                    data: {medname: medname}
                }).then(function (res) {
                    var _var = res.suggestionGroup;

                    if (_var) {
                        _var = _var.suggestionList;
                    }

                    if (_var) {
                        _var = _var.suggestion;
                    }

                    if (_var && _var.length > 0) {
                        return _var;
                    } else {
                        return $q.reject("No spelling suggestions");
                    }
                });
            },

            getNames: function (medname) {
                return dreFrontendHttp({
                    url: urls.rxname,
                    method: 'POST',
                    data: {medname: medname}
                }).then(function (res) {
                    if (!res.rxnormId) {
                        return $q.reject("Name data for '" + medname + "' not found");
                    } else {
                        return res;
                    }
                });
            },

            getGroup: function (medname) {
                return dreFrontendHttp({
                    url: urls.rxgroup,
                    method: 'POST',
                    data: {medname: medname}
                }).then(function (res) {
                    if (res.drugGroup.conceptGroup) {
                        return res;
                    } else {
                        return $q.reject("Group data for '" + medname + "' not found");
                    }
                });
            }
        };
        return self;
    });
