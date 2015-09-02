"use strict";
/*
codes:
BMI - 39156-5, 60621009
Blood pressure systolic - 8480-6,271649006
    distolic - 8480-4, 271650006
 */
angular.module('dreFrontend.fhir')
  .factory('dreFrontendObservations', function (dreFrontendFhirService) {

    function Observations(data) {
      this.setData(data);
    }

    Observations.prototype.setData = function (data) {
        if (data)
            angular.extend(this, data);
    };

    var observations = {
        getLastHeight: function(patient_id){
            return dreFrontendFhirService.search("Observation", {
                "code": "8302-2",
                "subject:Patient": patient_id,
                "_sort:desc": "date",
                "_count": 1
            })
            .then(function (response) {
                return new Observations(response);
            });
        },
        getLastWeight: function(patient_id){
            return dreFrontendFhirService.search("Observation", {
                "code": "29463-7,27113001,3141-9",
                "subject:Patient": patient_id,
                "_sort:desc": "date",
                "_count": 1
            })
            .then(function (response) {
                return new Observations(response);
            });
        },
        getWeightHistory: function(patient_id, count){
            return dreFrontendFhirService.search("Observation", {
                "code": "29463-7,27113001,3141-9",
                "subject:Patient": patient_id,
                "_sort:desc": "date",
                "_count": (typeof count == 'undefined')? 30 : count
            })
            .then(function (response) {
                return new Observations(response);
            });
        },
        getHeightHistory: function(patient_id, count){
            return dreFrontendFhirService.search("Observation", {
                "code": "8302-2",
                "subject:Patient": patient_id,
                "_sort:desc": "date",
                "_count": (typeof count == 'undefined')? 30 : count
            })
            .then(function (response) {
                return new Observations(response);
            });
        },
        getByPatientId: function (patient_id) {
            return dreFrontendFhirService.search("Observation", {patient: patient_id})
                .then(function (response) {
                  angular.forEach(response.entry, function (resource) {
                        resource.observation.load();
                  });
                  return new Observations(response);
                });
        },
        getById: function (id) {
            return dreFrontendFhirService.read('Observation', id)
                .then(function (response) {
                    return new Observations(response);
                });
        },
        getAll: function () {
            return dreFrontendFhirService.read('Observation')
                .then(function (response) {
                    return new Observations(response);
                });
        }
    };

    return observations;
  });
