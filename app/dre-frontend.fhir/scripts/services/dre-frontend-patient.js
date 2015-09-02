"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendPatient', function (dreFrontendFhirService, $q) {

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

        Patient.prototype.getOfficialName = function () {
            var official_names = (_.filter(this.name, {use: "L"})).concat(_.filter(this.name, {use: "official"}));
            var result = [];
            angular.forEach(official_names, function (v) {
                var r = [];
                if (v.prefix)
                    r.push(v.prefix.join(" "));

                if (v.given)
                    r.push(v.given.join(" "));

                if (v.family)
                    r.push(v.family.join(" "));

                if (v.suffix)
                    r.push(v.suffix.join(" "));

                result.push(r.join(" "));
            });
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
