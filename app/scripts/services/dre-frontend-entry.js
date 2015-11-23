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

        /* 2do: refactor code & move calls into FhirResource children implementations*/

        var _black_list = ["photo"];

        var isValidName = function (name, black_list) {
            return (name[0] !== '$' && !_.contains(black_list, name));
        };

        var _fixCodingOrder = function (_obj) {
            var _keys = ['display', 'system', 'code'];
            var res = {};
            angular.forEach(_keys, function(_key){
               if (_obj[_key]) {
                   res[_key] = _obj[_key];
               }
            });
            angular.extend(res,_obj);
            return res;
        };

        var _buildTable = function (dataItem, blackList) {
            var dataItems = [];
            blackList = blackList || [];
            blackList = blackList.concat(_black_list);

            var prepareValue = function (propertyName, propertyValue) {
                var _item = {
                    type: 'string',
                    label: dreFrontendUtil.camelCaseToString(propertyName),
                    value: null
                };

                switch (dreFrontendUtil.guessDataType(propertyValue)) {
                    case 'object':
                        var rowObjectData = _buildTable(propertyValue, blackList);
                        if (angular.isArray(rowObjectData) && rowObjectData.length > 0) {
                            _item.value = rowObjectData;
                            _item.type = 'object';
                        }
                        break;

                    case 'array':
                        var allScalar = true;
                        _item.value = [];
                        propertyValue.forEach(function (item) {
                            var rowItemData = item;
                            if (!angular.isString(item)) {
                                if (propertyName === 'coding') {
                                    $log.debug(item);
                                    item =  _fixCodingOrder(item);
                                    $log.debug(item);
                                }
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
                        break;

                    case 'date':
                        _item.value = dreFrontendUtil.formatFhirDate(propertyValue);
                        break;

                    default:
                        _item.value = propertyValue;
                }

                if (_item.value !== null) {
                    dataItems.push(_item);
                }
            };

            if (angular.isArray(dataItem) || angular.isObject(dataItem)) {
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
                        isActive: entry.status === 'active',
                        isInactive: entry.status !== 'active'
                    };
                    break;
                case 'Observation':
                    //todo inactive social history
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
                        startDate: entry.date !== undefined ? entry.date : null
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
                        startDate: entry.lastOccurence !== undefined ? entry.lastOccurence : null
                    };
                    break;
                case 'Claim':
                    dates = {
                        startDate: entry.created !== undefined ? dreFrontendUtil.formatFhirDate(entry.created) : null
                    };
                    break;
            }
            if (dates.startDate) {
                dates.startDate = dreFrontendUtil.formatFhirDate(dates.startDate);
            }
            if (dates.isInactive === false) {
                dates.endDate = 'Present';
            } else {
                if (dates.endDate) {
                    dates.endDate = dreFrontendUtil.formatFhirDate(dates.endDate);
                }
            }
            dates.isActive = dates.isActive || (dates.isInactive === false);
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
                        if (entry.event.length !== 0) {
                            if (angular.isDefined(entry.event[0].manifestation)) {
                                if (entry.event[0].manifestation.length === 2) {
                                    if (angular.isDefined(entry.event[0].manifestation[1].coding)) {
                                        if (entry.event[0].manifestation[1].coding.length !== 0) {
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

        var _initEntry = function (rawData, iconType, menuType) {
            return {
                rawEntry: rawData,
                type: iconType,
                title: _getEntryTitle(rawData),
                additionalInfo: _getEntryAddInfo(rawData),
                dates: _getEntryDates(rawData),
                menuType: menuType
            };
        };

        return {
            buildTable: _buildTable,
            getEntryTitle: _getEntryTitle,
            getEntryDates: _getEntryDates,
            getEntryAddInfo: _getEntryAddInfo,
            getEntry: _initEntry
        };
    });
