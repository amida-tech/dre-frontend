"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendPractitioners', function (dreFrontendFhirService, fhirEnv) {

        function Practitioners(data) {
            this.setData(data);
        }

        Practitioners.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var practitioners = {
            getById: function (id) {
                return dreFrontendFhirService.read('Practitioner', id)
                    .then(function (response) {
                        return new Practitioners(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('Practitioner')
                    .then(function (response) {
                        return new Practitioners(response);
                    });
            },
        };
        return practitioners;
});