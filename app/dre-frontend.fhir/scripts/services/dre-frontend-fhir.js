"use strict";

angular.module('dreFrontend.fhir')
    .provider("dreFrontendFhirService", function () {

        var _count = 10;

        return {
            setCount: function _set_page_length(count) {
                _count = count;
            },
            $get: function (Restangular, $q, fhirEnv, dreFrontendUtil, $log, _) {

                function _add_page_handlers(bundleResource) {
                    if (bundleResource.resourceType == fhirEnv.bundleType) {
                        var handlers = {};
                        angular.forEach(bundleResource.link,
                            function (_link) {
                                if (_link.relation == "next" || _link.relation == "previous") {
                                    var params = dreFrontendUtil.getURLparams(_link.url);
                                    params._getpagesoffset *= 1;
                                    params._count *= 1;
                                    handlers[_link.relation] = function () {
                                        return Restangular.one('').get(params).then(set_response);
                                    };
                                    handlers['getPage'] = function (offset) {
                                        var page_count = bundleResource.total / params._count + 1;
                                        if (offset >= 0 && offset < page_count) {
                                            var _params = params;
                                            _params._getpagesoffset = params._count * offset;
                                            return Restangular.one('').get(_params).then(set_response);
                                        } else {
                                            return $q.reject("incorrect page number");
                                        }
                                    }
                                }
                            }
                        );
                        angular.extend(bundleResource, handlers);
                    }
                }

                var loadChildren = function (deep) {
                    var children = [];
                    var self = this;

                    proceed_reference(
                        this,
                        function (resource) { children.push(resource.load()); },
                        deep || fhirEnv.max_resource_nesting );

                    return $q.all(children).then(function(){return self;});
                };

                function _is_valid_resource_type(resourceType) {
                    var res = $q.resolve(resourceType);

                    if (resourceType) {
                        if (fhirEnv.resourceTypes.indexOf(resourceType) != -1)
                            res = $q.resolve(resourceType);
                        else
                            res = $q.reject("unsupported resource type: " + resourceType);
                    }
                    return res;
                }

                function set_response(resource) {
                    function f(r) {
                        angular.extend(r, {
                            loadAll: loadChildren
                        });
                        return _.omit(r, ["base", "link", "search", "text"]);
                    }
                    /* remove unnecessary data */

                    resource = Restangular.stripRestangular(resource);
                    resource = f(resource);

                    if (resource.resourceType === fhirEnv.bundleType) {
                        _add_page_handlers(resource);

                        resource.entry = _.pluck(resource.entry, "resource");

                        _.forEach(resource.entry, function (e, k) {
                            resource.entry[k] = f(e);
                        });
                    }

                    proceed_reference(resource, add_reference_loader, fhirEnv.max_resource_nesting);

                    return resource;
                }

                function proceed_reference(node, callback, deep) {
                    if (deep>=0) {
                        _.forEach(node, function (v) {
                            var _type = typeof v;
                            if (v && _type === "object" && v.hasOwnProperty("reference")) {
                                if (callback && typeof callback === "function") callback(v);
                            }
                            if (_type === "object" || _type === "array") proceed_reference(v, callback, deep - 1);
                        });
                    }
                }

                function add_reference_loader(obj) {
                    angular.extend(obj, {
/*                        loaded: false,*/
                        load: function () {
                            var self = this;

                            var process_sub_resource = function (sub_resource) {
                                sub_resource = set_response(sub_resource);
                                angular.extend(self, sub_resource);
                                return sub_resource;
                            };

/*                            if (!this.loaded) {*/
                                if (obj.reference.match(/^#.+/)) {
                                    /* contained resource */
                                    var data = _.first(_.filter(resource.contains, {"id": obj.reference.substring(1)})) || {};
/*                                    this.loaded = true;*/
                                    return process_sub_resource(data);
                                } else {
                                    /* relative reference resource */
                                    var p = obj.reference.split("/");
/*                                    this.loaded = true;*/
                                    return Restangular.one(p[0], p[1]).get().then(process_sub_resource);
                                }
                                /*2do: add absolute reference handling */
/*                            } else {
                                return $q.resolve(this);
                            }
                            */
                        }
                    });
                }

                function _search(resourceType, params) {
                    if (typeof params == "undefined") {
                        params = resourceType;
                        resourceType = null;
                    }

                    if (!params._count)
                        angular.extend(params, {"_count": _count});

                    if (resourceType)
                        return _is_valid_resource_type(resourceType)
                            .then(function (resType) {
                                return Restangular.one(resType, '_search').get(params).then(set_response);
                            });
                    else
                        return Restangular.one('_search').get(params).then(set_response);
                }

                function _read(resourceType, id) {
                    var params = (typeof id == 'undefined') ? {"_count": _count} : {};

                    return _is_valid_resource_type(resourceType)
                        .then(function (resType) {
                            return Restangular.one(resType, id).get(params).then(set_response);
                        });
                }

                function _history(resourceType, id, version, params) {
                    return Restangular.one(resourceType, id).one("_history", version).get(params).then(set_response);
                }

                function _create(resourceType, data) {
                    return Restangular.one("").post(resourceType, data);
                }

                function _update(resourceType, id, resource) {
                    return Restangular.one(resourceType, id).customPUT(resource);
                }

                function _delete(resourceType, id) {
                    return $q.reject("not implemented");
                }

                return {
                    search: _search,
                    read: _read,
                    history: _history,
                    create: _create,
                    update: _update,
                    delete: _delete
                };
            }

        };
    });
