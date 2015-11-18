'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendMergeService', function ($q, $http, _, dreFrontendHttp, dreFrontendUtil,
                                                  dreFrontendEnvironment, dreFrontendEntryService,
                                                  $rootScope, $log) {

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

        var _getList = function () {
            if (matches) {
                return $q.resolve(matches);
            } else {
                return $q.reject("no data");
            }
        };

        var _setList = function (_matches) {
            matches = _matches;
        };

        var _removeMatch = function (match) {
            _.pull(matches, match);
            return matches;
        };

        var _format_matches = function (src_matches) {
            var res = {
                matches: [],
                qty: null
            };
            if (src_matches) {
                if (angular.isArray(src_matches)) {
                    res.matches = src_matches;
                    res.qty = src_matches.length;
                } else {
                    if (src_matches.hasOwnProperty("changeType")) {
                        res.matches.push(src_matches);
                    } else {
                        angular.forEach(src_matches, function (_body, _key) {
                            if (_key && dreFrontendUtil.isFhirResource(_key)) {
                                res.matches = res.matches.concat(_body)
                            }
                        });
                    }
                }
                res.qty = res.matches.length;
            }
            return res;
        };

        return {
            getList: _getList,
            setList: _setList,
            removeFromList: _removeMatch,
            formatList: _format_matches,
            getListByPatientId: function (user_id, force) {
                if (force || !matches) {
                    return dreFrontendHttp({url: urls.list + user_id, method: 'GET'})
                        .then(function (resp) {
                            matches = _.filter(resp, {changeType: "update"});
                            if (dreFrontendEnvironment.swapDiff) {
                                angular.forEach(matches, function (match) {
                                    angular.forEach(match.changes, _swapChange);
                                });
                            }
                            return matches;
                        });
                } else {
                    return _getList();
                }
            },

            getMockData: function () {
                if (!mocked) {
                    return $http({url: urls.mocked, method: 'GET'})
                        .then(function (resp) {
                            if (resp.data) {
                                mocked = [];
                                angular.forEach(resp.data, function (restypeArr) {
                                    angular.forEach(restypeArr, function (diff) {
                                        if (diff.changeType === 'update') {
                                            if (dreFrontendEnvironment.swapDiff) {
                                                angular.forEach(diff.changes, _swapChange);
                                            }
                                            mocked.push(diff);
                                        }
                                    });
                                });
                                $log.debug(mocked);
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
                return dreFrontendHttp({
                    method: 'POST',
                    data: _apply(match),
                    url: urls.replace + '/' + match.rhs.id
                });
            },
            prepareChangeModel: _prepareChangeModel
        }
    });
