"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendProcedures', function (dreFrontendFhirService, fhirEnv) {

        function Procedures(data) {
            this.setData(data);
        }

        Procedures.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var Procedures = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Procedure", {patient: patient_id})
                    .then(function (response) {
                        return new Procedures(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Procedure', id)
                    .then(function (response) {
                        return new Procedures(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('Procedure')
                    .then(function (response) {
                        return new Procedures(response);
                    });
            },
        };
        return Procedures;
});