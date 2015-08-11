'use strict';

angular.module('dreFrontend.fhir')
    .service('dreFrontendFhirService', function (Restangular) {
        var self = {
            patient: {
                all: function(callback){
                    Restangular.one('Patient').get()  // GET: /Patient
                        .then(function (data) {
                            // returns a list of Patietns
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Patient', id).get()  // GET: /Patient/123
                        .then(function (data) {
                            // returns one Patient
                            callback(data);
                        });
                },
            },
            medication: {
                all: function(callback){
                    Restangular.one('Medication').get()  // GET: /Medication
                        .then(function (data) {
                            // returns a list of Medications
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Medication', id).get()  // GET: /Medication/123
                        .then(function (data) {
                            // returns a one Medication
                            callback(data); 
                        });
                }
            },
            adverseReaction: {
                all: function(callback){
                    Restangular.one('AdverseReaction').get()  // GET: /AdverseReaction
                        .then(function (data) {
                            // returns a list of AdverseReactions
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('AdverseReaction', id).get()  // GET: /AdverseReaction/123
                        .then(function (data) {
                            // returns a one AdverseReaction
                            callback(data); 
                        });
                }
            },
            alert: {
                all: function(callback){
                    Restangular.one('Alert').get()  // GET: /Alert
                        .then(function (data) {
                            // returns a list of Alerts
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Alert', id).get()  // GET: /Alert/123
                        .then(function (data) {
                            // returns a one Alert
                            callback(data); 
                        });
                }
            },
            allergyIntolerance: {
                all: function(callback){
                    Restangular.one('AllergyIntolerance').get()  // GET: /AllergyIntolerance
                        .then(function (data) {
                            // returns a list of AllergyIntolerances
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('AllergyIntolerance', id).get()  // GET: /AllergyIntolerance/123
                        .then(function (data) {
                            // returns a one AllergyIntolerance
                            callback(data); 
                        });
                }
            },
            carePlan: {
                all: function(callback){
                    Restangular.one('CarePlan').get()  // GET: /CarePlan
                        .then(function (data) {
                            // returns a list of CarePlans
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('CarePlan', id).get()  // GET: /CarePlan/123
                        .then(function (data) {
                            // returns a one CarePlan
                            callback(data); 
                        });
                }
            },
            Composition: {
                all: function(callback){
                    Restangular.one('Composition').get()  // GET: /Composition
                        .then(function (data) {
                            // returns a list of Compositions
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Composition', id).get()  // GET: /Composition/123
                        .then(function (data) {
                            // returns a one Composition
                            callback(data); 
                        });
                }
            },
            ConceptMap: {
                all: function(callback){
                    Restangular.one('ConceptMap').get()  // GET: /ConceptMap
                        .then(function (data) {
                            // returns a list of ConceptMaps
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('ConceptMap', id).get()  // GET: /ConceptMap/123
                        .then(function (data) {
                            // returns a one ConceptMap
                            callback(data); 
                        });
                }
            },
            Condition: {
                all: function(callback){
                    Restangular.one('Condition').get()  // GET: /Condition
                        .then(function (data) {
                            // returns a list of Conditions
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Condition', id).get()  // GET: /Condition/123
                        .then(function (data) {
                            // returns a one Condition
                            callback(data); 
                        });
                }
            },
            Conformance: {
                all: function(callback){
                    Restangular.one('Conformance').get()  // GET: /Conformance
                        .then(function (data) {
                            // returns a list of Conformances
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Conformance', id).get()  // GET: /Conformance/123
                        .then(function (data) {
                            // returns a one Conformance
                            callback(data); 
                        });
                }
            },
            Device: {
                all: function(callback){
                    Restangular.one('Device').get()  // GET: /Device
                        .then(function (data) {
                            // returns a list of Devices
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Device', id).get()  // GET: /Device/123
                        .then(function (data) {
                            // returns a one Device
                            callback(data); 
                        });
                }
            },
            DeviceObservationReport: {
                all: function(callback){
                    Restangular.one('DeviceObservationReport').get()  // GET: /DeviceObservationReport
                        .then(function (data) {
                            // returns a list of DeviceObservationReports
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('DeviceObservationReport', id).get()  // GET: /DeviceObservationReport/123
                        .then(function (data) {
                            // returns a one DeviceObservationReport
                            callback(data); 
                        });
                }
            },
            DiagnosticOrder: {
                all: function(callback){
                    Restangular.one('DiagnosticOrder').get()  // GET: /DiagnosticOrder
                        .then(function (data) {
                            // returns a list of DiagnosticOrders
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('DiagnosticOrder', id).get()  // GET: /DiagnosticOrder/123
                        .then(function (data) {
                            // returns a one DiagnosticOrder
                            callback(data); 
                        });
                }
            },
            DiagnosticReport: {
                all: function(callback){
                    Restangular.one('DiagnosticReport').get()  // GET: /DiagnosticReport
                        .then(function (data) {
                            // returns a list of DiagnosticReports
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('DiagnosticReport', id).get()  // GET: /DiagnosticReport/123
                        .then(function (data) {
                            // returns a one DiagnosticReport
                            callback(data); 
                        });
                }
            },
            DocumentReference: {
                all: function(callback){
                    Restangular.one('DocumentReference').get()  // GET: /DocumentReference
                        .then(function (data) {
                            // returns a list of DocumentReferences
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('DocumentReference', id).get()  // GET: /DocumentReference/123
                        .then(function (data) {
                            // returns a one DocumentReference
                            callback(data); 
                        });
                }
            },
            DocumentManifest: {
                all: function(callback){
                    Restangular.one('DocumentManifest').get()  // GET: /DocumentManifest
                        .then(function (data) {
                            // returns a list of DocumentManifests
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('DocumentManifest', id).get()  // GET: /DocumentManifest/123
                        .then(function (data) {
                            // returns a one DocumentManifest
                            callback(data); 
                        });
                }
            },
            Encounter: {
                all: function(callback){
                    Restangular.one('Encounter').get()  // GET: /Encounter
                        .then(function (data) {
                            // returns a list of Encounters
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Encounter', id).get()  // GET: /Encounter/123
                        .then(function (data) {
                            // returns a one Encounter
                            callback(data); 
                        });
                }
            },
            FamilyHistory: {
                all: function(callback){
                    Restangular.one('FamilyHistory').get()  // GET: /FamilyHistory
                        .then(function (data) {
                            // returns a list of FamilyHistorys
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('FamilyHistory', id).get()  // GET: /FamilyHistory/123
                        .then(function (data) {
                            // returns a one FamilyHistory
                            callback(data); 
                        });
                }
            },
            Group: {
                all: function(callback){
                    Restangular.one('Group').get()  // GET: /Group
                        .then(function (data) {
                            // returns a list of Groups
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Group', id).get()  // GET: /Group/123
                        .then(function (data) {
                            // returns a one Group
                            callback(data); 
                        });
                }
            },
            ImagingStudy: {
                all: function(callback){
                    Restangular.one('ImagingStudy').get()  // GET: /ImagingStudy
                        .then(function (data) {
                            // returns a list of ImagingStudys
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('ImagingStudy', id).get()  // GET: /ImagingStudy/123
                        .then(function (data) {
                            // returns a one ImagingStudy
                            callback(data); 
                        });
                }
            },
            Immunization: {
                all: function(callback){
                    Restangular.one('Immunization').get()  // GET: /Immunization
                        .then(function (data) {
                            // returns a list of Immunizations
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Immunization', id).get()  // GET: /Immunization/123
                        .then(function (data) {
                            // returns a one Immunization
                            callback(data); 
                        });
                }
            },
            ImmunizationRecommendation: {
                all: function(callback){
                    Restangular.one('ImmunizationRecommendation').get()  // GET: /ImmunizationRecommendation
                        .then(function (data) {
                            // returns a list of ImmunizationRecommendations
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('ImmunizationRecommendation', id).get()  // GET: /ImmunizationRecommendation/123
                        .then(function (data) {
                            // returns a one ImmunizationRecommendation
                            callback(data); 
                        });
                }
            },
            List: {
                all: function(callback){
                    Restangular.one('List').get()  // GET: /List
                        .then(function (data) {
                            // returns a list of Lists
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('List', id).get()  // GET: /List/123
                        .then(function (data) {
                            // returns a one List
                            callback(data); 
                        });
                }
            },
            Location: {
                all: function(callback){
                    Restangular.one('Location').get()  // GET: /Location
                        .then(function (data) {
                            // returns a list of Locations
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Location', id).get()  // GET: /Location/123
                        .then(function (data) {
                            // returns a one Location
                            callback(data); 
                        });
                }
            },
            Media: {
                all: function(callback){
                    Restangular.one('Media').get()  // GET: /Media
                        .then(function (data) {
                            // returns a list of Medias
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Media', id).get()  // GET: /Media/123
                        .then(function (data) {
                            // returns a one Media
                            callback(data); 
                        });
                }
            },
            MedicationAdministration: {
                all: function(callback){
                    Restangular.one('MedicationAdministration').get()  // GET: /MedicationAdministration
                        .then(function (data) {
                            // returns a list of MedicationAdministrations
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('MedicationAdministration', id).get()  // GET: /MedicationAdministration/123
                        .then(function (data) {
                            // returns a one MedicationAdministration
                            callback(data); 
                        });
                }
            },
            MedicationDispense: {
                all: function(callback){
                    Restangular.one('MedicationDispense').get()  // GET: /MedicationDispense
                        .then(function (data) {
                            // returns a list of MedicationDispenses
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('MedicationDispense', id).get()  // GET: /MedicationDispense/123
                        .then(function (data) {
                            // returns a one MedicationDispense
                            callback(data); 
                        });
                }
            },
            MedicationPrescription: {
                all: function(callback){
                    Restangular.one('MedicationPrescription').get()  // GET: /MedicationPrescription
                        .then(function (data) {
                            // returns a list of MedicationPrescriptions
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('MedicationPrescription', id).get()  // GET: /MedicationPrescription/123
                        .then(function (data) {
                            // returns a one MedicationPrescription
                            callback(data); 
                        });
                }
            },
            MedicationStatement: {
                all: function(callback){
                    Restangular.one('MedicationStatement').get()  // GET: /MedicationStatement
                        .then(function (data) {
                            // returns a list of MedicationStatements
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('MedicationStatement', id).get()  // GET: /MedicationStatement/123
                        .then(function (data) {
                            // returns a one MedicationStatement
                            callback(data); 
                        });
                }
            },
            MessageHeader: {
                all: function(callback){
                    Restangular.one('MessageHeader').get()  // GET: /MessageHeader
                        .then(function (data) {
                            // returns a list of MessageHeaders
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('MessageHeader', id).get()  // GET: /MessageHeader/123
                        .then(function (data) {
                            // returns a one MessageHeader
                            callback(data); 
                        });
                }
            },
            Observation: {
                all: function(callback){
                    Restangular.one('Observation').get()  // GET: /Observation
                        .then(function (data) {
                            // returns a list of Observations
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Observation', id).get()  // GET: /Observation/123
                        .then(function (data) {
                            // returns a one Observation
                            callback(data); 
                        });
                }
            },
            OperationOutcome: {
                all: function(callback){
                    Restangular.one('OperationOutcome').get()  // GET: /OperationOutcome
                        .then(function (data) {
                            // returns a list of OperationOutcomes
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('OperationOutcome', id).get()  // GET: /OperationOutcome/123
                        .then(function (data) {
                            // returns a one OperationOutcome
                            callback(data); 
                        });
                }
            },
            Order: {
                all: function(callback){
                    Restangular.one('Order').get()  // GET: /Order
                        .then(function (data) {
                            // returns a list of Orders
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Order', id).get()  // GET: /Order/123
                        .then(function (data) {
                            // returns a one Order
                            callback(data); 
                        });
                }
            },
            OrderResponse: {
                all: function(callback){
                    Restangular.one('OrderResponse').get()  // GET: /OrderResponse
                        .then(function (data) {
                            // returns a list of OrderResponses
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('OrderResponse', id).get()  // GET: /OrderResponse/123
                        .then(function (data) {
                            // returns a one OrderResponse
                            callback(data); 
                        });
                }
            },
            Organization: {
                all: function(callback){
                    Restangular.one('Organization').get()  // GET: /Organization
                        .then(function (data) {
                            // returns a list of Organizations
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Organization', id).get()  // GET: /Organization/123
                        .then(function (data) {
                            // returns a one Organization
                            callback(data); 
                        });
                }
            },
            Other: {
                all: function(callback){
                    Restangular.one('Other').get()  // GET: /Other
                        .then(function (data) {
                            // returns a list of Others
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Other', id).get()  // GET: /Other/123
                        .then(function (data) {
                            // returns a one Other
                            callback(data); 
                        });
                }
            },
            Practitioner: {
                all: function(callback){
                    Restangular.one('Practitioner').get()  // GET: /Practitioner
                        .then(function (data) {
                            // returns a list of Practitioners
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Practitioner', id).get()  // GET: /Practitioner/123
                        .then(function (data) {
                            // returns a one Practitioner
                            callback(data); 
                        });
                }
            },
            Procedure: {
                all: function(callback){
                    Restangular.one('Procedure').get()  // GET: /Procedure
                        .then(function (data) {
                            // returns a list of Procedures
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Procedure', id).get()  // GET: /Procedure/123
                        .then(function (data) {
                            // returns a one Procedure
                            callback(data); 
                        });
                }
            },
            Profile: {
                all: function(callback){
                    Restangular.one('Profile').get()  // GET: /Profile
                        .then(function (data) {
                            // returns a list of Profiles
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Profile', id).get()  // GET: /Profile/123
                        .then(function (data) {
                            // returns a one Profile
                            callback(data); 
                        });
                }
            },
            Provenance: {
                all: function(callback){
                    Restangular.one('Provenance').get()  // GET: /Provenance
                        .then(function (data) {
                            // returns a list of Provenances
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Provenance', id).get()  // GET: /Provenance/123
                        .then(function (data) {
                            // returns a one Provenance
                            callback(data); 
                        });
                }
            },
            Query: {
                all: function(callback){
                    Restangular.one('Query').get()  // GET: /Query
                        .then(function (data) {
                            // returns a list of Querys
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Query', id).get()  // GET: /Query/123
                        .then(function (data) {
                            // returns a one Query
                            callback(data); 
                        });
                }
            },
            Questionnaire: {
                all: function(callback){
                    Restangular.one('Questionnaire').get()  // GET: /Questionnaire
                        .then(function (data) {
                            // returns a list of Questionnaires
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Questionnaire', id).get()  // GET: /Questionnaire/123
                        .then(function (data) {
                            // returns a one Questionnaire
                            callback(data); 
                        });
                }
            },
            RelatedPerson: {
                all: function(callback){
                    Restangular.one('RelatedPerson').get()  // GET: /RelatedPerson
                        .then(function (data) {
                            // returns a list of RelatedPersons
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('RelatedPerson', id).get()  // GET: /RelatedPerson/123
                        .then(function (data) {
                            // returns a one RelatedPerson
                            callback(data); 
                        });
                }
            },
            SecurityEvent: {
                all: function(callback){
                    Restangular.one('SecurityEvent').get()  // GET: /SecurityEvent
                        .then(function (data) {
                            // returns a list of SecurityEvents
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('SecurityEvent', id).get()  // GET: /SecurityEvent/123
                        .then(function (data) {
                            // returns a one SecurityEvent
                            callback(data); 
                        });
                }
            },
            Specimen: {
                all: function(callback){
                    Restangular.one('Specimen').get()  // GET: /Specimen
                        .then(function (data) {
                            // returns a list of Specimens
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Specimen', id).get()  // GET: /Specimen/123
                        .then(function (data) {
                            // returns a one Specimen
                            callback(data); 
                        });
                }
            },
            Substance: {
                all: function(callback){
                    Restangular.one('Substance').get()  // GET: /Substance
                        .then(function (data) {
                            // returns a list of Substances
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Substance', id).get()  // GET: /Substance/123
                        .then(function (data) {
                            // returns a one Substance
                            callback(data); 
                        });
                }
            },
            Supply: {
                all: function(callback){
                    Restangular.one('Supply').get()  // GET: /Supply
                        .then(function (data) {
                            // returns a list of Supplys
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('Supply', id).get()  // GET: /Supply/123
                        .then(function (data) {
                            // returns a one Supply
                            callback(data); 
                        });
                }
            },
            ValueSet: {
                all: function(callback){
                    Restangular.one('ValueSet').get()  // GET: /ValueSet
                        .then(function (data) {
                            // returns a list of ValueSets
                            callback(data);
                        });
                },
                one: function(id, callback){
                    Restangular.one('ValueSet', id).get()  // GET: /ValueSet/123
                        .then(function (data) {
                            // returns a one ValueSet
                            callback(data); 
                        });
                }
            },
        };
        return self;
});