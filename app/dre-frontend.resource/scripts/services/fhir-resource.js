/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirResource', function (dreFrontendUtil, _, fhirEnv, $log, $q,
                                       dreFrontendFhirService, dreFrontendGlobals) {

        var FhirResource = function (data) {
            this.setData(data);
        };

        FhirResource.prototype.setData = function (data) {
            if (data) {
                this._proceedReferences(data, this._addRefLoader, fhirEnv.max_resource_nesting);

                angular.extend(this, data);
            }
        };

        FhirResource.prototype._addRefLoader = function (val, prop) {
            var resource = this;
            angular.extend(val, {
                load: function (force) {
                    var self = val;
                    var process_sub_resource = function (sub_resource) {
                        angular.extend(self, dreFrontendUtil.asFhirObject(sub_resource));
                        return self;
                    };

                    if (force || !this.resourceType) {
                        var ref = this.reference;
                        if (val.reference.match(/^#.+/)) {
                            /* contained resource */
                            var _data = _.first(_.filter(resource.contains, {"id": val.reference.substring(1)})) || {};
                            return process_sub_resource(_data);
                        } else {
                            /* relative reference resource */
                            var p = val.reference.split("/");
                            return dreFrontendFhirService.read(p[0], p[1])
                                .then(process_sub_resource)
                                .catch(function (err) {
                                    $log.debug('error loading ', prop, ref);
                                    $log.debug(err);
                                    return $q.reject(err);
                                });
                        }
                        /*2do: add absolute reference handling */
                    } else {
                        return $q.resolve(this);
                    }

                }
            });
        };

        FhirResource.prototype._proceedReferences = function (resource, callback, deep) {
            if (deep >= 0) {
                _.forEach(resource, function (v, k) {
                    var _type = typeof v;
                    if (v && _type === "object" && v.hasOwnProperty("reference")) {
                        if (callback && typeof callback === "function") {
                            callback(v, k);
                        }
                    }
                    if (v && (_type === "object" || _type === "array")) {
                        FhirResource.prototype._proceedReferences(v, callback, deep - 1);
                    }
                });
            }
        };

        FhirResource.prototype.save = function () {
            var _data = angular.fromJson(angular.toJson(this));
            var self = this;

            var f = function (resp) {
                self.setData(resp);
                return self;
            };
            if (!_data.id) {
                return dreFrontendFhirService.create(_data.resourceType, _data)
                    .then(f);
            } else {
                return dreFrontendFhirService.update(_data.resourceType, _data.id, _data)
                    .then(f);
            }
        };

        FhirResource.prototype.codableConceptTitle = function (cc_data) {
            var extrValue = function (fld) {
                if (fld && fld.nodeValue) {
                    return fld.nodeValue;
                } else {
                    return fld;
                }
            };

            var res;

            if (angular.isArray(cc_data)) {
                cc_data = cc_data[0];
            }
            if (cc_data) {
                if (cc_data.coding && cc_data.coding[0]) {
                    res = extrValue(cc_data.coding[0].display) || extrValue(cc_data.coding[0].code);
                } else {
                    res = extrValue(cc_data.text);
                }
            }
            return res;
        };

        /* do nothing. extend in childs */
        FhirResource.prototype.setBaseTemplate = function () {
            angular.extend(this, {});
        };

        FhirResource.prototype.loadAll = function (deep, filterName, force) {
            var children = [];
            var self = this;
            filterName = filterName || "details";
            var a_filter = [];
            var r_type = fhirEnv.resourceTypes[this.resourceType];

            if (r_type && r_type.hasOwnProperty(filterName)) {
                a_filter = r_type[filterName];
            }

            FhirResource.prototype._proceedReferences(
                this,
                function (resource, key) {
                    if (a_filter.length < 1 || a_filter.indexOf(key) !== -1) {
                        children.push(resource.load(force));
                    }
                },
                deep || fhirEnv.max_resource_nesting);

            return $q.all(children).then(function () {
                return self;
            });
        };

        FhirResource.prototype._getExtension = function (obj, _key, valueType) {
            var res = _.filter(obj.extension, {url: _key});
            if (valueType && res) {
                var _tmp = res.shift();
                res = _tmp ? _tmp['value' + valueType] : undefined;
            }
            return res;
        };

        FhirResource.prototype._getSourceExtension = function () {
            return this._getExtension(this, dreFrontendGlobals.amidaExtensions.source);
        };

        FhirResource.prototype.getSources = function () {
            var src_links = this._getSourceExtension();
            var doc_refs = [];
            var add_data = [];

            if (src_links.length > 0) {
                for (var s = 0; s < src_links.length; s++) {
                    var ref = this._getExtension(src_links[s], dreFrontendGlobals.amidaExtensions.ref, 'String');
                    var _date = this._getExtension(src_links[s], dreFrontendGlobals.amidaExtensions.date, 'DateTime') ||
                        this._getExtension(src_links[s], dreFrontendGlobals.amidaExtensions.date, 'Date');

                    var _data = {
                        indexed: dreFrontendUtil.formatFhirDate(_date),
                        status: this._getExtension(src_links[s], dreFrontendGlobals.amidaExtensions.descr, 'String')
                    };

                    if (ref) {
                        var path = dreFrontendUtil.parseResourceReference(ref);
                        if (path && path.length === 4) {
                            add_data.push(_data);
                            doc_refs.push(dreFrontendFhirService.history(path[0], path[1], path[3]));
                        }
                    } else {
                        add_data.push({});
                        doc_refs.push($q.resolve(_data));
                    }
                }
                return $q.all(doc_refs).then(function (resp) {
                    for (var r = 0; r < resp.length; r++) {
                        resp[r].indexed = resp[r].indexed || add_data[r].indexed;
                        resp[r].status = add_data[r].status || resp[r].status;
                    }
                    return resp;
                });
            } else {
                return $q.resolve(doc_refs);
            }
        };

        FhirResource.prototype.title = function () {
            return '';
        };

        FhirResource.prototype.dates = function () {
            return {
                startDate: 0,
                endDate: 0,
                isActive: null
            };
        };

        FhirResource.prototype._formatDates = function (dates) {
            if (dates.startDate) {
                dates.startDate = new Date(dates.startDate);
            }
            if (dates.endDate) {
                dates.endDate = new Date(dates.endDate);
            }
            return dates;
        };

        FhirResource.prototype.getSortValue = function () {
            var _dates = this.dates();
            if (_dates.startDate) {
                return _dates.startDate.getTime();
            } else {
                return 0;
            }
        };

        FhirResource.prototype.additionalInfo = function () {
            return '';
        };

        return FhirResource;
    });

