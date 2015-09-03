"use strict";

angular.module('dreFrontend.fhir')
    .provider("dreFrontendFhirService", function () {

        var _count = 10;

        return {
            setCount: function _set_page_length(count) {
                _count = count;
            },
            $get: function (Restangular, $q, fhirEnv) {

                function _get_params(url) {
                    var res = {};
                    var params = url.slice(url.indexOf('?') + 1).split('&');
                    for (var i = 0; i < params.length; i++) {
                        var param = params[i].split('=');
                        res[param[0]] = param[1];
                    }
                    return res;
                }

                function _add_page_handlers(bundleResource) {
                    if (bundleResource.resourceType == fhirEnv.bundleType) {
                        var handlers = {};
                        angular.forEach(bundleResource.link,
                            function (_link) {
                                if (_link.relation == "next" || _link.relation == "previous")
                                    handlers[_link.relation] = function () {
                                        return Restangular.one('').get(_get_params(_link.url)).then(set_response);
                                    };
                            }
                        );
                        angular.extend(bundleResource, handlers);
                    }
                }

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

                function set_response(res) {
                    function _omit(r) {
                        return _.omit(r, ["type", "base", "link", "search", "text"]);
                    }

                    if (res.resourceType == fhirEnv.bundleType) {
                        _add_page_handlers(res);
                        angular.forEach(res.entry, function (v) {
                            if (v.resource)
                                add_resource_loader(v.resource);
                        });
                    } else
                        add_resource_loader(res);

                    /* remove unnecessary data */

                    res = Restangular.stripRestangular(res);
                    res = _omit(res);

                    if (res.resourceType == fhirEnv.bundleType) {
                        res.entry = _.pluck(res.entry, "resource");
                        _.forEach(res.entry, function (e, k) {
                            res.entry[k] = _omit(e);
                        });
                    }

                    return res;
                }

                function add_resource_loader(resource) {
                    var f = function (prop) {
                        if (prop && typeof prop == "object" && prop.hasOwnProperty("reference")) {
                            console.log(prop.reference);
                            angular.extend(prop, {
                                load: function () {
                                    var self = this;

                                    var process_sub_resource = function (sub_resource) {
                                        sub_resource = set_response(sub_resource);
                                        angular.extend(self, sub_resource);
                                        return sub_resource;
                                    };

                                    if (prop.reference.match(/^#.+/)) {
                                        /* contained resource */
                                        var data = _.first(_.filter(resource.contains, {"id": prop.reference.substring(1)})) || {};
                                        return process_sub_resource(data);
                                    } else {
                                        /* relative reference resource */
                                        var p = prop.reference.split("/");
                                        return Restangular.one(p[0], p[1]).get().then(process_sub_resource);
                                    }
                                    /*2do: add absolute reference handling */

                                }
                            });
                        }
                    };
                    /* add loaders into resources */
                    angular.forEach(resource, f);

                    /* add loaders into result array */
                    if (resource.result)
                        angular.forEach(resource.result, f);
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

                function _history(resourceType, id, parames) {
                    return $q.reject("not implemented");
                }

                function _create(resourceType, data) {
                    return Restangular.one("").post(resourceType, data);
                }

                function _update(resourceType, id, data) {
                    return $q.reject("not implemented");
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
