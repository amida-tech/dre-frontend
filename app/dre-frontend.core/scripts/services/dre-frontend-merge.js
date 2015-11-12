'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendMergeService', function ($q, $http, _, dreFrontendHttp, dreFrontendUtil,
                                                  dreFrontendEnvironment, dreFrontendEntryService, $log) {

        var matches = null;
        var mocked = null;

        var urls = {
            list: '/merge/',
            mocked: '/mock/diff/b-0',
            problems: '/matches/problems/',
            social_hist: '/matches/social_history/',
            replace: '/replace'
        };

        function _apply(match) {
            var lhs, rhs;
            lhs = match.lhs;
            rhs = match.rhs;

            if (match.changes) {
                angular.forEach(match.changes, function (change) {
                    if (change.apply) {
                        DeepDiff.applyChange(lhs, rhs, change);
                    }
                });
            }
            return match.lhs;
        }

        var _swapChange = function (change) {
            if (angular.isArray(change)) {
                angular.forEach(change, _prepareChangeModel);
            } else {
                switch (change.kind) {
                    case 'N':
                        change.kind = 'D';
                        break;
                    case 'D':
                        change.kind = 'N';
                        break;
                }
                var tmp = change.rhs;
                change.rhs = change.lhs;
                change.lhs = tmp;
            }
        };

        var _prepareChangeModel = function (change) {

            if (angular.isArray(change)) {
                angular.forEach(change, _prepareChangeModel);
            } else if (angular.isObject(change) && !change.model) {
                if (change.path) {
                    var path = dreFrontendUtil.buildObjectByPath(change.path, "");
                    var lhs, rhs;
                    lhs = change.lhs;
                    rhs = change.rhs;
                    change.apply = false;
                    change.model = {
                        path: dreFrontendEntryService.buildTable(path, []),
                        lhs: dreFrontendEntryService.buildTable(lhs, []),
                        rhs: dreFrontendEntryService.buildTable(rhs, [])
                    };
                } else {
                    $log.debug("no path", change);
                }
            }
        };

        return {
            getList: function (user_id, force) {
                if (force || !matches) {
                    return dreFrontendHttp({url: urls.list + user_id, method: 'GET'})
                        .then(function (resp) {
                            matches = _.filter(resp, {changeType: "update"});
                            if (dreFrontendEnvironment.swapDiff) {
                                angular.forEach(matches, function(match){
                                   angular.forEach(match.changes, _swapChange);
                                });
                            }
                            return matches;
                        });
                } else {
                    return $q.resolve(matches);
                }
            },

            getMockData: function () {
                if (!mocked) {
                    return $http({url: urls.mocked, method: 'GET'})
                        .then(function (resp) {
                            if (resp.data) {
                                mocked = resp.data;
                                return mocked;
                            }
                        });
                } else {
                    $q.resolve(mocked);
                }
            },
            replace: function (resourceType, primaryId, duplicateId) {
                var url_parts = [urls.replace, resourceType, primaryId, duplicateId];
                return dreFrontendHttp({
                    method: 'GET',
                    url: url_parts.join('/')
                });
            },
            update: function (match) {
                var _resource = _apply(match);

                 return dreFrontendHttp({
                 method: 'POST',
                 data: {body: _resource},
                 url: urls.replace + '/' + match.rhs.id
                 });
            },
            prepareChangeModel: _prepareChangeModel
        }
    });
