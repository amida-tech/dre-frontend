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
            return name[0] != '$' && !_.contains(black_list, name);
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

        var _getEntryTitle = function (entry) {
            console.log('entry', entry);
            switch (entry.resourceType) {
                case 'MedicationPrescription':
                    if(angular.isObject(entry.medication)){
                        if (angular.isObject(entry.medication.code)) {
                            if (angular.isArray(entry.medication.code.coding) && entry.medication.code.coding.length > 0) {
                                return entry.medication.code.coding[0].display;
                            }
                            if (angular.isString(entry.medication.code.text)) {
                                return entry.code.text
                            }
                        }
                    }
                    return 'Undefined';
                case 'Observation':
                    if (angular.isObject(entry.code)) {
                        if (angular.isArray(entry.code.coding) && entry.code.coding.length > 0) {
                            return entry.code.coding[0].display;
                        }
                        if (angular.isString(entry.code.text)) {
                            return entry.code.text
                        }
                    }
                    return 'Undefined';
                case 'Immunization':
                    if (angular.isObject(entry.vaccineType)) {
                        if (angular.isArray(entry.vaccineType.coding) && entry.vaccineType.coding.length > 0) {
                            return entry.vaccineType.coding[0].display;
                        }
                        if (angular.isString(entry.vaccineType.text)) {
                            return entry.vaccineType.text
                        }
                    }
                    return 'Undefined';
                case 'Encounter':
                    if (angular.isArray(entry.type) && entry.type.length > 0) {
                        if (angular.isObject(entry.type[0].coding) && entry.type[0].coding.length > 0) {
                            return entry.type[0].coding[0].display;
                        }
                    }
                    return 'Undefined';
                case 'Condition':
                    if (angular.isObject(entry.code)) {
                        if (angular.isObject(entry.code.coding) && entry.code.coding.length > 0) {
                            return entry.code.coding[0].display;
                        }
                        if (angular.isString(entry.code.text)) {
                            return entry.code.text
                        }
                    }
                    return 'Undefined';
                case 'Procedure':
                    if (angular.isObject(entry.type)) {
                        if (angular.isArray(entry.type.coding) && entry.type.coding.length > 0) {
                            return entry.type.coding[0].display;
                        }
                        if (angular.isString(entry.type.text)) {
                            return entry.code.text
                        }
                    }
                    return 'Undefined';
                case 'AllergyIntolerance':
                    if(entry.event.length != 0) {
                        if(angular.isDefined(entry.event[0].manifestation)) {
                            if(entry.event[0].manifestation.length > 0) {
                                if(angular.isDefined(entry.event[0].manifestation[0].coding)) {
                                    if(entry.event[0].manifestation[0].coding.length != 0) {
                                        if(angular.isDefined(entry.event[0].manifestation[0].coding[0].display)) {
                                            return entry.event[0].manifestation[0].coding[0].display;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return 'Undefined';
                default:
                    return 'Undefined';
            }
        };
        var self = {
            buildTable: _buildTable,
            getEntryTitle: _getEntryTitle
        };

        return self;
    });
