/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirResource', function (dreFrontendFhirService, dreFrontendUtil, _, fhirEnv, $log, $q) {

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
                    $log.debug('_loading...', prop, this.reference);
                    var process_sub_resource = function (sub_resource) {
                        angular.extend(self, dreFrontendUtil.asFhirObject(sub_resource));
                        return self;
                    };

                    if (force || !this.resourceType) {
                        if (val.reference.match(/^#.+/)) {
                            /* contained resource */
                            var _data = _.first(_.filter(resource.contains, {"id": val.reference.substring(1)})) || {};
                            return process_sub_resource(_data);
                        } else {
                            /* relative reference resource */
                            var p = val.reference.split("/");
                            return dreFrontendFhirService.read(p[0], p[1])
                                .then(process_sub_resource);
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
            var res;
            if (angular.isArray(cc_data)) {
                cc_data = cc_data[0];
            }
            if (cc_data) {
                if (cc_data.coding && cc_data.coding[0]) {
                    res = cc_data.coding[0].display || cc_data.coding[0].code;
                } else {
                    res = cc_data.text;
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

        return FhirResource;
    });

