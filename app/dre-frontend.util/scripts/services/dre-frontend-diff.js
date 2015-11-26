/**
 * Created by igi on 25.11.15.
 */
"use strict";

angular.module('dreFrontend.util')
    .factory('dreFrontendDiff', function ($log, $q, dreFrontendEntryService, dreFrontendUtil, _, dreFrontendGlobals) {

        var _blacklist = [];
//        var _blacklist = ['meta', 'id', 'reference', 'resourceType', 'patient'];

        var isValidName = function (name, black_list) {
            return (name[0] !== '$' && !_.contains(black_list, name));
        };

        var _buildDiffView = function (diff) {
            diff.updating = true;
            /*
             var _getChange = function (path) {
             var res = null;

             for (var c = 0; c < diff.changes.length && !res; c++) {
             if (!res && _.isEqual(diff.changes[c].path, path)) {
             res = diff.changes[c];
             }
             }

             return res;
             };
             */
            var _buildTable = function (dataItem, blackList) {
                var dataItems = [];
                blackList = blackList || _blacklist;
//                blackList = blackList.concat();

                var buildNode = function (_key, _val) {
                    var node = {
                        type: 'string',
                        label: dreFrontendUtil.camelCaseToString(_key),
                        value: null,
                        cssClass: _key === 'display' ? 'highlight' : '',
                        diff: {}
                    };

                    if (_val && _val.diff) {
                        angular.extend(node.diff,_val.diff);
                        _val.diff = undefined;
                    }

                    if (_key === 'system') {
                        _val = dreFrontendUtil.encodeSystemURL(_val);
                    }

                    switch (dreFrontendUtil.guessDataType(_val)) {
                        case 'object':
                            var rowObjectData = _buildTable(_val, blackList);
                            if (angular.isArray(rowObjectData) && rowObjectData.length > 0) {
                                node.value = rowObjectData;
                                node.type = 'object';
                            }
                            break;

                        case 'array':
                            var allScalar = true;
                            node.value = [];
                            _val.forEach(function (item, _ind) {
                                var rowItemData = item;
                                if (!angular.isString(item)) {
                                    if (_key === 'coding') {
                                        item = dreFrontendUtil.reorderObjectFields(item, _key);
                                    }
                                    allScalar = false;
                                    rowItemData = _buildTable(item, blackList);
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
                            $log.debug(propertyName);
                            buildNode(propertyName, dataItem[propertyName]);
                        }
                    }
                } else {
                    buildNode("", dataItem);
                }
                return dataItems;
            };

            var queue = [];

            if (diff.changes) {
                angular.forEach(diff.changes, _buildChangeView);
            }


            if (typeof diff.lhs.loadAll === 'function') {
                queue.push(diff.lhs.loadAll());
            }

            if (typeof diff.rhs.loadAll === 'function') {
                queue.push(diff.rhs.loadAll());
            }

            return $q.all(queue).then(function () {
                /* make clone object */
                var _lhs = _.cloneDeep(diff.lhs);
                var _rhs = _.cloneDeep(diff.lhs);

                /* extend with rhs data */
                angular.extend(_lhs, diff.rhs);

                /* restore original rhs data */
                angular.extend(_rhs, diff.rhs);

                /* restore original lhs data */
                angular.extend(_lhs, diff.lhs);

                /* mark changed nodes */
                for (var i = 0; i < diff.changes.length; i++) {
                    var r = _rhs, obj_r = null, l = _lhs, obj_l = null;

                    for (var p = 0; p < diff.changes[i].path.length; p++) {
                        if (r && r[diff.changes[i].path[p]]) {
                            obj_r = r;
                            r = r[diff.changes[i].path[p]];
                        } else {
                            obj_r = null;
                        }
                        if (l && l[diff.changes[i].path[p]]) {
                            obj_l = l;
                            l = l[diff.changes[i].path[p]];
                        } else {
                            obj_l = null;
                        }
                    }

                    if (obj_r) {
                        $log.debug(obj_r);
                        r.diff = {
                            kind: diff.changes[i].kind,
                            ref: l
                        };
                    }

                    if (obj_l) {
                        $log.debug(obj_l);
                        obj_l.diff = {
                            kind: diff.changes[i].kind,
                            ref: r
                        };
                    }
                }

                var lhs_title = _.result(_.find(dreFrontendGlobals.resourceTypes, {fhirType: diff.lhs.resourceType}), 'title') ||
                    dreFrontendUtil.camelCaseToString(diff.lhs.resourceType);
                var rhs_title = _.result(_.find(dreFrontendGlobals.resourceTypes, {fhirType: diff.rhs.resourceType}), 'title') ||
                    dreFrontendUtil.camelCaseToString(diff.rhs.resourceType);

                var model = {
                    lhs: {
                        view: _buildTable(_lhs, _blacklist),
                        title: lhs_title,
                        entry: dreFrontendEntryService.getEntry(
                            diff.lhs, '', dreFrontendGlobals.menuRecordTypeEnum.none
                        )
                    },
                    rhs: {
                        view: _buildTable(_rhs, _blacklist),
                        title: rhs_title,
                        entry: dreFrontendEntryService.getEntry(
                            diff.rhs, '', dreFrontendGlobals.menuRecordTypeEnum.none
                        )
                    }
                };

                diff.updating = false;

                return model;
            });
        };

        var _buildChangeView = function (change) {
            if (angular.isArray(change)) {
                angular.forEach(change, _buildChangeView);
            } else if (angular.isObject(change) && !change.model) {
                if (change.path) {
                    var path = _buildObjectByPath(change.path, '');
                    var lhs, rhs;
                    lhs = change.lhs;
                    rhs = change.rhs;
                    change.apply = false;
                    change.model = {
                        path: dreFrontendEntryService.buildTable(path, []),
                        lhs: dreFrontendEntryService.buildTable(lhs, []),
                        rhs: dreFrontendEntryService.buildTable(rhs, [])
                    };
                } else {
                    $log.debug("no path", change);
                }
            }
        };

        var _buildObjectByPath = function (path, val) {
            var p = path.slice(0);

            var f = function (_path) {
                var n = _path.shift();
                $log.debug(n);
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
            buildDiffView: _buildDiffView
        };
    });
