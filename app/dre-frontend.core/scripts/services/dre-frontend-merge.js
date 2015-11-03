'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendMergeService', function (dreFrontendHttp, $q, $http, _) {

        var matches = null;
        var mocked = null;

        var urls = {
            list: '/merge/',
            mocked: '/mock/diff/b-0',
            problems: '/matches/problems/',
            social_hist: '/matches/social_history/'
        };

        return {
            getList: function (user_id, force) {
                if (force || !matches) {
                    return dreFrontendHttp({url: urls.list + user_id, method: 'GET'})
                        .then(function(resp){
                            matches = _.filter(resp, {changeType: "update"});
                            return matches;
                        });
                } else {
                    return $q.resolve(matches);
                }
            },

            getMockData: function() {
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
            ignoreMatch: function(user_id, match_data) {

            },
            createMatch: function(user_id, match_data) {

            },
            applyChanges: function(user_id, match_data) {

            }
        }
    });
