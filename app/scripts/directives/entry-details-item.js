'use strict';

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
        };
    })
    .directive('entryDetailsItemMember', function ($compile) {
        return {
            restrict: "AE",
            scope: {
                entryDetailsItemMember: '='
            },
            template: "",
            link: function ($scope, element) {

                if (angular.isObject($scope.entryDetailsItemMember)) {
                    if ($scope.entryDetailsItemMember.label) {
                        element.append("<td><strong ng-bind='entryDetailsItemMember.label'></strong></td>");
                    }

                    switch ($scope.entryDetailsItemMember.type) {
                        case "string":
                            element.append("<td><span>{{entryDetailsItemMember.value}}</span></td>");
                            break;

                        case 'object':
                            element.append("<td><div entry-details-item='entryDetailsItemMember.value'></div></td>");
                            break;

                        case 'objectsList':
                            element.append("<td ng-class='{tablesBlock:entryDetailsItemMember.value.length > 1}'><div ng-repeat='item in entryDetailsItemMember.value' entry-details-item='item'></div></td>");
                            break;

                        case 'array':
                            element.append("<td><div ng-repeat='item in entryDetailsItemMember.value'><span>{{item}}</span><br/></div></td>");
                            break;
                    }

                    $compile(element.contents())($scope);

                }
            }
        };
    });
