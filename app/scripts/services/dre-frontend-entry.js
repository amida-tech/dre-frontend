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
            var title;
            if (angular.isObject(entry)) {
                switch (entry.resourceType) {
                    case 'MedicationPrescription':
                        title = entry.codableConceptTitle(entry.medication);
                        break;
                    case 'MedicationOrder':
                        title = entry.codableConceptTitle(entry.medicationReference);
                        break;
                    case 'Observation':
                        title = entry.codableConceptTitle(entry.code);
                        break;
                    case 'Immunization':
                        title = entry.title();
                        break;
                    case 'Encounter':
                        title = entry.codableConceptTitle(entry.type);
                        break;
                    case 'Condition':
                        title = entry.codableConceptTitle(entry.code);
                        break;
                    case 'Procedure':
                        title = entry.codableConceptTitle(entry.code);
                        break;
                    case 'AllergyIntolerance':
                        title = entry.codableConceptTitle(entry.substance);
                        break;
                    case 'Claim':
                        if (entry.identifier && entry.identifier[0] && entry.identifier[0].value) {
                            title = entry.identifier[0].value;
                        }
                        break;
                }
            }
            if (!title) {
                title = 'Undefined';
            }
            return title;
        };

        var _getEntryDates = function (entry) {
            var dates = {};
            switch (entry.resourceType) {
                case 'MedicationPrescription':
                    dates = {
                        startDate: angular.isDefined(entry.dispense) && angular.isDefined(entry.dispense.validityPeriod) ? entry.dispense.validityPeriod.start : undefined,
                        endDate: angular.isDefined(entry.dispense) && angular.isDefined(entry.dispense.validityPeriod) ? entry.dispense.validityPeriod.end : undefined,
                        isInactive: entry.status != 'active'
                    };
                    break;
                case 'MedicationOrder':
                    dates = {
                        startDate: entry.dateWritten ? entry.dateWritten : null,
                        endDate: entry.dateEnded ? entry.dateEnded : null,
                        isInactive: entry.status != 'active'
                    };
                    break;
                case 'Observation'://todo inactive social history
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
                case 'Claim':
                    dates = {
                        startDate: entry.created != undefined ? dreFrontendUtil.formatFhirDate(entry.created) : null
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
