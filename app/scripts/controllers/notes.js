'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('NotesCtrl', function ($scope, $state, $stateParams, dreFrontendNotesService, _, dreFrontendGlobals, dreFrontendAllergyIntolerances, dreFrontendEntryService,
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
            var alias = _.find(dreFrontendGlobals.resourceTypes,{type:item.type}).alias;
            if(alias == dreFrontendGlobals.resourceTypes.Insurance.alias || alias == dreFrontendGlobals.resourceTypes.Claim.alias){
                $state.go('billing.' + alias,{id:item.note.entry});
            }else{
                $state.go('record.' + alias,{id:item.note.entry});
            }
        };

        $scope.toggleEntry = function (item) {
            if (angular.isUndefined(item.entryTitle)) {
                var service = undefined;
                switch (item.type) {
                    case dreFrontendGlobals.resourceTypes.MedicationPrescription.type:
                        service = dreFrontendMedicationPrescriptions;
                        break;
                    case dreFrontendGlobals.resourceTypes.TestResult.type:
                        service = dreFrontendObservations;
                        break;
                    case dreFrontendGlobals.resourceTypes.Vital.type:
                        service = dreFrontendObservations;
                        break;
                    case dreFrontendGlobals.resourceTypes.Encounter.type:
                        service = dreFrontendEncounters;
                        break;
                    case dreFrontendGlobals.resourceTypes.Condition.type:
                        service = dreFrontendConditions;
                        break;
                    case dreFrontendGlobals.resourceTypes.Procedure.type:
                        service = dreFrontendProcedures;
                        break;
                    case dreFrontendGlobals.resourceTypes.AllergyIntolerance.type:
                        service = dreFrontendAllergyIntolerances;
                        break;
                    case dreFrontendGlobals.resourceTypes.Immunization.type:
                        service = dreFrontendImmunizations;
                        break;
                    case dreFrontendGlobals.resourceTypes.SocialHistory.type:
                        service = dreFrontendObservations;
                        break;
                    case dreFrontendGlobals.resourceTypes.Insurance.type:
                        throw  new Error('Not implemented');
                        service = {};
                        break;
                    case dreFrontendGlobals.resourceTypes.Claim.type:
                        throw  new Error('Not implemented');
                        service = {};
                        break;

                }
                service.getById(item.note.entry).then(function (resourceEntry) {
                    if (resourceEntry) {
                        if (item.type == 'MedicationPrescription') {
                            resourceEntry.medication.load().then(function () {
                                item.entryTitle = dreFrontendEntryService.getEntryTitle(resourceEntry);
                                item.dates = dreFrontendEntryService.getEntryDates(resourceEntry);
                                item.showEntry = !item.showEntry;
                            });
                        } else {
                            item.entryTitle = dreFrontendEntryService.getEntryTitle(resourceEntry);
                            item.dates = dreFrontendEntryService.getEntryDates(resourceEntry);
                            item.showEntry = !item.showEntry;
                        }
                    }
                })
            }else{
                item.showEntry = !item.showEntry;
            }
        };

        initNotes();

        var toggleMenuCleanEvent = $scope.$on('toggleMenu', function(event, item){
            $scope.toggleEntry(item);
        });

        $scope.$on('$destroy', function () {
            toggleMenuCleanEvent();
        });


    });
