'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('NotesCtrl', function ($scope, $state, $stateParams, dreFrontendNotesService, _, dreFrontendGlobals, dreFrontendAllergyIntolerances, dreFrontendEntry,
                                       dreFrontendConditions, dreFrontendEncounters, dreFrontendImmunizations, dreFrontendMedicationPrescriptions, dreFrontendProcedures, dreFrontendObservations) {
        $scope.model = {
            notesList: [],
            filterByStar: 'all',
            dateSort: ''
        };

        var initNotes = function () {
            dreFrontendNotesService.getAllNotes().then(function (notesList) {
                var noteType = _.find(dreFrontendGlobals.resourceTypes, {alias: $stateParams.noteType});
                var rawNotesList = angular.isUndefined(noteType) ? notesList : _.filter(notesList, {section: noteType.type});
                if ($scope.model.filterByStar != 'all') {
                    rawNotesList = _.filter(rawNotesList, function (item) {
                        if ($scope.model.filterByStar == 'starred' && item.star) {
                            return true;
                        }
                        if ($scope.model.filterByStar != 'starred' && !item.star) {
                            return true;
                        }
                        return false;
                    })
                }
                $scope.model.notesList = [];
                _.forEach(rawNotesList, function (entry) {
                    $scope.model.notesList.push({
                        type: entry.section,
                        note: entry,
                        date: new Date(entry.datetime),
                        showEntry: false,
                        entryTitle: undefined,
                        dates: {}
                    })
                });
            });
        };

        initNotes();

        $scope.toggleFavorite = function (item) {
            item.note.star = !item.note.star;
            dreFrontendNotesService.toggleFavorite(item.note.star, item.note._id).then(function (note) {
                initNotes();
            });
        };

        $scope.toggleFilter = function (value) {
            $scope.model.filterByStar = value;
            initNotes();
        };

        $scope.goToEntry = function (item) {
            switch (item.type) {
                case 'MedicationPrescription':
                    $state.go('record.medications');
                    break;
                case 'ObservationTestResult':
                    $state.go('record.testresults');
                    break;
                case 'ObservationVital':
                    $state.go('record.vitals');
                    break;
                case 'Encounter':
                    $state.go('record.encounters');
                    break;
                case 'Condition':
                    $state.go('record.conditions');
                    break;
                case 'Procedure':
                    $state.go('record.procedures');
                    break;
                case 'AllergyIntolerance':
                    $state.go('record.allergies');
                    break;
                case 'Immunization':
                    $state.go('record.immunizations');
                    break;
            }
        };

        $scope.toggleEntry = function (item) {
            if (angular.isUndefined(item.entryTitle)) {
                var service = undefined;
                switch (item.type) {
                    case 'MedicationPrescription':
                        service = dreFrontendMedicationPrescriptions;
                        break;
                    case 'ObservationTestResult':
                        service = dreFrontendObservations;
                        break;
                    case 'ObservationVital':
                        service = dreFrontendObservations;
                        break;
                    case 'Encounter':
                        service = dreFrontendEncounters;
                        break;
                    case 'Condition':
                        service = dreFrontendConditions;
                        break;
                    case 'Procedure':
                        service = dreFrontendProcedures;
                        break;
                    case 'AllergyIntolerance':
                        service = dreFrontendAllergyIntolerances;
                        break;
                    case 'Immunization':
                        service = dreFrontendImmunizations;
                        break;
                }
                service.getById(item.note.entry).then(function (resourceEntry) {
                    if (resourceEntry) {
                        if (item.type == 'MedicationPrescription') {
                            resourceEntry.medication.load().then(function () {
                                item.entryTitle = dreFrontendEntry.getEntryTitle(resourceEntry);
                                item.dates = dreFrontendEntry.getEntryDates(resourceEntry);
                                item.showEntry = !item.showEntry;
                            });
                        } else {
                            item.entryTitle = dreFrontendEntry.getEntryTitle(resourceEntry);
                            item.dates = dreFrontendEntry.getEntryDates(resourceEntry);
                            item.showEntry = !item.showEntry;
                        }
                    }
                })
            }
        }
    });
