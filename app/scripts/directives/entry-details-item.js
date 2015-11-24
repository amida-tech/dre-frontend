'use strict';

angular.module('dreFrontendApp')
    .directive('entryDetailsItem', function () {
        return {
            restrict: "AE",
            replace: true,
            scope: {
                entryDetailsItem: '='
            },
            template: "<div><div class='row detail-row' ng-repeat='member in entryDetailsItem' " +
            "entry-details-item-member='member'></div></div>"
        };
    })
    .directive('entryDetailsItemMember', function ($compile,$log) {
        return {
            restrict: "AE",
            scope: {
                entryDetailsItemMember: '='
            },
            template: "",
            link: function ($scope, element) {

                if (angular.isObject($scope.entryDetailsItemMember)) {
                    if ($scope.entryDetailsItemMember.label) {
                        element.append("<div class='detail-label'><span><strong ng-bind='entryDetailsItemMember.label'></strong></span></div>");
                    }
                    var elem;

                    switch ($scope.entryDetailsItemMember.type) {
                        case "string":
//                            element.append("<td><span>{{entryDetailsItemMember.value}}</span></td>");
                            elem = element.append("<div class='detail-container'><div class='col-xs-12 panel detail-value'><span>{{entryDetailsItemMember.value}}</span></div></div>");
                            break;

                        case 'object':
//                            element.append("<td><div entry-details-item='entryDetailsItemMember.value'></div></td>");
                            elem = element.append("<div class='detail-container'><div class='col-xs-12 panel detail-value' entry-details-item='entryDetailsItemMember.value'></div></div>");
                            break;

                        case 'objectsList':
//                            element.append("<td ng-class='{tablesBlock:entryDetailsItemMember.value.length > 1}'><div ng-repeat='item in entryDetailsItemMember.value' entry-details-item='item'></div></td>");
                            elem = element.append("<div class='detail-container' ng-class='{tablesBlock:entryDetailsItemMember.value.length > 1}'><div class='col-xs-12 panel detail-value' ng-repeat='item in entryDetailsItemMember.value' entry-details-item='item'></div></div>");
                            break;

                        case 'array':
//                            element.append("<td><div ng-repeat='item in entryDetailsItemMember.value'><span>{{item}}</span><br/></div></td>");
                            elem = element.append("<div class='detail-container'><div class='col-xs-12 panel detail-value' ng-repeat='item in entryDetailsItemMember.value'><span>{{item}}</span><br/></div></div>");
                            break;
                    }

                    $log.debug(elem);
                    $compile(element.contents())($scope);

                }
            }
        };
    });
