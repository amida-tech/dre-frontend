/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirMedicationOrder', function (FhirResource, $q) {

        // reuse the original constructor
        var FhirMedicationOrder = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirMedicationOrder.prototype = new FhirResource();

        /* extend prototype */

        FhirMedicationOrder.prototype.setBaseTemplate = function () {
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
            if (!this.extension) {
                this.extension = [];
            }
            this.extension.push({
                "url":"http://amida-tech.com/fhir/extensions/source",
                "extension":[
                   {
                        "url":"http://amida-tech.com/fhir/extensions/source/date",
                        "valueDate": new Date().toISOString()
                    },
                    {
                        "url":"http://amida-tech.com/fhir/extensions/source/description",
                        "valueString":"Patient entered"
                    }
                ]
            });
        };

        FhirMedicationOrder.prototype.loadMedication = function () {
            if (this.medicationReference.load) {
                return this.medicationReference.load();
            } else {
                return $q.reject("Cant load medication data");
            }
        };

        FhirMedicationOrder.prototype.title = function () {
            var title = this.codableConceptTitle(this.medicationCodeableConcept);
            if (!title && this.medicationReference && this.medicationReference.code) {
                title = this.codableConceptTitle(this.medicationReference.code);
            }
            return title;
        };

        FhirMedicationOrder.prototype.dates = function () {
            var res = FhirResource.prototype.dates();

            if (this.dateWritten) {
                res.startDate = this.dateWritten;
            }
            if (this.dateEnded) {
                res.endDate = this.dateEnded;
            }

            return res;
        };

        return FhirMedicationOrder;
    });

