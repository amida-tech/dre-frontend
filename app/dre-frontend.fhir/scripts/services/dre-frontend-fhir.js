"use strict";

angular.module('dreFrontend.fhir')
    .provider("dreFrontendFhirService", function () {

        var _count = 10;

        return {
            setCount: function _set_page_length(count) {
                _count = count;
            },
            $get: function (Restangular, $q, fhirEnv, dreFrontendUtil, $log, _, $injector) {

                function _FhirClass(resource) {
                    var Class;
                    if (resource && resource.resourceType) {
                        var _name = 'Fhir' + resource.resourceType;
                        try {
                            Class = $injector.get(_name);
                        } catch (e) {
                            $log.debug(_name + ' not found. Using FhirResource class');
                            Class = $injector.get('FhirResource');
                        }
                    }
                    return Class;
                }

                function _add_page_handlers(bundleResource) {
                    if (bundleResource.resourceType === fhirEnv.bundleType) {
                        var handlers = {};
                        angular.forEach(bundleResource.link,
                            function (_link) {
                                if (_link.relation === "next" || _link.relation === "previous") {
                                    var params = dreFrontendUtil.getURLparams(_link.url);
                                    params._getpagesoffset *= 1;
                                    params._count *= 1;
                                    handlers[_link.relation] = function () {
                                        return Restangular.one('').get(params).then(set_response);
                                    };
                                    handlers.getPage = function (offset) {
                                        var page_count = bundleResource.total / params._count + 1;
                                        if (offset >= 0 && offset < page_count) {
                                            var _params = params;
                                            _params._getpagesoffset = params._count * offset;
                                            return Restangular.one('').get(_params).then(set_response);
                                        } else {
                                            return $q.reject("incorrect page number");
                                        }
                                    };
                                }
                            }
                        );
                        angular.extend(bundleResource, handlers);
                    }
                }

                function _is_valid_resource_type(resourceType) {
                    return (resourceType && dreFrontendUtil.isFhirResource(resourceType)) ?
                        $q.resolve(resourceType) : $q.reject("unsupported resource type: " + resourceType);
                }

                function set_response(resource) {
                    var Class;

                    function f(r) {
                        return _.omit(r, ["base", "link", "search", "text"]);
                    }

                    /* removing unnecessary data */

                    resource = Restangular.stripRestangular(resource);
                    resource = f(resource);

                    if (resource.resourceType === fhirEnv.bundleType) {
                        _add_page_handlers(resource);

                        resource.entry = _.pluck(resource.entry, "resource");

                        if (resource.entry.length > 0) {
                            Class = _FhirClass(resource.entry[0]);

                            for (var n = 0; n < resource.entry.length; n++) {
                                resource.entry[n] = new Class(f(resource.entry[n]));
                            }
                            resource.entry = _.sortByOrder(resource.entry, function (item) {
                                return item.getSortValue();
                            },'desc');
                        }
                    } else {
                        Class = _FhirClass(resource);
                        resource = new Class(resource);
                    }

                    return resource;
                }

                function _search(resourceType, params) {
                    var _params = params;
                    if (typeof _params === "undefined") {
                        _params = resourceType;
                        resourceType = null;
                    }

                    if (!_params._count) {
                        angular.extend(_params, {"_count": _count});
                    }

                    if (resourceType) {
                        return _is_valid_resource_type(resourceType)
                            .then(function (resType) {
                                return Restangular.one(resType, '_search').get(_params).then(set_response);
                            });
                    } else {
                        return Restangular.one('_search').get(_params).then(set_response);
                    }
                }

                function _read(resourceType, id) {
                    var params = (typeof id === 'undefined') ? {"_count": _count} : {};

                    return _is_valid_resource_type(resourceType)
                        .then(function (resType) {
                            return Restangular.one(resType, id).get(params).then(set_response);
                        });
                }

                function _history(resourceType, id, version, params) {
                    var _params = params || {};

                    return Restangular.one(resourceType, id).one("_history", version).get(_params).then(set_response);
                }

                function _create(resourceType, data) {
                    return Restangular.one(resourceType).customPOST(data)
                        .then(function (operationOutcome) {
                            var ref = dreFrontendUtil.parseResourceReference(operationOutcome.issue[0].diagnostics);
                            return _read(ref[0], ref[1]);
                        });
                }

                function _update(resourceType, id, resource) {
                    return Restangular.one(resourceType, id).customPUT(resource);
                }

                function _delete(resourceType, id) {
                    return $q.reject("not implemented 'delete(", resourceType, id, ")'");
                }

                return {
                    search: _search,
                    read: _read,
                    history: _history,
                    create: _create,
                    update: _update,
                    delete: _delete,
                    getCount: function () {
                        return _count;
                    }
                };
            }
        };
    });
