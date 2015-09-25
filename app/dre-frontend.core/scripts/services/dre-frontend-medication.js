'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendMedicationService', function (dreFrontendHttp, _) {
        var urls = {
            rximage: '/rximage',
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
                    if (angular.isObject(response.feed) &&angular.isArray(response.feed.entry)) {
                        var linksArray = [];
                        _.forEach(response.feed.entry, function (item) {
                            if (angular.isArray(item.link)) {
                                linksArray = _.union(linksArray,item.link);
                            }
                        });
                        return linksArray;
                    }
                    return [];
                });
            }
        };
        return self;
    });
