'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('entryDetailsItem', function () {
        return {
            restrict: "AE",
            replace: true,
            scope: {
                entryDetailsItem: '='
            },
            template: "<table class='table table-condensed'>" +
            "<tr ng-repeat='member in entryDetailsItem' entry-details-item-member='member'></tr>" +
            "</table>"
        }
    }).directive('entryDetailsItemMember', function ($compile) {
        return {
            restrict: "AE",
            scope: {
                entryDetailsItemMember: '='
            },
            template: "",
            link: function ($scope, element) {

                if (angular.isObject($scope.entryDetailsItemMember)) {
                    if ($scope.entryDetailsItemMember.type == 'string') {
                        element.append(
                            "<td><strong ng-bind='entryDetailsItemMember.label'></strong></td>" +
                            "<td><span>{{entryDetailsItemMember.value}}</span></td>"
                            );
                        $compile(element.contents())($scope)
                    }
                    if ($scope.entryDetailsItemMember.type == 'object') {
                        element.append(
                            "<td><strong ng-bind='entryDetailsItemMember.label'></strong></td>" +
                            "<td><div entry-details-item='entryDetailsItemMember.value'></div></td>"
                            );
                        $compile(element.contents())($scope)
                    }
                    if ($scope.entryDetailsItemMember.type == 'objectsList') {
                        element.append(
                            "<td><strong ng-bind='entryDetailsItemMember.label'></strong></td>" +
                            "<td ng-class='{tablesBlock:entryDetailsItemMember.value.length > 1}'><div ng-repeat='item in entryDetailsItemMember.value' entry-details-item='item'></div></td>"
                        );
                        $compile(element.contents())($scope)
                    }
                    if ($scope.entryDetailsItemMember.type == 'array') {
                        element.append(
                            "<td><strong ng-bind='entryDetailsItemMember.label'></strong></td>" +
                            "<td><div ng-repeat='item in entryDetailsItemMember.value'><span>{{item}}</span><br/></div></td>"
                        );
                        $compile(element.contents())($scope)
                    }

                }
            }
        }
    });
