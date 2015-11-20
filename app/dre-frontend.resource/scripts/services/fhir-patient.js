/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirPatient', function (FhirResource, fhirEnv, _) {
        // reuse the original constructor
        var FhirPatient = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirPatient.prototype = new FhirResource();

        /* extend prototype */

        function _glue_name(parts) {
            var r = [];
            if (parts.prefix) {
                r.push(parts.prefix.join(" "));
            }
            if (parts.given) {
                r.push(parts.given.join(" "));
            }
            if (parts.family) {
                r.push(parts.family.join(" "));
            }
            if (parts.suffix) {
                r.push(parts.suffix.join(" "));
            }
            return r.join(" ");
        }

        FhirPatient.prototype.getNameByType = function (nameType) {
            var result = [];
            var patient = this;
            var names = [];

            if (nameType && fhirEnv.humanNames[nameType]) {
                angular.forEach(fhirEnv.humanNames[nameType].codes, function (code) {
                    names = names.concat(_.filter(patient.name, {use: code}));
                });
            } else {
                names = patient.name;
            }

            angular.forEach(names, function (parts) {
                result.push(_glue_name(parts));
            });

            return result;
        };

        FhirPatient.prototype.getOfficialName = function () {
            return this.getNameByType("official");
        };

        FhirPatient.prototype.getUsualName = function () {
            return this.getNameByType("usual");
        };

        FhirPatient.prototype.getName = function () {
            return this.getUsualName()
                .concat(this.getOfficialName())
                .concat(this.getNameByType());
        };

        FhirPatient.prototype.setBase64Photo = function (contentType, data) {
            if (!this.photo || !angular.isArray(this.photo)) {
                this.photo = [];
            }
            this.photo[0] = {
                contentType: contentType,
                data: data
            };
            return this;
        };

        FhirPatient.prototype.update = function () {
            return this.save();
        };

        return FhirPatient;
    });

