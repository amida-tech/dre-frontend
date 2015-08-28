"use strict";

angular.module('dreFrontend.fhir')
  .factory('DreFrontendMedications', function (dreFrontendFhirService,$q) {

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
            var medicationsArray = [];
            angular.forEach(response.entry, function (resource) {
              medicationsArray.push(resource.medication.load());
            });
            return $q.all(medicationsArray).then(function(){
              return new Medications(response);
            });
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
