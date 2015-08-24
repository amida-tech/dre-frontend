'use strict';

angular.module('dreFrontend.fhir')
  .service('$fhir', ['Restangular',function(Restangular){
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
      return Restangular.one(resourceType, id).get().then(setResponse);
    }

    this.search = _search;
    this.read = _read;
  }]);
