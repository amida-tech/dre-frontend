'use strict';

angular.module('dreFrontendApp')
    .directive('entryDetailsItem', function () {
        return {
            restrict: "AE",
            replace: true,
            scope: {
                entryDetailsItem: '='
            },
            template: "<div class='col-xs-12'>" +
            "<div class='row detail-row' ng-repeat='member in entryDetailsItem' entry-details-item-member='member'></div>" +
            "</div>"
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
                        element.append("<div class='col-xs-3 detail-label'><strong ng-bind='entryDetailsItemMember.label'></strong></div>");
                    }

                    switch ($scope.entryDetailsItemMember.type) {
                        case "string":
//                            element.append("<td><span>{{entryDetailsItemMember.value}}</span></td>");
                            element.append("<div class='col-xs-9 detail-value panel panel-default'><span>{{entryDetailsItemMember.value}}</span></div>");
                            break;

                        case 'object':
//                            element.append("<td><div entry-details-item='entryDetailsItemMember.value'></div></td>");
                            element.append("<div class='col-xs-9 detail-value panel panel-default'><div entry-details-item='entryDetailsItemMember.value'></div></div>");
                            break;

                        case 'objectsList':
//                            element.append("<td ng-class='{tablesBlock:entryDetailsItemMember.value.length > 1}'><div ng-repeat='item in entryDetailsItemMember.value' entry-details-item='item'></div></td>");
                            element.append("<div class='col-xs-9 detail-value panel panel-default' ng-class='{tablesBlock:entryDetailsItemMember.value.length > 1}'><div ng-repeat='item in entryDetailsItemMember.value' entry-details-item='item'></div></div>");
                            break;

                        case 'array':
//                            element.append("<td><div ng-repeat='item in entryDetailsItemMember.value'><span>{{item}}</span><br/></div></td>");
                            element.append("<div class='col-xs-9 detail-value panel panel-default'><div ng-repeat='item in entryDetailsItemMember.value'><span>{{item}}</span><br/></div></div>");
                            break;
                    }

                    $compile(element.contents())($scope);

                }
            }
        };
    });
