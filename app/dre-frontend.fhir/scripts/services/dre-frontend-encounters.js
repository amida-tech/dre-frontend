"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendEncounters', function (dreFrontendFhirService, $q, fhirEnv) {

        function Encounters(data) {
            this.setData(data);
        }

        Encounters.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };

        var encounters = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Encounter", {patient: patient_id})
                    .then(function (bundle) {
                        var locations = [];
                        angular.forEach(bundle.entry, function(res,res_key){
                            angular.forEach(res.location, function(location_entry){
                                if (location_entry.location)
                                    locations.push(location_entry.location.load());
                            });
                        });
                        return $q.all(locations).then(function(){
                            return new Encounters(bundle);
                        });
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Encounter', id)
                    .then(function (response) {
                        return new Encounters(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('Encounter')
                    .then(function (response) {
                        return new Encounters(response);
                    });
            },
        };
        return encounters;
});
