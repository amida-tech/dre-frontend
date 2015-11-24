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
                        element.append("<div class='detail-label'><span><strong ng-bind='entryDetailsItemMember.label'></strong></span></div>");
                    }

                    var prefix = '<div class="detail-container"><div class="col-xs-12 panel detail-value"';
                    var suffix = '</div></div>';

                    switch ($scope.entryDetailsItemMember.type) {
                        case "string":
                            element.append(prefix + "><span>{{entryDetailsItemMember.value}}</span>" + suffix);
                            break;

                        case 'object':
                            element.append(prefix +" entry-details-item='entryDetailsItemMember.value'>" + suffix);
                            break;

                        case 'objectsList':
                            element.append(prefix + " ng-class='{tablesBlock:entryDetailsItemMember.value.length > 1}' ng-repeat='item in entryDetailsItemMember.value' entry-details-item='item'>" + suffix);
                            break;

                        case 'array':
                            element.append(prefix + " ng-repeat='item in entryDetailsItemMember.value'><span>{{item}}</span><br/>" + suffix);
                            break;
                    }

                    $compile(element.contents())($scope);

                }
            }
        };
    });
