/**
 * Created by igi on 19.10.15.
 */
"use strict";

angular.module('dreFrontend.fhir')
    .factory('fhirValueSet', function (dreFrontendFhirService) {
        function searchValueSetByName(_name) {
            return dreFrontendFhirService.search('ValueSet',{name:_name})
                .then(function(bundle){
                    var res = [];
                    if (bundle.entry.length > 0) {
                        res = bundle.entry[0].codeSystem.concept;
                    }
                    return res;
                });
        }

        return {
            get: searchValueSetByName
        };
    });
