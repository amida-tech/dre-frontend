/**
 * Created by igi on 25.11.15.
 */
"use strict";

angular.module('dreFrontend.util')
    .factory('dreFrontendDiff', function ($log, dreFrontendEntryService, dreFrontendUtil, _) {

        var _blacklist = [];//['meta', 'id'];

        var _normalizeTree = function (lhs, rhs) {
            var _res = {};
            angular.extend(_res, lhs);
            angular.extend(_res, rhs);

            return _res;
        };

        var isValidName = function (name, black_list) {
            return (name[0] !== '$' && !_.contains(black_list, name));
        };

        var _buildDiffView = function (diff) {
            var _diff_paths = _.pick(diff.changes,'path');
            $log.debug(diff.changes, _diff_paths);

            var _getChange = function (path) {
                var res = null;
                angular.forEach(diff.changes, function(chng){

                })
            };

            var _buildTable = function (dataItem,_side, blackList, _path) {
                var dataItems = [];
                blackList = blackList || [];
                blackList = blackList.concat(_blacklist);

                _path = _path || [];

                var buildNode = function (_key, _val) {
                    var node = {
                        type: 'string',
                        label: dreFrontendUtil.camelCaseToString(_key),
                        value: null,
                        cssClass: _key === 'display' ? 'highlight' : '',
                        diff: {
                            side: _side,
                            change: null
                        },
                        path: _path.concat(_key)
                    };

                    if (_key === 'system') {
                        _val = dreFrontendUtil.encodeSystemURL(_val);
                    }

                    switch (dreFrontendUtil.guessDataType(_val)) {
                        case 'object':
                            var rowObjectData = _buildTable(_val, blackList, node.path);
                            if (angular.isArray(rowObjectData) && rowObjectData.length > 0) {
                                node.value = rowObjectData;
                                node.type = 'object';
                            }
                            break;

                        case 'array':
                            var allScalar = true;
                            node.value = [];
                            _val.forEach(function (item,_ind) {
                                var rowItemData = item;
                                node.path = _path.concat(_key,_ind);
                                if (!angular.isString(item)) {
                                    if (_key === 'coding') {
                                        item = dreFrontendUtil.reorderObjectFields(item, _key);
                                    }
                                    allScalar = false;
                                    rowItemData = _buildTable(item, blackList, node.path);
                                    if (rowItemData.length > 0) {
                                        node.value.push(rowItemData);
                                    }
                                } else {
                                    node.value.push(rowItemData);
                                }
                            });

                            node.type = allScalar ? 'array' : 'objectsList';

                            if (node.value.length < 1) {
                                node.value = null;
                            }
                            break;

                        case 'date':
                            node.value = dreFrontendUtil.formatFhirDate(_val);
                            break;

                        case 'number':
                        case 'string':
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
                            buildNode(propertyName, dataItem[propertyName],'');
                        }
                    }
                } else {
                    buildNode("", dataItem);
                }
                return dataItems;
            };

            if (diff.changes) {
                angular.forEach(diff.changes, _buildChangeView);
            }
            if (typeof diff.lhs.loadAll === 'function') {
                diff.lhs.loadAll();
            }

            var _lhs = {};
            var _rhs = {};
            /* make normalized object */
            angular.extend(_lhs, diff.lhs);
            angular.extend(_lhs, diff.rhs);
            /* duplicate to _rhs */
            angular.extend(_rhs, _lhs);
            /* restore original lhs data */
            angular.extend(_lhs, diff.lhs);

            diff.model = {
                lhs: _buildTable(_lhs, _blacklist),
                rhs: _buildTable(_rhs, _blacklist)
            };

            $log.debug(diff.model.lhs, diff.changes);
        };

        var _buildChangeView = function (change) {
            if (angular.isArray(change)) {
                angular.forEach(change, _buildChangeView);
            } else if (angular.isObject(change) && !change.model) {
                if (change.path) {
                    var path = _buildObjectByPath(change.path, null);
                    var lhs, rhs;
                    lhs = change.lhs;
                    rhs = change.rhs;
                    change.apply = false;
                    change.model = {
                        path: dreFrontendEntryService.buildTable(path, _blacklist),
                        lhs: dreFrontendEntryService.buildTable(lhs, _blacklist),
                        rhs: dreFrontendEntryService.buildTable(rhs, _blacklist)
                    };
                } else {
                    $log.debug("no path", change);
                }
            }
        };

        var _buildObjectByPath = function(path, val){
                var p = path.slice(0);

                var f = function (_path) {
                    var n = _path.shift();

                    var res;
                    switch (typeof n) {
                        case "number":
                            res = [];
                            res[n] = f(_path);
                            break;
                        case "string":
                            res = {};
                            res[n] = f(_path);
                            break;
                        default:
                            res = val;
                    }

                    return res;
                };
                return f(p);
        };

        return {
            buildChangeView: _buildChangeView,
            buildDiffView: _buildDiffView,
            normalizeTree: _normalizeTree
        };
    });
