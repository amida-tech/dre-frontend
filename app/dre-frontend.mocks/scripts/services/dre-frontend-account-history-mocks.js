'use strict';

angular.module('dreFrontend.mocks')
  .service('dreFrontendAccountHistoryMocks', function ($log, $q, $rootScope, $httpBackend, _) {
    return function () {
      $log.debug('start configure account history mocks');
      var history = {
        "recordHistory": [{
          "type": "Logged in",
          "date": "2015-09-02T02:09:51.877Z",
          "event_type": "loggedIn",
          "note": "User logged in from IP address '158.46.35.150'"
        }, {
          "type": "Logged in",
          "date": "2015-09-01T18:19:35.511Z",
          "event_type": "loggedIn",
          "note": "User logged in from IP address '158.46.35.150'"
        }, {
          "type": "Patient-entered medications changed",
          "date": "2015-08-31T18:43:26.173Z",
          "event_type": "medUpdate",
          "note": "User updated medications"
        }, {
          "type": "File downloaded",
          "date": "2015-08-31T18:28:36.365Z",
          "event_type": "fileDownloaded",
          "note": "User downloaded 'bluebutton-duplicate.xml' from My Files"
        }, {
          "type": "File downloaded",
          "date": "2015-08-31T18:28:35.134Z",
          "event_type": "fileDownloaded",
          "note": "User downloaded 'bluebutton-cms.txt' from My Files"
        }, {
          "type": "File uploaded",
          "date": "2015-08-31T16:58:27.795Z",
          "event_type": "fileUploaded",
          "note": "User uploaded 'bluebutton-duplicate.xml"
        }, {
          "type": "File uploaded",
          "date": "2015-08-31T16:58:27.328Z",
          "event_type": "fileUploaded",
          "note": "User uploaded 'bluebutton-primary.xml"
        }, {
          "type": "File uploaded",
          "date": "2015-08-31T16:58:26.723Z",
          "event_type": "fileUploaded",
          "note": "User uploaded 'bluebutton-duplicate.xml"
        }, {
          "type": "Account created",
          "date": "2015-08-31T16:58:26.590Z",
          "event_type": "initAccount",
          "note": "User created account 'isabella'"
        }], "lastLogin": "2015-09-01T18:19:35.511Z", "lastUpdate": "2015-08-31T16:58:27.795Z"
      };
      //getLastMasterActions
      $httpBackend.whenGET('mock/account_history/master').respond(function (method, url, data) {
        return [200, history, {}];
      });
    }
  });
