"use strict";

angular.module("dreFrontend.util")
  .service("dreFronendUtil",[function () {
    angular.extend(this, {
        capitalise: function(_str) {
          return _str.charAt(0).toUpperCase() + _str.substr(1).toLowerCase();
        }
      }
    );
  }]);
