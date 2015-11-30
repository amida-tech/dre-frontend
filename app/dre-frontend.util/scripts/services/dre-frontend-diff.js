/**
 * Created by igi on 25.11.15.
 */
"use strict";

angular.module('dreFrontend.util')
    .factory('dreFrontendDiff', function ($log, $q, dreFrontendEntryService, dreFrontendUtil, _, dreFrontendGlobals) {

        var _blacklist = ['meta', 'id', 'resourceType', 'patient', 'reference', 'extension'];

        var _buildDiffView = function (diff) {
            diff.updating = true;
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

                var _f1 = function (marker, param_name) {

                    if (marker && marker.node[param_name]) {
                        marker.parent = marker.node;
                        marker.node = marker.node[param_name];
                        marker.nodeKey = param_name;
                    } else {
                        marker = null;
                    }

                };

                var _f2 = function (marker, neibMarker, change, side) {
                    if (marker) {
                        if (marker.nodeKey === 'reference') {
                            if (typeof marker.parent === 'object') {
                                marker.parent.diff = {
                                    change: change,
                                    ref: _.cloneDeep(neibMarker.parent),
                                    side: side
                                };
                            }
                        } else {
                            if (typeof marker.node !== 'object') {
                                var node_val = marker.node;
                                marker.parent[marker.nodeKey] = {
                                    value: node_val
                                };
                                marker.node = marker.parent[marker.nodeKey];
                            }

                            if (typeof marker.node === 'object') {
                                marker.node.diff = {
                                    change: change,
                                    ref: neibMarker.node.value || neibMarker.node,
                                    side: side
                                };
                            }
                        }
                    }
                };

                var f = function (obj) {
                    return {
                        node: obj,
                        parent: null,
                        nodeKey: ''
                    };
                };

                /* mark changed nodes */
                for (var i = 0; i < diff.changes.length; i++) {
                    var lMark = f(_lhs);
                    var rMark = f(_rhs);
                    var path = diff.changes[i].path;

                    for (var p = 0; p < path.length; p++) {
                        _f1(lMark, path[p]);
                        _f1(rMark, path[p]);
                    }

                    _f2(lMark, rMark, diff.changes[i], 'l');

                    if (diff.changes[i].kind === "D") {
                        _f2(rMark, lMark, diff.changes[i], 'r');
                    }
                }

                var lhs_title = _.result(_.find(dreFrontendGlobals.resourceTypes, {fhirType: diff.lhs.resourceType}), 'title') ||
                    dreFrontendUtil.camelCaseToString(diff.lhs.resourceType);

                var rhs_title = _.result(_.find(dreFrontendGlobals.resourceTypes, {fhirType: diff.rhs.resourceType}), 'title') ||
                    dreFrontendUtil.camelCaseToString(diff.rhs.resourceType);

                var model = {
                    lhs: {
                        view: dreFrontendEntryService.buildTable(_lhs, _blacklist),
                        title: lhs_title,
                        entry: dreFrontendEntryService.getEntry(
                            diff.lhs, '', dreFrontendGlobals.menuRecordTypeEnum.none
                        )
                    },
                    rhs: {
                        view: dreFrontendEntryService.buildTable(_rhs, _blacklist),
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
            } else if (angular.isObject(change) && typeof change.apply === 'undefined') {
                change.apply = false;
                /*
                 if (change.path) {
                 var path = _buildObjectByPath(change.path, '');
                 var lhs, rhs;
                 lhs = change.lhs;
                 rhs = change.rhs;

                 change.model = {
                 path: dreFrontendEntryService.buildTable(path, []),
                 lhs: dreFrontendEntryService.buildTable(lhs, []),
                 rhs: dreFrontendEntryService.buildTable(rhs, [])
                 };
                 } else {
                 $log.debug("no path", change);
                 }
                 */
            }
        };
        /*
         var _buildObjectByPath = function (path, val) {
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
         */
        return {
            buildChangeView: _buildChangeView,
            buildDiffView: _buildDiffView
        };
    });
