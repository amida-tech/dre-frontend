'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
  .directive('homeBreadcrumbs', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals) {
    return {
      templateUrl: 'views/directives/home-breadcrumbs.html',
      restrict: 'AE',
      scope: {},
      controller: function ($scope) {
        $scope.model = {
          parents: [],
          currentPage: $state.current.data.name
        };
        var state = $state.$current.parent;
        while (angular.isDefined(state)) {
          if (state.data && state.data.name) {
            $scope.model.parents.unshift({
              route: state.name,
              name: state.data.name
            });
          }
          state = state.parent;
        }
      }
    };
  });
