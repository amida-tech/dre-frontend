"use strict";

angular.module('dreFrontend.fhir')
  .factory('DreFrontendMedications', function (dreFrontendFhirService) {

    function Medications(data) {
      this.setData(data);
    }

    Medications.prototype.setData = function (data) {
      if (data)
        angular.extend(this, data);
    };

    var medications = {
      getByPatientId: function (patient_id) {
        return dreFrontendFhirService.search("MedicationPrescription", {patient: patient_id})
          .then(function (response) {
            angular.forEach(response.entry, function (resource) {
              resource.medication.load();
            });
            return new Medications(response);
          });
      },
      getById: function (id) {
        return dreFrontendFhirService.read('Medication', id)
          .then(function (response) {
            return new Medications(response);
          });
      },
      getAll: function () {
        return dreFrontendFhirService.read('Medication')
          .then(function (response) {
            return new Medications(response);
          });
      }
    };

    return medications;
  });
