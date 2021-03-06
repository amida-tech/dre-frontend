'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendMergeService', function ($rootScope, $q, $http, _, dreFrontendHttp, dreFrontendUtil,
                                                  dreFrontendEnvironment, dreFrontendGlobals, $log) {

        var matches = null;

        var urls = {
            list: '/merge/',
            mocked: '/mock/diff/b-0',
            problems: '/matches/problems/',
            social_hist: '/matches/social_history/',
            replace: '/replace'
        };

        var _filter = function (resp) {
            var _knowResources = _.map(dreFrontendGlobals.resourceTypes, 'fhirType');
            var res = _.filter(resp, function (match) {
                var _allow = match.changeType === 'update';
                var _resourceTypeName = match.lhs ? match.lhs.resourceType : 'resource';

                _allow = _allow && _.includes(_knowResources, _resourceTypeName);

                if (_allow) {
                    match.lhs = dreFrontendUtil.asFhirObject(match.lhs);
                    match.rhs = dreFrontendUtil.asFhirObject(match.rhs);
                }

                return _allow;
            });

            if (dreFrontendEnvironment.swapDiff) {
                angular.forEach(res, function (match) {
                    angular.forEach(match.changes, _swapChange);
                });
            }
            matches = res;
            return res;
        };

        function _apply(match) {
            var lhs, rhs;
            lhs = match.lhs;
            rhs = match.rhs;

            if (match.changes) {
                angular.forEach(match.changes, function (change) {
                    if (change.apply && window.DeepDiff) {
                        window.DeepDiff.applyChange(lhs, rhs, change);
                    }
                });
            }
            return match.lhs;
        }

        var _swapChange = function (change) {
            if (angular.isArray(change)) {
                angular.forEach(change, _swapChange);
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

        var _formatMatches = function (src_matches) {
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
                                res.matches = res.matches.concat(_body);
                            }
                        });
                    }
                }
                res.qty = res.matches.length;
            }
            return res;
        };

        var _clearData = function () {
            matches = null;
        };

        var _addNotMatchExt = function (resource, matchedResourceId) {
            if (!resource.extension) {
                resource.extension = [];
            }
            resource.extension.push({
                "url": 'http://amida-tech.com/fhir/extensions/mismatch',
                'valueString': matchedResourceId
            });
        };

        var _ignoreMatch = function (match) {
            _addNotMatchExt(match.lhs, match.rhs.id);
            _addNotMatchExt(match.rhs, match.lhs.id);

            $log.debug(match.lhs, match.rhs);

            var queue = [];

            queue.push(match.lhs.save());
            queue.push(match.rhs.save());

            return $q.all(queue);
        };

        return {
            getList: _getList,
            setList: _setList,
            removeFromList: _removeMatch,
            formatList: _formatMatches,
            getListByPatientId: function (user_id, force) {
                if (force || !matches) {
                    return dreFrontendHttp({url: urls.list + user_id, method: 'GET'})
                        .then(_filter);
                } else {
                    return _getList();
                }
            },

            getMockData: function () {
                if (!matches) {
                    return $http({url: urls.mocked, method: 'GET'})
                        .then(function (resp) {
                            if (resp.data) {
                                var _data = [];
                                angular.forEach(resp.data, function (restypeArr) {
                                    angular.forEach(restypeArr, function (diff) {
                                        _data.push(diff);
                                    });
                                });
                                return _filter(_data);
                            }
                        });
                } else {
                    return _getList();
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
            ignore: _ignoreMatch,
            clear: _clearData
        };
    });
