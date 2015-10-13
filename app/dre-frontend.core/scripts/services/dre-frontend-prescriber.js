/**
 * Created by igi on 09.10.15.
 */
'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendPrescriberService', function (dreFrontendHttp, $q) {
        var errs = {
            "noState": "More than 100 matches found, please enter a state",
            "weakQuery": "More than 100 matches found, please adjust your search terms"
        };
        var urls = {
            findnpi: '/findnpi'
        };

        return {
            findnpi: function (req) {
                return dreFrontendHttp({
                    url: urls.findnpi,
                    data: {searchObj: req},
                    method: 'POST'
                }).then(function (resp) {
                    var res;
                    if (resp.length < 101) {
                        res = resp;
                    } else {
                        res = $q.reject((req.address) ? errs.weakQuery : errs.noState);
                    }
                    return res;
                });
            }
        };
    });
