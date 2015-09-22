'use strict';

/**
 * @ngdoc service
 * @name dreFrontendApp.entry
 * @description
 * # entry
 * Service in the dreFrontendApp.
 */
angular.module('dreFrontendApp')
    .factory('dreFrontendEntry', function (_, dreFrontendUtil) {

        var isValidName = function (name, black_list) {
            return name[0] != '$' && !_.contains(black_list, name) ;
        };

        var prepareName = function (name) {
            var nameArr = name.split(/(?=[A-Z])/);
            for (var i = 0; i < nameArr.length; i++) {
                nameArr[i] = dreFrontendUtil.capitalise(nameArr[i]);
            }
            return nameArr.join(' ');
        };

        var _buildTable = function (dataItem, blackList) {
            var dataItems = [];
            blackList = blackList || [];
            for (var propertyName in dataItem) {
                if (dataItem.hasOwnProperty(propertyName) && isValidName(propertyName, blackList)) {

                    //number value
                    if (angular.isNumber(dataItem[propertyName]) || !isNaN(parseFloat(dataItem[propertyName]))) {
                        dataItems.push({
                            label: prepareName(propertyName),
                            value: dataItem[propertyName],
                            type: 'string'
                        });
                        continue;
                    }
                    //if ISO date
                    if (!isNaN(Date.parse(dataItem[propertyName]))) {
                        dataItems.push({
                            label: prepareName(propertyName),
                            value: dreFrontendUtil.formatFhirDate(dataItem[propertyName]),
                            type: 'string'
                        });
                        continue;
                    }
                    //String value
                    if (angular.isString(dataItem[propertyName])) {
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
                                rowItemData = _buildTable(item);
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
                        var rowObjectData = _buildTable(dataItem[propertyName]);
                        if (angular.isArray(rowObjectData) && rowObjectData.length > 0) {
                            dataItems.push({
                                label: prepareName(propertyName),
                                value: rowObjectData,
                                type: 'object'
                            });
                        }
                    }
                }
            }
            return dataItems;
        };

        var self = {
            buildTable: _buildTable
        };

        return self;
    });
