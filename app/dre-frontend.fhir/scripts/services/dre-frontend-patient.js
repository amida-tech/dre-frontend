"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendPatient', function (dreFrontendFhirService, $q, _, fhirEnv) {

        function Patient(data) {
            this.setData(data);
        }

        function Patients(data) {
            if (data)
                angular.extend(this, data);
        }

        Patient.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };

        function _glue_name(parts) {
            var r = [];
            if (parts.prefix)
                r.push(parts.prefix.join(" "));

            if (parts.given)
                r.push(parts.given.join(" "));

            if (parts.family)
                r.push(parts.family.join(" "));

            if (parts.suffix)
                r.push(parts.suffix.join(" "));

            return r.join(" ");
        }

        Patient.prototype.getNameByType = function (nameType) {
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

        Patient.prototype.getOfficialName = function () {
            return this.getNameByType("official");
        };

        Patient.prototype.getUsualName = function () {
            return this.getNameByType("usual");
        };

        Patient.prototype.getName = function () {
            var result = this.getUsualName()
                .concat(this.getOfficialName())
                .concat(this.getNameByType());
            return result;
        };

        var patient = {
            getById: function (id) {
                return dreFrontendFhirService.read('Patient', id)
                    .then(function (response) {
                        return new Patient(response);
                    });
            },
            getAll: function () {
                var patients = [];
                return dreFrontendFhirService.read('Patient')
                    .then(function (response) {
                        angular.forEach(response.entry, function (p, k) {
                            response.entry[k] = new Patient(p);
                        });
                        return new Patients(response);
                    });
            }
        };

        return patient;
    });
