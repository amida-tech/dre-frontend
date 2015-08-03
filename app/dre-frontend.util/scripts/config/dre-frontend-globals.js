'use strict';

angular.module('dreFrontend.util')
  .provider('dreFrontendGlobals', function () {
    var self = {};
    //Default date format
    self.dateFormat = 'MM/dd/yyyy';

    self.defaultErrorMessage = 'An error occurred.';

    this.$get = function () {
      return self;
    };
  });
