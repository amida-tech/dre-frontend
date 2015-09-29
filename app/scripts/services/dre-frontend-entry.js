'use strict';

/**
 * @ngdoc service
 * @name dreFrontendApp.entry
 * @description
 * # entry
 * Service in the dreFrontendApp.
 */
angular.module('dreFrontendApp')
    .factory('dreFrontendEntryService', function (_, dreFrontendUtil, $log) {

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

            var prepareValue = function (propertyName, propertyValue) {
                //number value
                if (angular.isNumber(propertyValue) || !isNaN(parseFloat(propertyValue))) {
                    dataItems.push({
                        label: prepareName(propertyName),
                        value: propertyValue,
                        type: 'string'
                    });
                } else
                //if ISO date
                if (angular.isDate(propertyValue) /*!isNaN(Date.parse(propertyValue))*/) {
                    dataItems.push({
                        label: prepareName(propertyName),
                        value: dreFrontendUtil.formatFhirDate(propertyValue),
                        type: 'string'
                    });
                } else
                //String value
                if (angular.isString(propertyValue)) {
                    dataItems.push({
                        label: prepareName(propertyName),
                        value: propertyValue,
                        type: 'string'
                    });
                } else
                //if nested array of objects
                if (angular.isArray(propertyValue)) {
                    var itemsArray = [];
                    var type = 'objectsList';
                    propertyValue.forEach(function (item) {
                        var rowItemData = [];
                        if (angular.isString(item)) {
                            itemsArray.push(item);
                            type = 'array';
                        } else {
                            rowItemData = _buildTable(item, blackList);
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
                } else
                //if nested object
                if (angular.isObject(propertyValue)) {
                    var rowObjectData = _buildTable(propertyValue, blackList);
                    if (angular.isArray(rowObjectData) && rowObjectData.length > 0) {
                        dataItems.push({
                            label: prepareName(propertyName),
                            value: rowObjectData,
                            type: 'object'
                        });
                    }
                }
            };

            if (typeof dataItem === "array" || typeof dataItem === "object") {
                for (var propertyName in dataItem) {
                    if (dataItem.hasOwnProperty(propertyName) && isValidName(propertyName, blackList)) {
                        prepareValue(propertyName, dataItem[propertyName]);
                    }
                }
            } else {
                prepareValue("", dataItem);
            }
            return dataItems;
        };

        var _getEntryTitle = function (entry) {
            switch (entry.resourceType) {
                case 'MedicationPrescription':
                    if (angular.isObject(entry.medication)) {
                        if (angular.isObject(entry.medication.code)) {
                            if (angular.isArray(entry.medication.code.coding) && entry.medication.code.coding.length > 0 && entry.medication.code.coding[0].display) {
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
                        if (angular.isArray(entry.code.coding) && entry.code.coding.length > 0 && entry.code.coding[0].display) {
                            return entry.code.coding[0].display;
                        }
                        if (angular.isString(entry.code.text)) {
                            return entry.code.text
                        }
                    }
                    return 'Undefined';
                case 'Immunization':
                    if (angular.isObject(entry.vaccineType)) {
                        if (angular.isArray(entry.vaccineType.coding) && entry.vaccineType.coding.length > 0 && entry.vaccineType.coding[0].display) {
                            return entry.vaccineType.coding[0].display;
                        }
                        if (angular.isString(entry.vaccineType.text)) {
                            return entry.vaccineType.text
                        }
                    }
                    return 'Undefined';
                case 'Encounter':
                    if (angular.isArray(entry.type) && entry.type.length > 0) {
                        if (angular.isObject(entry.type[0].coding) && entry.type[0].coding.length > 0 && entry.type[0].coding[0].display) {
                            return entry.type[0].coding[0].display;
                        }
                        if (angular.isString(entry.type[0].text)) {
                            return entry.type[0].text
                        }
                    }
                    return 'Undefined';
                case 'Condition':
                    if (angular.isObject(entry.code)) {
                        if (angular.isObject(entry.code.coding) && entry.code.coding.length > 0 && entry.code.coding[0].display) {
                            return entry.code.coding[0].display;
                        }
                        if (angular.isString(entry.code.text)) {
                            return entry.code.text
                        }
                    }
                    return 'Undefined';
                case 'Procedure':
                    if (angular.isObject(entry.type)) {
                        if (angular.isArray(entry.type.coding) && entry.type.coding.length > 0 && entry.type.coding[0].display) {
                            return entry.type.coding[0].display;
                        }
                        if (angular.isString(entry.type.text)) {
                            return entry.type.text
                        }
                    }
                    return 'Undefined';
                case 'AllergyIntolerance':
                    if (entry.event.length != 0) {
                        if (angular.isDefined(entry.event[0].manifestation)) {
                            if (entry.event[0].manifestation.length > 0) {
                                if (angular.isDefined(entry.event[0].manifestation[0].coding)) {
                                    if (entry.event[0].manifestation[0].coding.length != 0 && entry.event[0].manifestation[0].coding[0].display) {
                                        return entry.event[0].manifestation[0].coding[0].display;
                                    }
                                }
                                if (angular.isString(entry.event[0].manifestation[0].text)) {
                                    return entry.event[0].manifestation[0].text
                                }
                            }
                        }
                    }
                    return 'Undefined';
                default:
                    return 'Undefined';
            }
        };

        var _getEntryDates = function (entry) {
            var dates = {};
            switch (entry.resourceType) {
                case 'MedicationPrescription':
                    dates = {
                        startDate: angular.isDefined(entry.dispense) && angular.isDefined(entry.dispense.validityPeriod) ? entry.dispense.validityPeriod.start : undefined,
                        stopDate: angular.isDefined(entry.dispense) && angular.isDefined(entry.dispense.validityPeriod) ? entry.dispense.validityPeriod.end : undefined,
                        isInactive: entry.status != 'active'
                    };
                    break;
                case 'Observation':
                    if (angular.isDefined(entry.appliesDateTime)) {
                        dates = {startDate: entry.appliesDateTime};
                    } else {
                        if (angular.isDefined(entry.appliesPeriod)) {
                            dates = {
                                startDate: entry.appliesPeriod.start,
                                endDate: entry.appliesPeriod.end
                            };
                        } else {
                            if (angular.isDefined(entry.issued)) {
                                dates = {startDate: entry.issued};
                            }
                        }
                    }
                    break;
                case 'Immunization':
                    dates = {
                        startDate: entry.date != undefined ? entry.date : null
                    };
                    break;
                case 'Encounter':
                    dates = {
                        startDate: angular.isObject(entry.period) ? entry.period.start : undefined,
                        endDate: angular.isObject(entry.period) ? entry.period.end : undefined
                    };
                    break;
                case 'Condition':
                    dates = {
                        startDate: angular.isObject(entry.abatementPeriod) ? entry.abatementPeriod.start : undefined,
                        endDate: angular.isObject(entry.abatementPeriod) ? entry.abatementPeriod.end : undefined
                    };
                    break;
                case 'Procedure':
                    dates = {
                        startDate: entry.performedDateTime
                    };
                    break;
                case 'AllergyIntolerance':
                    dates = {
                        startDate: entry.lastOccurence != undefined ? entry.lastOccurence : null
                    };
                    break;
            }
            return dates;

        };

        var self = {
            buildTable: _buildTable,
            getEntryTitle: _getEntryTitle,
            getEntryDates: _getEntryDates
        };

        return self;
    });
