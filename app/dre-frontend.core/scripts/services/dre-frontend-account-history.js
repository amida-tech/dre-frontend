'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendAccountHistoryService', function (dreFrontendHttp) {
        var urls = {
            master: '/account_history/master'
        };
        return {
            getLastMasterActions: function () {
                return dreFrontendHttp({
                    url: urls.master,
                    method: 'GET'
                });
            }
        };
    });
