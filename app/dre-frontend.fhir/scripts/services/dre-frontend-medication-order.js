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

        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new MedicationOrder(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new MedicationOrder(entry);
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

        MedicationOrder.prototype.save = function () {
            var _data = angular.fromJson(angular.toJson(this));
            if (_data.id) {
                return dreFrontendFhirService.update(_data.resourceType, _data.id, _data)
                    .then(proceedEntry);
            } else {
                return dreFrontendFhirService.create(_data.resourceType, _data)
                    .then(proceedEntry);
            }
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
                            return proceedBundle(response);
                        });
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationOrder', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationOrder')
                    .then(proceedBundle);
            }
        };
        return medications;
    });
