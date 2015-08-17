'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
  .directive('mainMenu', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals) {
    return {
      templateUrl: 'views/directives/main-menu.html',
      restrict: 'AE',
      scope:{},
      controller: function ($scope) {
        $scope.model = {
          $state: $state,
          isAuthenticated: false,
          userName: 'Not Implemented',
          avatarUrl: 'images/img-demo.jpg'
        };
        $scope.logOut = function(){
          dreFrontendAuthService.logout().finally(function(){
            $state.go('main');
          })
        };
        var checkAuth = function () {
          dreFrontendAuthService.isAuthenticated().then(function (isAuthenticated) {
            $scope.model.isAuthenticated = isAuthenticated;
          });
        };
        checkAuth();
        var loggedInCleanEvent = $rootScope.$on(dreFrontendGlobals.authEvents.loggedIn, checkAuth);
        var loggedOutCleanEvent = $rootScope.$on(dreFrontendGlobals.authEvents.loggedOut, checkAuth);

        $scope.$on('$destroy', function () {
          loggedInCleanEvent();
          loggedOutCleanEvent();
        });
      }
    };
  });
