'use strict';
angular.module('dreFrontend.fhir')
    .constant('fhirDetails', {
        "MedicationPrescription" : {
            "status": {
                title: "status",
                type: "S"
            },
            "prescriber": {
                title: "Prescriber",
                type: "R",
                resourceType: "Practitioner"
            },
            "reasonReference": {
                title: "Reason",
                type: "R",
                resourceType: "Condition"
            },
            "medication": {
                title: "Medication",
                type: "R",
                resourceType: "Medication"
            },
            "dosageInstruction": [
                {
                    "scheduledTiming": {
                        "repeat": {
                            "period": 6,
                            "periodUnits": "h"
                        }
                    }
                }
            ],
            "dispense": {
                "validityPeriod": {
                    "start": "2007-01-03"
                },
                "numberOfRepeatsAllowed": 1,
                "quantity": {
                    "value": 75
                }
            }
        },
        "Medication" : {
            "name": "Proventil 0.09 MG/ACTUAT inhalant solution",
            "code": {
                "coding": [
                    {
                    "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                    "code": "573621",
                    "display": "Proventil 0.09 MG/ACTUAT inhalant solution"
                    }
                ]
            },
            "manufacturer": {
                "reference": "Organization/18425"
            }
        },

});
