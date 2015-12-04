'use strict';

/**
 * @ngdoc service
 * @name dreFrontendApp.entry
 * @description
 * # entry
 * Service in the dreFrontendApp.
 */
angular.module('dreFrontendApp')
    .factory('dreFrontendEntryService', function (_, dreFrontendUtil, dreFrontendGlobals, $log) {

        /* 2do: refactor code & move calls into FhirResource children implementations*/
        $log.debug('refactor dreFrontendEntryService code & move calls into FhirResource children implementations');

        var _wrapLabelDeep = 1;
        var _black_list = ["photo"];

        var getFieldCssClass = function (_val, _key) {
            var aClasses = [];
            if (_.includes(dreFrontendGlobals.highlightProperty, _key) || _.includes(_key, 'date') || _.includes(_key, 'time')) {
                aClasses.push('highlight');
            }
            return aClasses.join(' ');
        };

        var wrapCoding = function (_val) {
            var res = [];
            var hasDiff = false;
            var c;
            for (c = 0; c < _val.length && !hasDiff; c++) {
                if (_val[c].display && _val[c].display.diff) {
                    hasDiff = true;
                }
                if (_val[c].code && _val[c].code.diff) {
                    hasDiff = true;
                }
                if (_val[c].system && _val[c].system.diff) {
                    hasDiff = true;
                }
            }
            for (c = 0; c < _val.length && !hasDiff; c++) {
                var rows = [];
                if (_val[c].display) {
                    rows.push(_val[c].display);
                }
                if (_val[c].code || _val[c].system) {
                    rows.push(_val[c].code + ' (' + dreFrontendUtil.encodeSystemURL(_val[c].system) + ')');
                }
                if (rows.length > 0) {
                    res.push(rows.join("\n"));
                }
            }

            if (res.length > 0) {
                return res;
            } else {
                return _val;
            }
        };

        var _getLabel = function (_key) {
            var res;
            if (dreFrontendGlobals.synonims[_key]) {
                res = dreFrontendUtil.camelCaseToString(dreFrontendGlobals.synonims[_key]);
            } else {
                res = dreFrontendUtil.camelCaseToString(_key);
            }
            return res;
        };

        var isValidName = function (name, black_list) {
            return (name[0] !== '$' && !_.contains(black_list, name));
        };

        var _buildTable = function (dataItem, blackList, deep) {
            if (deep > 10) {
                return [];
            }
            var dataItems = [];
            blackList = blackList || [];
            blackList = blackList.concat(_black_list);
            deep = deep || 0;
            var prepareValue = function (_key, _val) {
                var node = {
                    type: 'string',
                    label: _getLabel(_key),
                    value: null,
                    cssClass: getFieldCssClass(_val, _key),
                    diff: null
                };

                if (_val && _val.diff) {
                    switch (_val.diff.side) {
                        case 'l':
                            node.diff = _val.diff;
                            if (_val.diff.change.kind !== "N") {
                                if (typeof node.diff.ref === 'object' || typeof node.diff.ref === 'array') {
                                    node.diff.ref = _buildTable(node.diff.ref, blackList, deep);
                                }
                            }
                            break;
                        case 'r':
                            node.diff = _val.diff;
                            if (_val.diff.change.kind !== 'N') {
                                delete node.diff.ref;
                            }
                            break;
                    }
                    delete _val.diff;
                    if (_val.nodeValue) {
                        _val = _val.nodeValue;
                    }
                }

                switch (_key) {
                    case 'coding':
                        if (!node.diff) {
                            _val = wrapCoding(_val);
                        }
                        break;
                }

                switch (dreFrontendUtil.guessDataType(_val)) {
                    case 'object':
                        var rowObjectData = _buildTable(_val, blackList, deep + 1);
                        if (angular.isArray(rowObjectData) && rowObjectData.length > 0) {
                            node.value = rowObjectData;
                            node.type = 'object';
                        }
                        break;

                    case 'array':
                        var allScalar = true;
                        node.value = [];
                        _val.forEach(function (item) {
                            var rowItemData = item;
                            if (!angular.isString(item)) {
                                if (_key === 'coding') {
                                    item = dreFrontendUtil.reorderObjectFields(item, _key);
                                }
                                allScalar = false;
                                rowItemData = _buildTable(item, blackList, deep + 1);
                                if (rowItemData.length > 0) {
                                    node.value.push(rowItemData);
                                }
                            } else {
                                node.value.push(rowItemData);
                            }
                        });

                        node.type = allScalar ? 'array' : 'objectsList';

                        if (allScalar && deep) {
                            node.label = '';
                        }

                        if (node.value.length < 1) {
                            node.value = null;
                        }
                        break;

                    case 'date':
                        if (_key === 'value' && !node.diff) {
                            node.label = '';
                        }
                        node.value = dreFrontendUtil.formatFhirDate(_val);
                        break;

                    case 'number':
                    case 'string':
                        if (deep > _wrapLabelDeep && !node.diff) {
                            node.label = '';
                        }
                        node.value = _val;
                        break;
                    default:
                        node.value = null;
                }

                if (node.value !== null) {
                    dataItems.push(node);
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
                        isActive: true, //entry.status === 'active',
                        isInactive: false //entry.status !== 'active'
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
