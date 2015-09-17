'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FhirCtrl
 * @description
 * # FhirCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('FhirCtrl',
    function ($scope,
              $log,
              dreFrontendFhirService,
              dreFrontendMedications,
              dreFrontendObservations,
              dreFrontendPatient,
              dreFrontendEncounters,
              dreFrontendPractitioners,
              dreFrontendAllergyIntolerances,
              dreFrontendCarePlans,
              dreFrontendConditions,
              dreFrontendDiagnosticOrders
    ) {

        function success_handler(response) {
            $scope.response = response;
            $scope.res_type = "success";
            return response;
        }

        function fail_handler(response) {
            $scope.response = response;
            $scope.res_type = "danger";
            return response;
        }

        $scope.getPatients = function () {
            dreFrontendPatient.getAll()
                .then(function (bundle) {
                    bundle.entry[0].official_name = bundle.entry[0].getOfficialName();
                    $scope.response = bundle;
                    $scope.res_type = "success";
                    return bundle;
                })
                .catch(fail_handler);
        };

        $scope.getPatient = function (id) {
            dreFrontendPatient.getById(id)
                .then(function (patient) {
                    $scope.response = patient;
                    $scope.response.official_name = patient.getOfficialName();
                    $scope.res_type = "success";
                    return patient;
                })
                .catch(fail_handler);
        };

        $scope.getMedications = function () {
            dreFrontendMedications.getAll()
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getMedication = function (id) {
            dreFrontendMedications.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.Medications = function (patient_id) {
            dreFrontendMedications.getByPatientId(patient_id)
                .then(function(bundle){
                    return bundle.entry[0].loadAll(3).then(function(){return bundle;});
                })
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getWeightHistory = function (patient_id) {
            dreFrontendObservations.getWeightHistory(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getHeightHistory = function (patient_id) {
            dreFrontendObservations.getHeightHistory(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getLastWeight = function (patient_id) {
            dreFrontendObservations.getLastWeight(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getLastHeight = function (patient_id) {
            dreFrontendObservations.getLastHeight(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getLastBMI = function(patient_id){
            dreFrontendObservations.getLastBMI(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getBMIHistory = function(patient_id){
            dreFrontendObservations.getBMIHistory(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getBloodPressureSystolicHistory = function(patient_id){
            dreFrontendObservations.getBloodPressureSystolicHistory(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getBloodPressureDiastolicHistory = function(patient_id){
            dreFrontendObservations.getBloodPressureDiastolicHistory(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getLastBloodPressureSystolic = function(patient_id){
            dreFrontendObservations.getLastBloodPressureSystolic(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getLastBloodPressureDiastolic = function(patient_id){
            dreFrontendObservations.getLastBloodPressureDiastolic(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getEncounters = function(patient_id){
            dreFrontendEncounters.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getPractitioners = function(){
            dreFrontendPractitioners.getAll()
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getAllergyIntolerance = function(id){
            dreFrontendAllergyIntolerances.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getAllergyIntolerances = function(patient_id){
            dreFrontendAllergyIntolerances.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getPractitioner = function(id){
            dreFrontendPractitioners.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getCarePlans = function(patient_id){
            dreFrontendCarePlans.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getCarePlan = function(id){
            dreFrontendCarePlans.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getConditions = function(patient_id){
            dreFrontendConditions.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getCondition = function(id){
            dreFrontendConditions.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getDiagnosticOrders = function(patient_id){
            dreFrontendDiagnosticOrders.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getDiagnosticOrder = function(id){
            dreFrontendDiagnosticOrders.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getTestResults = function (patient_id) {
            dreFrontendObservations.getTestResults(patient_id,50)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getVitalSigns = function (patient_id) {
            dreFrontendObservations.getVitalSigns(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.uploadError = function(fileItem, response, status, headers) {
            console.log(response);
            $scope.response = response.issue;
            $scope.res_type = "danger";
        };
        $scope.uploadSuccess = function(fileItem, response, status, headers) {
            var issues = [];
            angular.forEach(_.pluck(response.entry, "resource"), function(v,k){
                if (v && v.resourceType === "OperationOutcome") {
                    angular.merge(issues, v.issue);
                }
            });
            $scope.response = issues;
            $scope.res_type = "success";
        };

        $scope.updatePatient = function() {
            $scope.response = [];
            $scope.res_type = "success";
            dreFrontendFhirService.update(fhir_data[0].resourceType,fhir_data[0].id, fhir_data[0])
                .then(function (r) {
                    $scope.response = r;
                });
        };

        $scope.loadData = function () {
            $scope.response = [];
            $scope.res_type = "success";
            angular.forEach(_.pluck(fhir_data, "resource"), function (res) {
                var res_body = _.omit(res, ["meta", "id"]);
                /* change reference path before loading */
                res_body.subject = {reference : "Patient/3768"};
                res_body.performer = [];
                dreFrontendFhirService.create(res.resourceType, res_body)
                    .then(function (r) {
                        $scope.response.push(res_body.code.coding[0].display);
                    });
            });
        };
        /* paste data in array below */
        var fhir_data = [ {
            "resourceType":"Patient",
            "id":"3768",
            "extension":[
                {
                    "url":"http://hl7.org/fhir/StructureDefinition/us-core-religion",
                    "valueCodeableConcept":{
                        "coding":[
                            {
                                "system":"urn:oid:2.16.840.1.113883.5.1076",
                                "code":"1013",
                                "display":"Christian (non-Catholic, non-specific)"
                            }
                        ]
                    }
                },
                {
                    "url":"http://hl7.org/fhir/Profile/us-core#race",
                    "valueCodeableConcept":{
                        "coding":[
                            {
                                "system":"urn:oid:2.16.840.1.113883.6.238",
                                "code":"2106-3",
                                "display":"White"
                            }
                        ]
                    }
                },
                {
                    "url":"http://hl7.org/fhir/Profile/us-core#ethnicity",
                    "valueCodeableConcept":{
                        "coding":[
                            {
                                "system":"urn:oid:2.16.840.1.113883.6.238",
                                "code":"2186-5",
                                "display":"Not Hispanic or Latino"
                            }
                        ]
                    }
                },
                {
                    "url":"http://hl7.org/fhir/StructureDefinition/birthPlace",
                    "valueAddress":{
                        "city":"Beaverton",
                        "state":"OR",
                        "postalCode":"97867",
                        "country":"US"
                    }
                }
            ],
            "text":{
                "status":"generated",
                "div":"<div><div class=\"hapiHeaderText\"> Isabella Isa <b>JONES </b></div><table class=\"hapiPropertyTable\"><tbody><tr><td>Identifier</td><td>998991</td></tr><tr><td>Address</td><td><span>1357 Amber Drive </span><br /><span>Beaverton </span><span>OR </span><span>US </span></td></tr><tr><td>Date of birth</td><td><span>01 May 1975</span></td></tr></tbody></table></div>"
            },
            "identifier":[
                {
                    "system":"urn:oid:2.16.840.1.113883.19.5.99999.2",
                    "value":"998991"
                },
                {
                    "system":"urn:oid:2.16.840.1.113883.4.1",
                    "value":"111-00-2330"
                }
            ],
            "name":[
                {
                    "use":"L",
                    "family":[
                        "Jones"
                    ],
                    "given":[
                        "Isabella",
                        "Isa"
                    ]
                }
            ],
            "telecom":[
                {
                    "value":"tel:(816)276-6909",
                    "use":"HP"
                }
            ],
            "gender":"F",
            "birthDate":"1975-05-01",
            "address":[
                {
                    "use":"HP",
                    "line":[
                        "1357 Amber Drive"
                    ],
                    "city":"Beaverton",
                    "state":"OR",
                    "postalCode":"97867",
                    "country":"US"
                }
            ],
            "maritalStatus":{
                "coding":[
                    {
                        "system":"urn:oid:2.16.840.1.113883.5.2",
                        "code":"M",
                        "display":"Married"
                    }
                ]
            },
            "photo":[
                {
                    "contentType":"image/jpeg",
                    "data":"/9j/4AAQSkZJRgABAQEASABIAAD/4RLxRXhpZgAASUkqAAgAAAALAA4BAgAgAAAAkgAAAA8BAgAgAAAAsgAAABABAgAgAAAA0gAAABIBAwABAAAAAQAAABoBBQABAAAA8gAAABsBBQABAAAA+gAAACgBAwABAAAAAgAAADEBAgAMAAAAAgEAADIBAgAUAAAADgEAABMCAwABAAAAAgAAAGmHBAABAAAAIgEAAJ4CAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgAEpJQVlVICAgICAgICAgICAgICAgICAgICAgICAgICAASlktRzMgICAgICAgICAgICAgICAgICAgICAgICAgIABIAAAAAQAAAEgAAAABAAAAR0lNUCAyLjguMTAAMjAxNTowOTowOCAxNzoxMToxNQAWAJqCBQABAAAAMAIAAJ2CBQABAAAAOAIAACKIAwABAAAAAAAAACeIAwABAAAA/AEAAACQBwAEAAAAMDIyMAOQAgAUAAAAQAIAAASQAgAUAAAAVAIAAAGRBwAEAAAAAQIDAASSCgABAAAAaAIAAAeSAwABAAAAAgAAAAiSAwABAAAA/wAAAAmSAwABAAAAAAAAAAqSBQABAAAAcAIAAACgBwAEAAAAMDEwMAGgAwABAAAAAQAAAAKgBAABAAAAmQAAAAOgBAABAAAAyAAAAAWgBAABAAAAgAIAAAKkAwABAAAAAAAAAAOkAwABAAAAAAAAAASkBQABAAAAeAIAAAakAwABAAAAAAAAAAAAAACUhgEAQEIPABgAAAAKAAAAMjAxNDoxMjoxOSAyMDowMjo1NQAyMDE0OjEyOjE5IDIwOjAyOjU1AAAAAAAKAAAAXgEAAGQAAABkAAAAZAAAAAIAAQACAAQAAABSOTgAAgAHAAQAAAAwMTAwAAAAAAgAAwEDAAEAAAAGAAAAEgEDAAEAAAABAAAAGgEFAAEAAAAEAwAAGwEFAAEAAAAMAwAAKAEDAAEAAAACAAAAAQIEAAEAAAAUAwAAAgIEAAEAAADVDwAAEwIDAAEAAAACAAAAAAAAAEgAAAABAAAASAAAAAEAAAD/2P/gABBKRklGAAEBAAABAAEAAP/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAJkAdQMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APO/7EumGdo/Om/2FNn52Arv/sUQ4C0DT4s5I/SuR1pHWoI42z0GMOru5YA8jFac2l2jrjyce4FdCLaFP4T+VUdRWeV1itkKDGS5HSs1Kc3ZDfLFXZz0mg2xHCtVdfDCuxO8gdq1TY3AbEtyzHvs6V0ekWOgybYJIr26umHAMmxR+VWk19oyqVOV2cbfgcI3hjGcTfnVC60GePhSpHrmvbLLwXFp3nXV+unvaNyqvIS0Y9yVOajfwdY392bm3tLO8s2XACTFCCP+AitF7urdyOe7seDyaXJHnc6D8abDanzACQfpXpfiHw/p1td+RBpzW0g5YNLuBHtWSNDhIG3Ctn07Vp7WKepVGlUrRbgmcwbNGUHbt9xTGhMIK8lGruvEVpZm0tDYWawFV2yBcncfWuejgB4ZAfrXSkjl5na7M2GOFAC0ZI9a0Fk08oQbc7sdanSzlc+Wikj0x0q5HozmQLIu0tSbSFrIwJIImfKAgUV1X/CNOehGKKPaR7j5Z9j1seBJT/y8IPwqrqPhNNNtHubm+RI1/wBnkn0Hqa9BZxGhdjhVGST2FeW+Ktalv7ne2VtwP3MZ9P7x9zWTpR7G1KU5ySuc5NJJISUG2MH8aZnfA4LFiM9avaVrMGnwzl7OKedxiN5RuEfvjoaomdp5nlkwS5ySAB+grKjBc1l1O3MF7Og5bcrTXnZlZogEyWxlcjjv6VSiFzbXAmgkKuvRh1robTTHu2RLaIyOxwABk1PqvhvUtIiWW7g8uNujAgjPpx3rRYRrrY4K+aUsQrOm5W67flcxp9Vv7qIRXFwWQdVHGfrTLXVr7TlZbeX5D/A3IBoZgOuPoagkVH6Dafak8LPeLuTDH4Hl9jWpOC7/ANajJZ7i+uDPcuWY/wCcVcgWMrhsdcg+vtWa5aFsN07EVPbOXPX5e9c6U3Pla1PdpwwuGwrqU5e5ve5vW+m3E1szrBI0JONwUkfTNZV1ooYF1Xa4/Wuj8OeKbjQpvkHmQNw8RPB9/rU+t6vpupSrPa2ptpm/1g3AqT6ivRVLlS5nY+ZljnVlN0Y8yb2/Vb7mX4Q0T+0NSaJ2C7UyQetejQ+DdPBBMO4jua4fQ7mOz1q3ui21A2HI9DXsMbBlGKUkrjhJy7ryZkR+HbCNdq2yflRW3RUlnO+KbiWPRJUhUlpMBsH+HIz/AJ968v1SRryZp2QqjYCD0A4/pXbeN7yS2mtwMmPymyB6npXEajexzW1tGvy+XGARTirys0dFJuOqMJsiUqTwKc10EIGckdqJLkLbSRsoyz7g3esuclCOQcjPFYufslaPU9B4VY6pzVX7sdLd31Og03xVe6RcedayBGxgjHBHpS61421HWsrczkoOfLXhR+FcqGaWRUz1NYeq3rfaHhiO2NTg47mlCMpq8ma13Rw8lClFX/I6CW9WQ/65N3pupEu5I+/H6VxfmHOcnNXLPUpYnCOxMZ4Oe1HsktYuzMvrLmuWtFSi+ljrXuxLHt280sMskRztOD2qoBJBLtBGeOfUGrIE/Utn8azvOUuZ3ujodPD0qaowUVTlrZtlxLl5GAHfsK0IwsYBllCn0rJhl+zwz3DDLRrkCskXcs8xkdySf0rppQ5lzT1PNxNX2T9jh0opdju7cjAZGDoe4r1jwjem+0NNxzJAfKJ9h0/Q14bot46zJGxyrcc1614CmKXN3b5+VkDj6jj+tXKCjqjk9s6itPddTuQKKcKKgVjgvGvL4254WvOtVVftDsn3Sc16b4tT98h9UH8zXnmrQhWLg8N29DTa3aNqMtUmczO/y4PaqUpzV+5XGapOuVrmqO9me1g1y80fP9EJajdcoOnUVyuowvDfzI45DGumT5XDDqDkVbvdETVws8RRZMYPPWt6DUoOPU48yi6dZVejVvQ4IoafFE0kiooyScAV3lp8LvEV8AbawZ1PRtyqPzJFKPCj+GL9jqqoLiLkRK4bn3I4rTlSfvM4/a8y9xXb2B7MDjOTGiqc/SmBIgoOHpkl2WZ2/vkk0kTSlcoePSuLmUptpbnuSpOFCClK1rdbDwhlimgTOZEIAPr2rEgyGwRitxXYMC3B9cUT6eLmTzoCBK33kJxk+orejO3us4Mbhm/3sde/UbZsVYEdRyK9c8Jym38QwoePMVoyD9M/0rzrR9CuHk8ydRHEnLFmHT29a7C0vSmqRXQPKSh8++c10z0ieNCLnU02R68KKRCHQMOhGRRWJqcp4qiykUnbBB/z+Nea6ku64cDoMV6v4hjDWAPpXl99HtmkB65zSl2NaGj5n0OZuUHmEH0qkuBIwPTbV+6OGc1lu2HJqUvdR2Sk3Uko9v8AL/MjUAK7H04qaK48mJWHUmq7P+6IyOTUbSDag61GlvkdClNzb/vfgo/5nQRa/e25IhuZYzjIKuRisq7vpLrzJZnZ3PVmOSareYfNb6VVZyEYe9E7fmLD81td/d/Hcc0oHSpIWlJyob8KphlQGV/uoMn3qi2pXEsmd2B6Diop076nXicUoe7a51CM3G/P41dhHIxXP2F+7oY3Yn0Bret2JAxWjVnqcsK3NBuCszVt2PAycVsWalpEUdSayLVS2MDmum0i2zKnGWJxWkdjirylJu56tYMW0+3J6+Wv8qKfbR+VaxR/3UA/SimcZl62hfTmx2IrzHW4yG3AH3r1y4hFxbvEf4hivN9at2gmdWHIoauXRmobnAXhznFZMy4BY9PWumvUjjDZUZPasKSNpnwBhaJQbep0UKkYRtFasx3djwqEimQupfbKGX0NbYhVBgD61VuUQqdo3N7dqi0TtjGq9UMW3BO4PwaqzxpGuN2XNVF82OcxSMQGPGKupbDHXmsZux14enzav+rGfdoxsnC9NwJrMVMGuoWJcEEcUq2EBbOwH8KdOqkrMwxmGqOXNBXMzS7d3l3AHA711Num1Rmq8CiKJoo+EYgn8M4/matxDinKfM9B4eg6cHz7s0rRinIxXeeE7dbq9hY/dByffHNcBbkBSa9E8FsI5rZSeWB/UVrDY4cXFX0PQc0UUVZwWIS4Heuc8RWtvdIXOFkHf1rdYcVy3iCRlXGcCi4rHn+pWDpI27p61z0zYyqjaPWu0uW86Nl6leR9K5q8hCsSIwR6VM22ejgowWr3Mdo3YZclh6qarXU0cLLtPz98da0WfAYJEQSOKraFHdnVWFvHbPcdvtH9PeoSuduJrOjFOKMi6gnkjEht5FRTneVOPzrUtdC1y6iV4bJ9rAFWPGR+Nbevf23cPaafdi3zcPlFi4yR6/nXQW9x4qgjC/2basqjAw2P603FWPMeLq3bT3OKuPDmtWkaSXEaxh3CLlhksTgCtSLwRrZ+/LAoP+2f6Cr2pXmuXmp2NrNaQxzo/nRoDkEj15+tbQk8WEjMNmtCiiJYiq95HK6l4WuNJt4pJrsSPLIEVFB5Jro18AKijN++f93/AOvWdqjazd6xZWd2YTcK2+IIOAc9/wAq6P7D4kdR5l/Cg/2V/wDrVWxk6knuzIs/CySXl1bG6cGDbzjrkV0Xh6OS2voW85GSOTYQeG4OM1j2OkyXOpX0d1ezFoyoZkO3fx3q/oS2sE8yqoMouSiEnJCjFMnmZ6dHMGXNFZdvNmPrRTAuk8Vga5aGeJsCt1jzUckQkQg0CPL50aCQ5HTqKzruP58r36Gu61fRS5LoOfpXIT27xu0LjDDpnvTtc3p1OVnPXNuQd2/HsKy5oA7B4wyOpzvHBro5YkGS3BHY1m3bjaVQfN2xScGeiq8HC0tUZq6xeQana3V0/wBpNvwgY9q7K18f2ZQC4gmiPsAwrixpzbzJI2WPODTmi/vLUylbQwjhI1NVodLZa/YXfi+S/uJRHAkW2Itxn/PNdZJ4l0eKLzDeRkexya8pdYkXcyD8qRJYTwYiB9KL31sZVMKouzkdWfEVmfFrai+54I02x7V5PHv9TWtL46R+ILRz/vkCuIijhf7oBq+kZGERRn+VO6fQh4blV2zTj1i/M88kWEa4fcxx04xW7oMTrM0jnczDJb3rAtbXnLEsa7DSIxHEgI+Y9aowlFROitS3lUVoWtsGhBxRSsSW6AKdjmgCgBrxLIuCK5jXvDxmUzQjJHaurFLtyOlO4HjV2picx3MWcdDjmqbW8LLujK16zqvh201JTvQK/ZlFcPqfgu8tWLwjzF7FRzVbmsanLqcbNZqWOX5NVzbSRNxyPStuS1nt2Ikh5H94YNVpVD9VZSPSjyLUotX2ZQNtHOoJXn0pzwRJ1UH2q1tPQN+lKkaA5YMx9xS5EaPEN7blZLNAyuoCE9qvqADwMt7Uud3HlVYhhlY4RcZ9BTt3MZ1LaRZYtI9jK0nLngLXVabbtJOgAzzzVLRfDd1O4mkRlHYsK7iw0uOzQY5b1pGLlcuwII4VX2oqUDiikBFilApRRSEKBzTgMUelKaBoTg0jID1FOFKaYGddaZbXIIlhRh7isafwjpspJETIf9k11J6VEe9AHHt4HsyfllkA/ChfA9oDzNIfoBXXUL1ouI5uHwXYqRnzG/Gtiz0CxsyDHAuR3PNai9KcOtFxMjCADAGBS7acelHai40huKKWigZ//9n/4QnoaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pgo8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJz4KPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4KCiA8cmRmOkRlc2NyaXB0aW9uIHhtbG5zOmV4aWY9J2h0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvJz4KICA8ZXhpZjpJbWFnZURlc2NyaXB0aW9uPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2V4aWY6SW1hZ2VEZXNjcmlwdGlvbj4KICA8ZXhpZjpNYWtlPkpJQVlVICAgICAgICAgICAgICAgICAgICAgICAgICA8L2V4aWY6TWFrZT4KICA8ZXhpZjpNb2RlbD5KWS1HMyAgICAgICAgICAgICAgICAgICAgICAgICAgPC9leGlmOk1vZGVsPgogIDxleGlmOk9yaWVudGF0aW9uPlRvcC1sZWZ0PC9leGlmOk9yaWVudGF0aW9uPgogIDxleGlmOlhSZXNvbHV0aW9uPjcyPC9leGlmOlhSZXNvbHV0aW9uPgogIDxleGlmOllSZXNvbHV0aW9uPjcyPC9leGlmOllSZXNvbHV0aW9uPgogIDxleGlmOlJlc29sdXRpb25Vbml0PkluY2g8L2V4aWY6UmVzb2x1dGlvblVuaXQ+CiAgPGV4aWY6U29mdHdhcmUgLz4KICA8ZXhpZjpEYXRlVGltZT4yMDE0OjEyOjE5IDIwOjAyOjU1PC9leGlmOkRhdGVUaW1lPgogIDxleGlmOllDYkNyUG9zaXRpb25pbmc+Q28tc2l0ZWQ8L2V4aWY6WUNiQ3JQb3NpdGlvbmluZz4KICA8ZXhpZjpDb21wcmVzc2lvbj5KUEVHIGNvbXByZXNzaW9uPC9leGlmOkNvbXByZXNzaW9uPgogIDxleGlmOk9yaWVudGF0aW9uPlRvcC1sZWZ0PC9leGlmOk9yaWVudGF0aW9uPgogIDxleGlmOlhSZXNvbHV0aW9uPjcyPC9leGlmOlhSZXNvbHV0aW9uPgogIDxleGlmOllSZXNvbHV0aW9uPjcyPC9leGlmOllSZXNvbHV0aW9uPgogIDxleGlmOlJlc29sdXRpb25Vbml0PkluY2g8L2V4aWY6UmVzb2x1dGlvblVuaXQ+CiAgPGV4aWY6WUNiQ3JQb3NpdGlvbmluZz5Dby1zaXRlZDwvZXhpZjpZQ2JDclBvc2l0aW9uaW5nPgogIDxleGlmOkV4cG9zdXJlVGltZT4xLzEwIHNlYy48L2V4aWY6RXhwb3N1cmVUaW1lPgogIDxleGlmOkZOdW1iZXI+Zi8yLDQ8L2V4aWY6Rk51bWJlcj4KICA8ZXhpZjpFeHBvc3VyZVByb2dyYW0+Tm90IGRlZmluZWQ8L2V4aWY6RXhwb3N1cmVQcm9ncmFtPgogIDxleGlmOklTT1NwZWVkUmF0aW5ncz4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpPjUwODwvcmRmOmxpPgogICA8L3JkZjpTZXE+CiAgPC9leGlmOklTT1NwZWVkUmF0aW5ncz4KICA8ZXhpZjpFeGlmVmVyc2lvbj5FeGlmIFZlcnNpb24gMi4yPC9leGlmOkV4aWZWZXJzaW9uPgogIDxleGlmOkRhdGVUaW1lT3JpZ2luYWw+MjAxNDoxMjoxOSAyMDowMjo1NTwvZXhpZjpEYXRlVGltZU9yaWdpbmFsPgogIDxleGlmOkRhdGVUaW1lRGlnaXRpemVkPjIwMTQ6MTI6MTkgMjA6MDI6NTU8L2V4aWY6RGF0ZVRpbWVEaWdpdGl6ZWQ+CiAgPGV4aWY6Q29tcG9uZW50c0NvbmZpZ3VyYXRpb24+CiAgIDxyZGY6U2VxPgogICAgPHJkZjpsaT5ZIENiIENyIC08L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvZXhpZjpDb21wb25lbnRzQ29uZmlndXJhdGlvbj4KICA8ZXhpZjpFeHBvc3VyZUJpYXNWYWx1ZT4wLDAwIEVWPC9leGlmOkV4cG9zdXJlQmlhc1ZhbHVlPgogIDxleGlmOk1ldGVyaW5nTW9kZT5DZW50ZXItd2VpZ2h0ZWQgYXZlcmFnZTwvZXhpZjpNZXRlcmluZ01vZGU+CiAgPGV4aWY6TGlnaHRTb3VyY2U+T3RoZXI8L2V4aWY6TGlnaHRTb3VyY2U+CiAgPGV4aWY6Rmxhc2ggcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogIDwvZXhpZjpGbGFzaD4KICA8ZXhpZjpGb2NhbExlbmd0aD4zLDUgbW08L2V4aWY6Rm9jYWxMZW5ndGg+CiAgPGV4aWY6Rmxhc2hQaXhWZXJzaW9uPkZsYXNoUGl4IFZlcnNpb24gMS4wPC9leGlmOkZsYXNoUGl4VmVyc2lvbj4KICA8ZXhpZjpDb2xvclNwYWNlPnNSR0I8L2V4aWY6Q29sb3JTcGFjZT4KICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjU2MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjE0NDA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogIDxleGlmOkV4cG9zdXJlTW9kZT5BdXRvIGV4cG9zdXJlPC9leGlmOkV4cG9zdXJlTW9kZT4KICA8ZXhpZjpXaGl0ZUJhbGFuY2U+QXV0byB3aGl0ZSBiYWxhbmNlPC9leGlmOldoaXRlQmFsYW5jZT4KICA8ZXhpZjpEaWdpdGFsWm9vbVJhdGlvPjEsMDA8L2V4aWY6RGlnaXRhbFpvb21SYXRpbz4KICA8ZXhpZjpTY2VuZUNhcHR1cmVUeXBlPlN0YW5kYXJkPC9leGlmOlNjZW5l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",
                    "url":"http://dre.ntrlab.ru/assets/avatar.jpg",
                    "size":21860,
                    "title":"patient avatar"
                }
            ],
            "contact":[
                {
                    "relationship":[
                        {
                            "coding":[
                                {
                                    "system":"urn:oid:2.16.840.1.113883.5.111",
                                    "code":"PRN",
                                    "display":"Parent"
                                }
                            ]
                        }
                    ],
                    "name":{
                        "family":[
                            "Jones"
                        ],
                        "given":[
                            "Ralph"
                        ]
                    },
                    "telecom":[
                        {
                            "value":"tel:(816)276-6909",
                            "use":"HP"
                        }
                    ],
                    "address":{
                        "line":[
                            "1357 Amber Drive"
                        ],
                        "city":"Beaverton",
                        "state":"OR",
                        "postalCode":"97867",
                        "country":"US"
                    }
                }
            ],
            "communication":[
                {
                    "language":{
                        "coding":[
                            {
                                "code":"en"
                            }
                        ]
                    },
                    "preferred":true
                }
            ],
            "managingOrganization":{
                "reference":"Organization/3769"
            }
        }
        ];
    });
