"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationOrder', function (dreFrontendFhirService, $q) {

        function setData(obj, data) {
            if (data)
                angular.extend(obj, data);
        }

        function MedicationOrder(data) {
            setData(this, data);
        }

        MedicationOrder.prototype.setBaseTemplate = function () {
            angular.extend(this, {
                "resourceType": "MedicationOrder",
                "dateWritten": "", // When prescription was authorized <dateTime>
                "status": "", // active | on-hold | completed | entered-in-error | stopped | draft
                "dateEnded": "", // When prescription was stopped <dateTime>
                "patient": {}, // Who prescription is for  Reference(Patient)
                "prescriber": {}, // Who ordered the medication(s) Reference(Practitioner)
                "note": "", // Information about the prescription
                "medicationReference": {} // Reference(Medication)
            });
        };

        MedicationOrder.prototype.createEntry = function () {

        };

        MedicationOrder.prototype.update = function () {

        };

        var medications = {
            getEmpty: function () {
                return new MedicationOrder().setBaseTemplate();
            },
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationOrder", {patient: patient_id})
                    .then(function (response) {
                        var medicationsArray = [];
                        angular.forEach(response.entry, function (resource) {
                            if (resource.medicationReference) {
                                medicationsArray.push(resource.medicationReference.load());
                            }
                        });
                        return $q.all(medicationsArray).then(function () {
                            return new MedicationOrder(response);
                        });
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationOrder', id)
                    .then(function (response) {
                        return new MedicationOrder(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationOrder')
                    .then(function (response) {
                        return new MedicationOrder(response);
                    });
            },
            save: function (data) {
                var fhir_medication, fhir_prescriber;
                var res;

                if (!data.patient || !data.patient.id) {
                    res = $q.reject(err_messages.patient_unset);
                }

                if (!data.entry) {

                    if (!res) {
                        res = $q.reject("empty MedicationOrder.save()");
                    }
                    return res;
                }
            }
        };
        return medications;
    });
