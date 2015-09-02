'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FhirCtrl
 * @description
 * # FhirCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp').controller('FhirCtrl', function (
  $scope,
  dreFrontendFhirService,
  DreFrontendMedications,
  DreFrontendObservations,
  DreFrontendPatient,
  DreFrontendTestresults
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

    $scope.getPatients = function(){
      DreFrontendPatient.getAll()
        .then(function(bundle){
          bundle.entry[0].official_name = bundle.entry[0].getOfficialName();
          $scope.response = bundle;
          $scope.res_type = "success";
          return bundle;
        })
          .catch(fail_handler);
    };

    $scope.getPatient = function(id){
      DreFrontendPatient.getById(id)
        .then(function(patient){
          $scope.response = patient;
          $scope.response.official_name = patient.getOfficialName();
          $scope.res_type = "success";
          return patient;
        })
        .catch(fail_handler);
    };

    $scope.getMedications = function(){
        DreFrontendMedications.getAll()
          .then(success_handler)
          .catch(fail_handler);
    };

    $scope.getMedication = function(id){
      DreFrontendMedications.getById(id)
        .then(success_handler)
        .catch(fail_handler);
    };

    $scope.Medications = function(patient_id) {
      DreFrontendMedications.getByPatientId(patient_id)
        .then(success_handler)
        .catch(fail_handler);
    };

    $scope.getWeightHistory = function(patient_id) {
      DreFrontendObservations.getWeightHistory(patient_id)
        .then(success_handler)
        .catch(fail_handler);
    };

    $scope.getHeightHistory = function(patient_id) {
      DreFrontendObservations.getHeightHistory(patient_id)
        .then(success_handler)
        .catch(fail_handler);
    };

    $scope.getLastWeight = function(patient_id) {
      DreFrontendObservations.getLastWeight(patient_id)
        .then(success_handler)
        .catch(fail_handler);
    };

    $scope.getLastHeight = function(patient_id) {
      DreFrontendObservations.getLastHeight(patient_id)
        .then(success_handler)
        .catch(fail_handler);
    };

    $scope.getTestResults = function (patient_id) {
      DreFrontendTestresults.getByPatientId(patient_id)
        .then(function (test_results){
          $scope.response = test_results.getResults();
          $scope.res_type = "success";
          return $scope.response;
        });
    };

  $scope.loadData = function () {
    $scope.response = [];
    angular.forEach(_.pluck(data,"resource"), function (res) {
      var d = _.omit(r,["meta","id","resourceType"]);
      var r_type = d.resourceType;
      d.subject.reference = "Patient/3768";
      dreFrontendFhirService.create(d.resourceType, d).then(function(r){
        $scope.response.push(d.code.coding[0].display);
      });
    });
  };

  var data = [
    {
      "resource":{
        "resourceType":"Observation",
        "id":"3556",
        "meta":{
          "versionId":"3",
          "lastUpdated":"2015-09-01T16:15:13.158-04:00"
        },
        "text":{
          "status":"generated",
          "div":"<div xmlns=\"http://www.w3.org/1999/xhtml\"> <p> <b>Generated Narrative with Details</b> </p> <p> <b>code</b>: Weight Measured <span style=\"background: LightGoldenRodYellow \">(Details : {LOINC code '3141-9' = 'Body weight Measured', given as 'Weight Measured'}; {SNOMED CT code '27113001' = 'Body weight (observable entity)', given as 'Body weight'}; {http://acme.org/devices/clinical-codes code 'body-weight' = 'body-weight', given as 'Body Weight'})</span> </p> <p> <b>value</b>: 185 lbs <span style=\"background: LightGoldenRodYellow \"> (Details: http://unitsofmeasure.org code [lb_av] = '[lb_av]')</span> </p> <p> <b>status</b>: FINAL </p> <p> <b>reliability</b>: OK </p> <p> <b>subject</b>: <a href=\"Patient/example\">Generated Summary: Extensions: todo; MRN = 12345 (USUAL); Peter James Chalmers (OFFICIAL), Jim ; -unknown-(HOME), ph: (03) 5555 6473(WORK); MALE; birthDate: Dec 25, 1974; active</a> </p> </div>"
        },
        "status":"final",
        "code":{
          "coding":[
            {
              "system":"http://loinc.org",
              "code":"3141-9",
              "display":"Weight Measured"
            },
            {
              "system":"http://snomed.info/sct",
              "code":"27113001",
              "display":"Body weight"
            },
            {
              "system":"http://acme.org/devices/clinical-codes",
              "code":"body-weight",
              "display":"Body Weight"
            }
          ]
        },
        "subject":{
          "reference":"Patient/3633"
        },
        "valueQuantity":{
          "value":185,
          "system":"http://unitsofmeasure.org",
          "code":"[lb_av]"
        }
      },
      "search":{
        "mode":"match"
      }
    },
    {
      "resource":{
        "resourceType":"Observation",
        "id":"3555",
        "meta":{
          "versionId":"3",
          "lastUpdated":"2015-09-01T16:15:13.147-04:00"
        },
        "text":{
          "status":"generated",
          "div":"<div xmlns=\"http://www.w3.org/1999/xhtml\">Dec 04 2014: Oxygen saturation 95% (normal)</div>"
        },
        "identifier":[
          {
            "system":"http://goodcare.org/observation/id",
            "value":"o1223435-10"
          }
        ],
        "status":"final",
        "code":{
          "coding":[
            {
              "system":"https://rtmms.nist.gov",
              "code":"150456",
              "display":"MDC_PULS_OXIM_SAT_O2"
            }
          ]
        },
        "subject":{
          "reference":"Patient/3633"
        },
        "valueQuantity":{
          "value":95,
          "system":"https://rtmms.nist.gov",
          "code":"262688"
        },
        "interpretation":{
          "coding":[
            {
              "system":"http://hl7.org/fhir/v2/0078",
              "code":"N",
              "display":"normal"
            }
          ]
        },
        "device":{
          "reference":"DeviceMetric/2585"
        },
        "referenceRange":[
          {
            "low":{
              "value":90,
              "system":"https://rtmms.nist.gov",
              "code":"262688"
            },
            "high":{
              "value":99,
              "system":"https://rtmms.nist.gov",
              "code":"262688"
            }
          }
        ]
      },
      "search":{
        "mode":"match"
      }
    },
    {
      "resource":{
        "resourceType":"Observation",
        "id":"3554",
        "meta":{
          "versionId":"3",
          "lastUpdated":"2015-09-01T16:15:13.136-04:00"
        },
        "text":{
          "status":"generated",
          "div":"<div xmlns=\"http://www.w3.org/1999/xhtml\"> <p> <b>Generated Narrative with Details</b> </p> <p> <b>contained</b>: , , </p> <p> <b>code</b>: Glasgow Coma Scale , (GCS) <span style=\"background: LightGoldenRodYellow \">(Details : {LOINC code '9269-2' = 'Glasgow coma score total', given as 'Glasgow coma score total'})</span> </p> <p> <b>value</b>: 13 {score} <span style=\"background: LightGoldenRodYellow \"> (Details: http://unitsofmeasure.org code {score} = '{score}')</span> </p> <p> <b>applies</b>: Dec 11, 2014 3:44:16 PM </p> <p> <b>status</b>: FINAL </p> <p> <b>reliability</b>: OK </p> <p> <b>subject</b>: <a href=\"Patient/example\">Peter James Chalmers. Generated Summary: Extensions: todo; MRN = 12345 (USUAL); Peter James Chalmers (OFFICIAL), Jim ; -unknown-(HOME), ph: (03) 5555 6473(WORK); MALE; birthDate: Dec 25, 1974; active</a> </p> <blockquote> <p> <b>referenceRange</b> </p> <p> <b>high</b>: 8 {score} <span style=\"background: LightGoldenRodYellow \"> (Details: http://unitsofmeasure.org code {score} = '{score}')</span> </p> <p> <b>meaning</b>: Severe TBI <span style=\"background: LightGoldenRodYellow \">(Details )</span> </p> </blockquote> <blockquote> <p> <b>referenceRange</b> </p> <p> <b>low</b>: 9 {score} <span style=\"background: LightGoldenRodYellow \"> (Details: http://unitsofmeasure.org code {score} = '{score}')</span> </p> <p> <b>high</b>: 12 {score} <span style=\"background: LightGoldenRodYellow \"> (Details: http://unitsofmeasure.org code {score} = '{score}')</span> </p> <p> <b>meaning</b>: Moderate TBI <span style=\"background: LightGoldenRodYellow \">(Details )</span> </p> </blockquote> <blockquote> <p> <b>referenceRange</b> </p> <p> <b>low</b>: 13 {score} <span style=\"background: LightGoldenRodYellow \"> (Details: http://unitsofmeasure.org code {score} = '{score}')</span> </p> <p> <b>meaning</b>: Mild TBI <span style=\"background: LightGoldenRodYellow \">(Details )</span> </p> </blockquote> <blockquote> <p> <b>related</b> </p> <p> <b>type</b>: DERIVEDFROM </p> <p> <b>target</b>: Motor score. Generated Summary: Motor <span style=\"background: LightGoldenRodYellow \">(Details : {LOINC code '9268-4' = 'Glasgow coma score motor', given as 'Glasgow coma score motor'})</span>; 5 {score} <span style=\"background: LightGoldenRodYellow \"> (Details: http://unitsofmeasure.org code {score} = '{score}')</span>; applies: Dec 11, 2014 3:44:16 PM; FINAL; OK; ???? </p> </blockquote> <blockquote> <p> <b>related</b> </p> <p> <b>type</b>: DERIVEDFROM </p> <p> <b>target</b>: Verbal score. Generated Summary: Verbal <span style=\"background: LightGoldenRodYellow \">(Details : {LOINC code '9270-0' = 'Glasgow coma score verbal', given as 'Glasgow coma score verbal'})</span>; 4 {score} <span style=\"background: LightGoldenRodYellow \"> (Details: http://unitsofmeasure.org code {score} = '{score}')</span>; applies: Dec 11, 2014 3:44:16 PM; FINAL; OK; ???? </p> </blockquote> <blockquote> <p> <b>related</b> </p> <p> <b>type</b>: DERIVEDFROM </p> <p> <b>target</b>: Eyes score. Generated Summary: Eyes <span style=\"background: LightGoldenRodYellow \">(Details : {LOINC code '9267-6' = 'Glasgow coma score eye opening', given as 'Glasgow coma score eye opening'})</span>; 4 {score} <span style=\"background: LightGoldenRodYellow \"> (Details: http://unitsofmeasure.org code {score} = '{score}')</span>; applies: Dec 11, 2014 3:44:16 PM; FINAL; OK; ???? </p> </blockquote> </div>"
        },
        "contained":[
          {
            "resourceType":"Observation",
            "id":"motor",
            "status":"final",
            "code":{
              "coding":[
                {
                  "system":"http://loinc.org",
                  "code":"9268-4",
                  "display":"Glasgow coma score motor"
                }
              ],
              "text":"Motor"
            },
            "subject":{
              "reference":"Patient/3633"
            },
            "valueQuantity":{
              "value":5,
              "system":"http://unitsofmeasure.org",
              "code":"{score}"
            }
          },
          {
            "resourceType":"Observation",
            "id":"verbal",
            "status":"final",
            "code":{
              "coding":[
                {
                  "system":"http://loinc.org",
                  "code":"9270-0",
                  "display":"Glasgow coma score verbal"
                }
              ],
              "text":"Verbal"
            },
            "subject":{
              "reference":"Patient/3633"
            },
            "valueQuantity":{
              "value":4,
              "system":"http://unitsofmeasure.org",
              "code":"{score}"
            }
          },
          {
            "resourceType":"Observation",
            "id":"eyes",
            "status":"final",
            "code":{
              "coding":[
                {
                  "system":"http://loinc.org",
                  "code":"9267-6",
                  "display":"Glasgow coma score eye opening"
                }
              ],
              "text":"Eyes"
            },
            "subject":{
              "reference":"Patient/3633"
            },
            "valueQuantity":{
              "value":4,
              "system":"http://unitsofmeasure.org",
              "code":"{score}"
            }
          }
        ],
        "status":"final",
        "code":{
          "coding":[
            {
              "system":"http://loinc.org",
              "code":"9269-2",
              "display":"Glasgow coma score total"
            }
          ],
          "text":"Glasgow Coma Scale , (GCS)"
        },
        "subject":{
          "reference":"Patient/3633",
          "display":"Peter James Chalmers"
        },
        "valueQuantity":{
          "value":13,
          "system":"http://unitsofmeasure.org",
          "code":"{score}"
        },
        "referenceRange":[
          {
            "high":{
              "value":8,
              "system":"http://unitsofmeasure.org",
              "code":"{score}"
            },
            "meaning":{
              "text":"Severe TBI"
            }
          },
          {
            "low":{
              "value":9,
              "system":"http://unitsofmeasure.org",
              "code":"{score}"
            },
            "high":{
              "value":12,
              "system":"http://unitsofmeasure.org",
              "code":"{score}"
            },
            "meaning":{
              "text":"Moderate TBI"
            }
          },
          {
            "low":{
              "value":13,
              "system":"http://unitsofmeasure.org",
              "code":"{score}"
            },
            "meaning":{
              "text":"Mild TBI"
            }
          }
        ],
        "related":[
          {
            "type":"derived-from",
            "target":{
              "reference":"#motor",
              "display":"Motor score"
            }
          },
          {
            "type":"derived-from",
            "target":{
              "reference":"#verbal",
              "display":"Verbal score"
            }
          },
          {
            "type":"derived-from",
            "target":{
              "reference":"#eyes",
              "display":"Eyes score"
            }
          }
        ]
      },
      "search":{
        "mode":"match"
      }
    },
    {
      "resource":{
        "resourceType":"Observation",
        "id":"19646",
        "meta":{
          "versionId":"3",
          "lastUpdated":"2015-09-01T16:20:25.214-04:00"
        },
        "text":{
          "status":"generated",
          "div":"<div>asd</div>"
        },
        "status":"final",
        "code":{
          "coding":[
            {
              "system":"http://loinc.org",
              "code":"3141-9",
              "display":"Weight Measured"
            },
            {
              "system":"http://snomed.info/sct",
              "code":"27113001",
              "display":"Body weight"
            },
            {
              "system":"http://acme.org/devices/clinical-codes",
              "code":"body-weight",
              "display":"Body Weight"
            }
          ]
        },
        "subject":{
          "reference":"Patient/3633"
        },
        "valueQuantity":{
          "value":189,
          "system":"http://unitsofmeasure.org",
          "code":"[lb_av]"
        }
      },
      "search":{
        "mode":"match"
      }
    },
    {
      "resource":{
        "resourceType":"Observation",
        "id":"3560",
        "meta":{
          "versionId":"3",
          "lastUpdated":"2015-09-01T16:15:13.314-04:00"
        },
        "extension":[
          {
            "url":"http://hl7.org/fhir/StructureDefinition/observation-bodyPosition",
            "valueCodeableConcept":{
              "coding":[
                {
                  "system":"http://snomed.info/sct",
                  "code":"33586001",
                  "display":"Sitting position (finding)"
                }
              ]
            }
          },
          {
            "url":"http://hl7.org/fhir/StructureDefinition/observation-delta",
            "valueCodeableConcept":{
              "coding":[
                {
                  "system":"http://snomed.info/sct",
                  "code":"1250004",
                  "display":"Decreased (qualifier value)"
                }
              ]
            }
          }
        ],
        "text":{
          "status":"generated",
          "div":"<div xmlns=\"http://www.w3.org/1999/xhtml\"> <p> <b>Generated Narrative with Details</b> </p> <p> <b>code</b>: Hemoglobin [Mass/volume] in Venous blood <span style=\"background: LightGoldenRodYellow \">(Details : {LOINC code '30350-3' = 'Hemoglobin [Mass/volume] in Venous blood', given as 'Hemoglobin [Mass/volume] in Venous blood'})</span> </p> <p> <b>value</b>: 7.2 g/dl <span style=\"background: LightGoldenRodYellow \"> (Details: http://unitsofmeasure.org code g/dL = 'g/dL')</span> </p> <p> <b>interpretation</b>: low <span style=\"background: LightGoldenRodYellow \">(Details : {http://hl7.org/fhir/v2/0078 code 'L' = 'Below low normal', given as 'low'})</span> </p> <p> <b>applies</b>: Apr 2, 2013 8:30:10 PM --&gt; Apr 5, 2013 8:30:10 PM </p> <p> <b>issued</b>: Apr 4, 2013 1:30:10 AM </p> <p> <b>status</b>: FINAL </p> <p> <b>reliability</b>: OK </p> <p> <b>bodySite</b>: Superficial forearm vein <span style=\"background: LightGoldenRodYellow \">(Details : {SNOMED CT code '308046002' = 'Superficial forearm vein', given as 'Superficial forearm vein'})</span> </p> <p> <b>method</b>: Injection to forearm <span style=\"background: LightGoldenRodYellow \">(Details : {SNOMED CT code '120220003' = 'Injection to forearm', given as 'Injection to forearm'})</span> </p> <p> <b>subject</b>: <a href=\"Patient/example\">Generated Summary: Extensions: todo; MRN = 12345 (USUAL); Peter James Chalmers (OFFICIAL), Jim ; -unknown-(HOME), ph: (03) 5555 6473(WORK); MALE; birthDate: Dec 25, 1974; active</a> </p> </div>"
        },
        "status":"final",
        "code":{
          "coding":[
            {
              "system":"http://loinc.org",
              "code":"30350-3",
              "display":"Hemoglobin [Mass/volume] in Venous blood"
            }
          ]
        },
        "subject":{
          "reference":"Patient/3633"
        },
        "issued":"2013-04-03T15:30:10+01:00",
        "valueQuantity":{
          "value":7.2,
          "system":"http://unitsofmeasure.org",
          "code":"g/dL"
        },
        "interpretation":{
          "coding":[
            {
              "system":"http://hl7.org/fhir/v2/0078",
              "code":"L",
              "display":"low"
            }
          ]
        },
        "method":{
          "coding":[
            {
              "system":"http://snomed.info/sct",
              "code":"120220003",
              "display":"Injection to forearm"
            }
          ]
        }
      },
      "search":{
        "mode":"match"
      }
    },
    {
      "resource":{
        "resourceType":"Observation",
        "id":"3542",
        "meta":{
          "versionId":"3",
          "lastUpdated":"2015-09-01T16:15:11.715-04:00"
        },
        "text":{
          "status":"generated",
          "div":"<div xmlns=\"http://www.w3.org/1999/xhtml\">Sept 17, 2012: Diastolic Blood pressure 60 mmHg (low) <hr/> <p> <b>Generated Narrative with Details</b> </p> <p> <b>text</b>: </p> <p> <b>code</b>: Diastolic blood pressure <span style=\"background: LightGoldenRodYellow \">(Details : {LOINC code '8462-4' = 'Diastolic blood pressure', given as 'Diastolic blood pressure'})</span> </p> <p> <b>value</b>: 60 mm[Hg] </p> <p> <b>status</b>: FINAL </p> <p> <b>reliability</b>: OK </p> <p> <b>subject</b>: <a href=\"Patient/example\">Generated Summary: Extensions: todo; MRN = 12345 (USUAL); Peter James Chalmers (OFFICIAL), Jim ; -unknown-(HOME), ph: (03) 5555 6473(WORK); MALE; birthDate: Dec 25, 1974; active</a> </p> </div>"
        },
        "status":"final",
        "code":{
          "coding":[
            {
              "system":"http://loinc.org",
              "code":"8462-4",
              "display":"Diastolic blood pressure"
            }
          ]
        },
        "subject":{
          "reference":"Patient/3633"
        },
        "valueQuantity":{
          "value":60
        }
      },
      "search":{
        "mode":"match"
      }
    },
    {
      "resource":{
        "resourceType":"Observation",
        "id":"3540",
        "meta":{
          "versionId":"3",
          "lastUpdated":"2015-09-01T16:15:11.650-04:00"
        },
        "text":{
          "status":"generated",
          "div":"<div xmlns=\"http://www.w3.org/1999/xhtml\">Sept 17, 2012: Systolic Blood pressure 107/60 mmHg (low) <hr/> <p> <b>Generated Narrative with Details</b> </p> <p> <b>text</b>: </p> <p> <b>code</b>: Blood pressure systolic &amp; diastolic <span style=\"background: LightGoldenRodYellow \">(Details : {LOINC code &apos;55284-4&apos; = &apos;Blood pressure systolic and diastolic&apos;, given as &apos;Blood pressure systolic &amp; diastolic&apos;})</span> </p> <p> <b>interpretation</b>: low <span style=\"background: LightGoldenRodYellow \">(Details : {http://hl7.org/fhir/v2/0078 code 'L' = 'Below low normal', given as 'Below low normal'})</span> </p> <p> <b>applies</b>: Sep 17, 2012 </p> <p> <b>status</b>: FINAL </p> <p> <b>reliability</b>: OK </p> <p> <b>identifier</b>: urn:uuid:187e0c12-8dd2-67e2-99b2-bf273c878281 </p> <p> <b>subject</b>: <a href=\"Patient/example\">Generated Summary: Extensions: todo; MRN = 12345 (USUAL); Peter James Chalmers (OFFICIAL), Jim ; -unknown-(HOME), ph: (03) 5555 6473(WORK); MALE; birthDate: Dec 25, 1974; active</a> </p> <p> <b>performer</b>: <a href=\"Practitioner/example\">Generated Summary: 23; Adam Careful </a> </p> <blockquote> <p> <b>related</b> </p> <p> <b>type</b>: HASCOMPONENT </p> <p> <b>target</b>: <a href=\"http://acme.org/ehr/observations/34252345234-s\">http://acme.org/ehr/observations/34252345234-s</a> </p> </blockquote> <blockquote> <p> <b>related</b> </p> <p> <b>type</b>: HASCOMPONENT </p> <p> <b>target</b>: <a href=\"http://acme.org/ehr/observations/34252345234-d\">http://acme.org/ehr/observations/34252345234-d</a> </p> </blockquote> </div>"
        },
        "identifier":[
          {
            "system":"urn:ietf:rfc:3986",
            "value":"urn:uuid:187e0c12-8dd2-67e2-99b2-bf273c878281"
          }
        ],
        "status":"final",
        "code":{
          "coding":[
            {
              "system":"http://loinc.org",
              "code":"55284-4",
              "display":"Blood pressure systolic & diastolic"
            }
          ]
        },
        "subject":{
          "reference":"Patient/3633"
        },
        "performer":[
          {
            "reference":"Practitioner/2970"
          }
        ],
        "interpretation":{
          "coding":[
            {
              "system":"http://hl7.org/fhir/v2/0078",
              "code":"L",
              "display":"Below low normal"
            }
          ],
          "text":"low"
        },
        "related":[
          {
            "type":"has-component"
          },
          {
            "type":"has-component"
          }
        ]
      },
      "search":{
        "mode":"match"
      }
    },
    {
      "resource":{
        "resourceType":"Observation",
        "id":"3541",
        "meta":{
          "versionId":"3",
          "lastUpdated":"2015-09-01T16:15:11.670-04:00"
        },
        "text":{
          "status":"generated",
          "div":"<div xmlns=\"http://www.w3.org/1999/xhtml\">Sept 17, 2012: Systolic Blood pressure 107 mmHg (low) <hr/> <p> <b>Generated Narrative with Details</b> </p> <p> <b>text</b>: </p> <p> <b>code</b>: Systolic blood pressure <span style=\"background: LightGoldenRodYellow \">(Details : {LOINC code '8480-6' = 'Systolic blood pressure', given as 'Systolic blood pressure'}; {SNOMED CT code '271649006' = 'Systolic blood pressure', given as 'Systolic blood pressure'}; {http://acme.org/devices/clinical-codes code 'bp-s' = 'bp-s', given as 'Systolic Blood pressure'})</span> </p> <p> <b>value</b>: 107 mm[Hg] </p> <p> <b>status</b>: FINAL </p> <p> <b>reliability</b>: OK </p> <p> <b>subject</b>: <a href=\"Patient/example\">Generated Summary: Extensions: todo; MRN = 12345 (USUAL); Peter James Chalmers (OFFICIAL), Jim ; -unknown-(HOME), ph: (03) 5555 6473(WORK); MALE; birthDate: Dec 25, 1974; active</a> </p> </div>"
        },
        "status":"final",
        "code":{
          "coding":[
            {
              "system":"http://loinc.org",
              "code":"8480-6",
              "display":"Systolic blood pressure"
            },
            {
              "system":"http://snomed.info/sct",
              "code":"271649006",
              "display":"Systolic blood pressure"
            },
            {
              "system":"http://acme.org/devices/clinical-codes",
              "code":"bp-s",
              "display":"Systolic Blood pressure"
            }
          ]
        },
        "subject":{
          "reference":"Patient/3633"
        },
        "valueQuantity":{
          "value":107
        }
      },
      "search":{
        "mode":"match"
      }
    }
  ];
});
