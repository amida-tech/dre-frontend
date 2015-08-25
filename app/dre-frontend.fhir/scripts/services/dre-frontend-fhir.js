"use strict";

angular.module('dreFrontend.fhir')
  .service("dreFrontendFhirService", function(Restangular,$q, fhirEnv, dreFronendUtil) {

    function is_valid_resource_type(resourceType) {
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
      if (res.resourceType == "Bundle")
        angular.forEach(res.entry, function(v) {add_resource_loader(v.resource);});
      else
        add_resource_loader(res);
      return res;
    }

    function add_resource_loader(r) {
      angular.forEach(r, function(v){
        if (v && typeof v == "object" && v.hasOwnProperty("reference")) {
          angular.extend(v,{
            load: function() {
              var self = this;
              var p = v.reference.split("/");
              return Restangular.one(p[0],p[1]).get().then(function(sub_resource) {
                add_resource_loader(sub_resource);
                angular.extend(self,sub_resource);
                return sub_resource;
              });
            }
          });
        }
      });
    }

    function _search (resourceType, params) {
      if (typeof params == "undefined")
        return Restangular.one('_search').get(resourceType).then(set_response);
      else
        return is_valid_resource_type(resourceType)
          .then(function(resType){
            return Restangular.one(resType,'_search').get(params).then(set_response);
          });
    }

    function _read(resourceType, id) {
      return is_valid_resource_type(resourceType)
        .then(function(resType) {
          return Restangular.one(resType, id).get().then(set_response);
        });
    }

    function _history(resourceType, id, parames) {
      return $q.reject("not implemented");
    }

    function _create(resourceType,data) {
      return $q.reject("not implemented");
    }

    function _update(resourceType, id, data) {
      return $q.reject("not implemented");
    }

    function _delete(resourceType, id) {
      return $q.reject("not implemented");
    }

    this.search = _search;
    this.read = _read;

    this.history = _history;
    this.create = _create;
    this.update = _update;
    this.delete = _delete;
  });
