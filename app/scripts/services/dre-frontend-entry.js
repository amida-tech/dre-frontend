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

        var _black_list = ["photo"];

        var isValidName = function (name, black_list) {
            return name[0] != '$' && !_.contains(black_list, name);
        };

        var _buildTable = function (dataItem, blackList) {
            var dataItems = [];
            blackList = blackList || [];
            blackList = blackList.concat(_black_list);

            var prepareValue = function (propertyName, propertyValue) {
                if (propertyName === 'line') {
                    $log.debug(propertyName, typeof propertyValue, angular.isArray(propertyValue), angular.isString(propertyValue), angular.isNumber(propertyValue), parseFloat(propertyValue));
                }
                var _item = {
                    type: 'string',
                    label: dreFrontendUtil.camelCaseToString(propertyName),
                    value: null
                };

                //if nested array of objects
                if (angular.isArray(propertyValue)) {
                    var allScalar = true;
                    _item.value = [];
                    propertyValue.forEach(function (item) {
                        var rowItemData = item;
                        if (!angular.isString(item)) {
                            allScalar = false;
                            rowItemData = _buildTable(item, blackList);
                            if (rowItemData.length > 0) {
                                _item.value.push(rowItemData);
                            }
                        } else {
                            _item.value.push(rowItemData);
                        }
                    });

                    _item.type = allScalar ? 'array' : 'objectsList';

                    if (_item.value.length < 1) {
                        _item.value = null;
                    }
                } else

                //number value
                if (angular.isNumber(propertyValue) /*|| !isNaN(parseFloat(propertyValue))*/) {
                    _item.value = propertyValue;
                } else

                //if ISO date
                if (angular.isDate(propertyValue) /*!isNaN(Date.parse(propertyValue))*/) {
                    _item.value = dreFrontendUtil.formatFhirDate(propertyValue);
                } else

                //String value
                if (angular.isString(propertyValue)) {
                    _item.value = propertyValue;
                } else

                //if nested object
                if (angular.isObject(propertyValue)) {
                    var rowObjectData = _buildTable(propertyValue, blackList);
                    if (angular.isArray(rowObjectData) && rowObjectData.length > 0) {
                        _item.value = rowObjectData;
                        _item.type = 'object';
                    }
                }

                if (_item.value !== null ) {
                    dataItems.push(_item);
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
                    case 'MedicationOrder':
                        title = entry.codableConceptTitle(entry.medicationCodeableConcept);
                        if (!title && entry.medicationReference && entry.medicationReference.code) {
                            title = entry.codableConceptTitle(entry.medicationReference.code);
                        }
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
                        if (!title && entry.focalDevice) {
                            title = entry.codableConceptTitle(entry.focalDevice[0].action);
                        }
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

        var _getEntryAddInfo = function (entry) {
            var info = '';
            switch (entry.resourceType) {
                case 'MedicationOrder':
                    break;
                case 'Observation':
                    info = entry.measurement(true);
                    break;
                case 'Immunization':
                    break;
                case 'Encounter':
                    info = (angular.isArray(entry.location) && entry.location.length > 0 && entry.location[0].location) ? entry.location[0].location.name : undefined;
                    break;
                case 'Condition':
                    break;
                case 'Procedure':
                    break;
                case 'AllergyIntolerance':
                    if (angular.isDefined(entry.event)) {
                        if (entry.event.length != 0) {
                            if (angular.isDefined(entry.event[0].manifestation)) {
                                if (entry.event[0].manifestation.length == 2) {
                                    if (angular.isDefined(entry.event[0].manifestation[1].coding)) {
                                        if (entry.event[0].manifestation[1].coding.length != 0) {
                                            if (angular.isDefined(entry.event[0].manifestation[1].coding[0].display)) {
                                                info = entry.event[0].manifestation[1].coding[0].display;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                case 'Claim':
                    break;
            }
            return info;
        };

        return {
            buildTable: _buildTable,
            getEntryTitle: _getEntryTitle,
            getEntryDates: _getEntryDates,
            getEntryAddInfo: _getEntryAddInfo
        };
    });
