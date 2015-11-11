'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendMergeService', function ($q, $http, _, dreFrontendHttp, dreFrontendUtil, $log) {

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
            var _res = match.rhs;
            $log.debug(match, _res);
            var f = function (change) {
                if (angular.isArray(change)) {
                    angular.forEach(change, f);
                } else if (angular.isObject(change) && change.apply) {
                    if (change.path) {
                        var l = dreFrontendUtil.buildObjectByPath(change.path, change.rhs);
                        $log.debug(l, change);
                    } else {
                        $log.debug("no path", change);
                    }
                }
            };

            if (match.changes) {
                angular.forEach(match.changes, f);
            }
            $log.debug(_res);
            return _res;
        }

        return {
            getList: function (user_id, force) {
                if (force || !matches) {
                    return dreFrontendHttp({url: urls.list + user_id, method: 'GET'})
                        .then(function (resp) {
                            matches = _.filter(resp, {changeType: "update"});
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
//                $log.debug(match,_resource);
                return $q.reject("not done yet");
                /*
                 return dreFrontendHttp({
                 method: 'POST',
                 data: {body: _resource},
                 url: urls.replace + '/' + match.lhs.id
                 });
                 */
            }
        }
    });
