'use strict';

angular.module('dreFrontend.fhir')
  .service('$fhir', ['Restangular',"$q",function(Restangular,$q){
    var resource;

    function set_response(res) {
      resource = res;
      /*
      do response processing here:
      - inject getters
      - format data
      - etc
       */
      return res;
    }

    function _search (resourceType, params) {
      if (typeof params == "undefined")
        return Restangular.one('_search').get(resourceType).then(set_response);
      else
        return Restangular.one(resourceType,'_search').get(params).then(set_response);
    }

    function _read(resourceType, id) {
      return Restangular.one(resourceType, id).get().then(set_response);
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
  }]);
