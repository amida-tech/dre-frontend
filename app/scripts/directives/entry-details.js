'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('entryDetails', function (dreFrontendUtil, _) {
        return {
            templateUrl: 'views/directives/entry-details.html',
            restrict: 'AE',
            scope: {
                entryDetails: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    data: [],
                    wasLoaded: false,
                    blackList: ['reference', 'patient', 'meta', 'resourceType', 'id', 'subject']
                };

                var isValidName = function (name) {
                    return name[0] != '$' && !_.contains($scope.model.blackList, name) ;
                };

                var prepareName = function (name) {
                    var nameArr = name.split(/(?=[A-Z])/);
                    for (var i = 0; i < nameArr.length; i++) {
                        nameArr[i] = dreFrontendUtil.capitalise(nameArr[i]);
                    }
                    return nameArr.join(' ');
                };

                var buildTable = function (dataItem) {
                    var dataItems = [];
                    for (var propertyName in dataItem) {
                        if (dataItem.hasOwnProperty(propertyName) && isValidName(propertyName)) {
                            //if ISO date
                            if (!isNaN(Date.parse(dataItem[propertyName]))) {
                                dataItems.push({
                                    label: prepareName(propertyName),
                                    value: dreFrontendUtil.formatFhirDate(dataItem[propertyName]),
                                    type: 'string'
                                });
                                continue;
                            }
                            //String or number value
                            if (angular.isString(dataItem[propertyName]) || angular.isNumber(dataItem[propertyName])) {
                                dataItems.push({
                                    label: prepareName(propertyName),
                                    value: dataItem[propertyName],
                                    type: 'string'
                                });
                                continue;
                            }
                            //if nested array of objects
                            if (angular.isArray(dataItem[propertyName])) {
                                var itemsArray = [];
                                var type = 'objectsList';
                                dataItem[propertyName].forEach(function (item) {
                                    var rowItemData = [];
                                    if (angular.isString(item)) {
                                        itemsArray.push(item);
                                        type = 'array';
                                    } else {
                                        rowItemData = buildTable(item);
                                        if (rowItemData.length > 0) {
                                            itemsArray.push(rowItemData);
                                        }
                                    }
                                });
                                if (angular.isArray(itemsArray) && itemsArray.length > 0) {
                                    dataItems.push({
                                        label: prepareName(propertyName),
                                        value: itemsArray,
                                        type: type
                                    });
                                }
                                continue;
                            }
                            //if nested object
                            if (angular.isObject(dataItem[propertyName])) {
                                var rowObjectData = buildTable(dataItem[propertyName]);
                                if (angular.isArray(rowObjectData) && rowObjectData.length > 0) {
                                    dataItems.push({
                                        label: prepareName(propertyName),
                                        value: rowObjectData,
                                        type: 'object'
                                    });
                                }
                                continue;
                            }
                        }
                    }
                    return dataItems;
                };

                if(!$scope.model.wasLoaded){
                    $scope.entryDetails.loadAll().then(function () {
                        $scope.model.data = buildTable($scope.entryDetails);
                        $scope.model.wasLoaded = true;
                    });
                }
            }
        };
    });
