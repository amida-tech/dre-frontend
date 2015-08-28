"use strict";

angular.module('dreFrontend.fhir')
  .factory('DreFrontendMedications',function(dreFrontendFhirService){


    function Medications(data) {
      this.setData(data);
    }

    Medications.prototype.setData = function(data) {
      if (data)
        angular.extend(this, data);
    };

    var medications = {
      getByPatientId: function(patient_id) {
        return dreFrontendFhirService.search("MedicationPrescription", {patient: patient_id})
          .then(function (response) {
            /* do data formating here */
            _.each(response.enrty,function(resource){
              resource.medication.load();
            });
            return new Medications(response);
        });
      },
      getOne: function(id) {
        return dreFrontendFhirService.read('Medication',id)
          .then(function(response){
            console.log(response);
            new Medications(response);
            return response;
          });
      }
    };

    return medications;
  });
