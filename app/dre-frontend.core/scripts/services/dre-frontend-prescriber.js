/**
 * Created by igi on 09.10.15.
 */
'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendPrescriberService', function (dreFrontendHttp, _, $q) {
        var urls = {
            findnpi: '/findnpi'
        };

        return {
            findnpi: function (data) {
                return dreFrontendHttp({
                    url: urls.findnpi,
                    data: data,
                    method: 'POST'
                }).then(function (resp) {

                    return resp;
                });
            }
        };
    });
