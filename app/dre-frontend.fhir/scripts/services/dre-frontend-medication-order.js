"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationOrder', function (dreFrontendFhirService, $q) {

        var err_messages = {
            test_err: 'Called method is not imlemented yet in MedicationOrder',
            patient_unset: 'Patient data undefined',
            drug_save_error: 'Error while saving medication',
            prescriber_err: 'Error while saving prescriber'
        };

        function setData(obj, data) {
            if (data)
                angular.extend(obj, data);
        }

        function MedicationOrder(data) {
            setData(this, data);
        }

        MedicationOrder.prototype.baseTemplate = function () {
            return {
                "resourceType": "MedicationOrder",
                "dateWritten": "", // When prescription was authorized <dateTime>
                "status": "", // active | on-hold | completed | entered-in-error | stopped | draft
                "dateEnded": "", // When prescription was stopped <dateTime>
                "patient": {}, // Who prescription is for  Reference(Patient)
                "prescriber": {}, // Who ordered the medication(s) Reference(Practitioner)
                "note": "", // Information about the prescription
                "medicationReference": {} // Reference(Medication)
            };
        };

        MedicationOrder.prototype.createEntry = function () {

        };

        MedicationOrder.prototype.update = function () {

        };

        var medications = {
            getEmpty: function () {
                return new MedicationOrder();
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
                        res = $q.reject(err_messages.test_err);
                    }
                    return res;
                }
            }
        };
        return medications;
    });
