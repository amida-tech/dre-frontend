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
                                if (typeof node.diff.ref === 'object') {
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

            if (entry) {
                title = entry.title();
            }

            if (!title) {
                title = 'Undefined';
            }

            return title;
        };

        var _getEntryDates = function (entry) {
            var dates = {};

            if (entry) {
                dates = entry.dates();

                if (dates.startDate) {
                    dates.startDate = dreFrontendUtil.formatFhirDate(dates.startDate);
                }
                if (dates.isActive !== false) {
                    dates.endDate = 'Present';
                } else {
                    if (dates.endDate) {
                        dates.endDate = dreFrontendUtil.formatFhirDate(dates.endDate);
                    }
                }
            }

            return dates;

        };

        var _getEntryAddInfo = function (entry) {
            var addData = '';
            if (entry) {
                addData = entry.additionalInfo();
            }
            return addData;
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
