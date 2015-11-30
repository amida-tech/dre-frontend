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
    .directive('entryDetailsItemMember', function ($compile, $log) {
        return {
            restrict: "AE",
            scope: {
                entryDetailsItemMember: '='
            },
            template: "",
            link: function ($scope, element) {

                if (angular.isObject($scope.entryDetailsItemMember)) {
                    var checkBox = '', diffKind, diffSide, diffApply;
                    var modelType = $scope.entryDetailsItemMember.type;

                    if (angular.isObject($scope.entryDetailsItemMember.diff)) {
                        diffKind = $scope.entryDetailsItemMember.diff.kind || '';
                        diffSide = $scope.entryDetailsItemMember.diff.side || '';
                        diffApply = $scope.entryDetailsItemMember.diff.change ? $scope.entryDetailsItemMember.diff.change.apply : false;
                    }

                    if (diffSide === 'l' && diffApply) {
                        $scope.model = $scope.entryDetailsItemMember.diff.ref;
                    } else {
                        $scope.model = $scope.entryDetailsItemMember.value;
                    }

                    if ($scope.entryDetailsItemMember.label) {
                        if (diffKind && diffSide === 'l') {
                            checkBox = "<input type='checkbox' ng-model='entryDetailsItemMember.diff.change.apply'/>";
                        }
                        element.append("<div class='detail-label'>" + checkBox + "<strong ng-bind='entryDetailsItemMember.label'></strong></div>");
                    }


                    if ($scope.model) {

                        var prefix = "<div class='detail-container";

                        if (!$scope.entryDetailsItemMember.label) {
                            prefix += ' no-label';
                        }
                        if (diffKind) {
                            prefix += ' bg-info diff-' + diffKind;

                        }

                        if ($scope.entryDetailsItemMember.cssClass) {
                            prefix += ' ' + $scope.entryDetailsItemMember.cssClass;
                        }
                        prefix += "'><div class='col-xs-12 panel detail-value";

                        switch (diffKind) {
                            case 'N':
                                $log.debug($scope.entryDetailsItemMember.label, 'new');
                                if (diffSide === 'l' && !diffApply) {
                                    $scope.model = '<span class="label label-success text-capitalize">new data</span>';
                                    modelType = 'string';
                                }
                                prefix += ' bg-success';
                                break;
                            case 'D':
                                prefix += ' bg-danger';
                                if (diffSide === 'r') {
                                    $log.debug($scope.entryDetailsItemMember.label, 'deleted', $scope.model);
                                    $scope.model = '<span class="label label-success text-capitalize">no data</span>';
                                    modelType = 'html';
                                }
                                break;
                            case 'E':
                                $log.debug($scope.entryDetailsItemMember.label, 'edit');
                                prefix += ' bg-info';

                                break;
                        }

                        prefix += "'";

                        var suffix = '</div></div>';

                        if (diffSide === 'l' && diffApply) {
                            $log.debug($scope.entryDetailsItemMember.label, 'updated');
                            suffix = '</div><span class="label-updated label label-info text-capitalize">updated</span></div>';
                        }


                        switch (modelType) {
                            case 'html':
                                element.append(prefix + ">" + $scope.model + suffix);
                                break;
                            case "string":
                                element.append(prefix + "><span>{{model}}</span>" + suffix);
                                break;

                            case 'object':
                                element.append(prefix + " entry-details-item='model'>" + suffix);
                                break;

                            case 'objectsList':
                                element.append(prefix + " ng-class='{tablesBlock:model.length > 1}' ng-repeat='item in model' entry-details-item='item'>" + suffix);
                                break;

                            case 'array':
                                element.append(prefix + " ng-repeat='item in model'><span>{{item}}</span><br/>" + suffix);
                                break;
                        }
                    }
                    $compile(element.contents())($scope);

                }
            }
        };
    });
