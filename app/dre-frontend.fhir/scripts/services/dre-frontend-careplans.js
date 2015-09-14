"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendCarePlans', function (dreFrontendFhirService, fhirEnv) {

        function CarePlans(data) {
            this.setData(data);
        }

        CarePlans.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var carePlans = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("CarePlan", {patient: patient_id})
                    .then(function (response) {
                        return new CarePlans(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('CarePlan', id)
                    .then(function (response) {
                        return new CarePlans(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('CarePlan')
                    .then(function (response) {
                        return new CarePlans(response);
                    });
            },
        };
        return carePlans;
});