'use strict';

angular.module('dreFrontend.util')
  .service('dreFrontendAccountHistoryService', function (dreFrontendHttp, $q, dreFrontendGlobals, $rootScope,$log) {
    var urls = {
      master: '/account_history/master'
    };
    var self = {
      getLastMasterActions: function () {
        return dreFrontendHttp({
          url: urls.master,
          method: 'GET'
        });
      }
    };
    return self;
  });
