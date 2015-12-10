/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirMedicationOrder', function (FhirResource, $q, dreFrontendGlobals, $log) {

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
                "url": dreFrontendGlobals.amidaExtensions.source,
                "extension": [
                    {
                        "url": dreFrontendGlobals.amidaExtensions.date,
                        "valueDate": new Date().toISOString()
                    },
                    {
                        "url": dreFrontendGlobals.amidaExtensions.descr,
                        "valueString": dreFrontendGlobals.patientEnteredText
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

            res.isActive = !res.endDate || !this.status || this.status.toLowerCase() === 'active';

            return this._formatDates(res);
        };

        FhirMedicationOrder.prototype.isEditable = function () {
            var _res = false;
            if (this._getSourceExtension) {
                var sources = this._getSourceExtension();
            } else {
                $log.debug(this);
            }

            if (sources) {
                var t1 = dreFrontendGlobals.patientEnteredText.toLowerCase();
                for (var a = 0; !_res && a < sources.length; a++) {
                    var t2 = this._getExtension(sources[a], dreFrontendGlobals.amidaExtensions.descr, 'String');
                    _res = (t2 && t2.toLowerCase() === t1);
                }
            }
            return _res;
        };

        FhirMedicationOrder.prototype.additionalInfo = function () {
            var res = FhirResource.prototype.additionalInfo();
            if (this.isEditable()) {
                res = dreFrontendGlobals.patientEnteredText;
            }
            return res;
        };

        return FhirMedicationOrder;
    });

