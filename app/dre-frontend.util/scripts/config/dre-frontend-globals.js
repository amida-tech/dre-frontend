'use strict';

angular.module('dreFrontend.util')
  .provider('dreFrontendGlobals', function () {
    var self = {};
    //Default date format
    self.dateFormat = 'MM/dd/yyyy';

    self.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    self.defaultErrorMessage = 'An error occurred.';
    self.authEvents = {
      loggedIn: 'dreFrontend:LoggedIn',
      loggedOut: 'dreFrontend:LoggedOut',
      inProcess: 'dreFrontend:InProcess',
      notLoggedInError: 'dreFrontend:LoggedInError'
    };
    this.$get = function () {
      return self;
    };
  });
