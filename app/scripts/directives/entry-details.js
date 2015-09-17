'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('entryDetails', function (dreFrontendUtil) {
        return {
            templateUrl: 'views/directives/entry-details.html',
            restrict: 'AE',
            scope: {
                entryDetails: '='
            },
            controller: function ($scope) {
                $scope.model = {detailRows: []};
                var isValidName = function(name){
                    return name[0] != '$' && name != 'reference' && name != 'patient';
                };

                var prepareName = function (name) {
                    var nameArr = name.split(/(?=[A-Z])/);
                    for(var i=0;i<nameArr.length;i++){
                        nameArr[i] = dreFrontendUtil.capitalise(nameArr[i]);
                    }
                    return nameArr.join(' ');
                };
                $scope.entryDetails.loadAll().then(function(){
                    for (var propertyName in $scope.entryDetails) {
                        if (isValidName(propertyName)) {
                            //Вывод строки
                            if (angular.isString($scope.entryDetails[propertyName])) {
                                $scope.model.detailRows.push({
                                    key: prepareName(propertyName),
                                    value: $scope.entryDetails[propertyName],
                                    type: 'string'
                                });
                            }
                            //Вывод вложенного объекта
                            if (angular.isObject($scope.entryDetails[propertyName])) {
                                var dataItems = [];
                                var child = $scope.entryDetails[propertyName];
                                for (var childPropertyName in child) {
                                    if (isValidName(childPropertyName)) {
                                        if (angular.isString(child[childPropertyName])) {
                                            dataItems.push({
                                                key: prepareName(childPropertyName),
                                                value: child[childPropertyName],
                                                type: 'string'
                                            });
                                        }
                                    }
                                }
                                if(dataItems.length > 0){
                                    $scope.model.detailRows.push({
                                        key: prepareName(propertyName),
                                        value: {detailRows: dataItems},
                                        type: 'table'
                                    });
                                }

                            }
                            if (angular.isArray($scope.entryDetails[propertyName])) {
                                var aChild = $scope.entryDetails[propertyName];
                                aChild.forEach(function(child){
                                    var dataItems = [];
                                    for (var childPropertyName in child) {
                                        if (isValidName(childPropertyName)) {
                                            if (angular.isString(child[childPropertyName])) {
                                                dataItems.push({
                                                    key: prepareName(childPropertyName),
                                                    value: child[childPropertyName],
                                                    type: 'string'
                                                });
                                            }
                                        }
                                    }
                                    if(dataItems.length > 0){
                                        $scope.model.detailRows.push({
                                            key: prepareName(propertyName),
                                            value: {detailRows: dataItems},
                                            type: 'table'
                                        });
                                    }
                                });
                            }
                        }
                    }

                });

            }
        };
    });
