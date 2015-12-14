'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('NotesCtrl', function ($scope, $state, $stateParams, dreFrontendNotesService, _,
                                       dreFrontendGlobals, $injector, dreFrontendEntryService) {
        $scope.model = {
            notesList: [],
            filterByStar: 'all',
            dateSort: ''
        };

        var initNotes = function () {
            dreFrontendNotesService.getAllNotes()
                .then(function (notesList) {
                    var noteType = _.find(dreFrontendGlobals.resourceTypes, {alias: $stateParams.group});
                    var rawNotesList = angular.isUndefined(noteType) ? notesList : _.filter(notesList, {section: noteType.type});
                    if ($scope.model.filterByStar !== 'all') {
                        rawNotesList = _.filter(rawNotesList, function (item) {
                            return ($scope.model.filterByStar === 'starred' && item.star) ||
                                ($scope.model.filterByStar !== 'starred' && !item.star);
                        });
                    }
                    $scope.model.notesList = [];
                    _.forEach(rawNotesList, function (entry) {
                        var resource_type = _.find(dreFrontendGlobals.resourceTypes, {type: entry.section});
                        if (resource_type) {
                            $scope.model.notesList.push({
                                type: entry.section,
                                resourceType: resource_type,
                                note: entry,
                                date: new Date(entry.datetime),
                                showEntry: false,
                                entryTitle: undefined,
                                dates: {}
                            });
                        }
                    });
                });
        };

        $scope.toggleFavorite = function (item) {
            item.note.star = !item.note.star;
            dreFrontendNotesService.toggleFavorite(item.note.star, item.note._id).then(function () {
                initNotes();
            });
        };

        $scope.toggleFilter = function (value) {
            $scope.model.filterByStar = value;
            initNotes();
        };

        $scope.goToEntry = function (item) {
            var alias = item.resourceType ? item.resourceType.alias : undefined;
            if (alias === dreFrontendGlobals.resourceTypes.Insurance.alias || alias === dreFrontendGlobals.resourceTypes.Claim.alias) {
                $state.go('billing.' + alias, {id: item.note.entry});
            } else {
                $state.go('record.' + alias, {id: item.note.entry});
            }
        };

        $scope.toggleEntry = function (item) {
            var item_data = {
                showEntry: !item.showEntry
            };

            if (angular.isUndefined(item.entryTitle)) {

                angular.extend(item_data, {
                    entryTitle: 'loading...',
                    dates: {}
                });
                if (item.resourceType && item.resourceType.serviceName) {
                    var fhir_service = $injector.get(item.resourceType.serviceName);
                    if (fhir_service) {
                        fhir_service.getById(item.note.entry)
                            .then(function (resourceEntry) {
                                if (item.type === 'MedicationOrder') {
                                    return resourceEntry.loadMedication()
                                        .then(function () {
                                            return resourceEntry;
                                        });
                                } else {
                                    return resourceEntry;
                                }
                            })
                            .then(function (resourceEntry) {
                                angular.extend(item_data, {
                                    entryTitle: dreFrontendEntryService.getEntryTitle(resourceEntry),
                                    dates: dreFrontendEntryService.getEntryDates(resourceEntry)
                                });
                                return item_data;
                            })
                            .catch(function () {
                                item_data.entryTitle = "Related resource entry not found";
                            })
                            .finally(function () {
                                angular.extend(item, item_data);
                            });
                    }
                } else {
                    item_data.entryTitle = "Resource entry unsupported";
                }
            }
            angular.extend(item, item_data);
        };

        initNotes();

        var toggleMenuCleanEvent = $scope.$on('toggleMenu', function (event, item) {
            $scope.toggleEntry(item);
        });

        $scope.$on('$destroy', function () {
            toggleMenuCleanEvent();
        });


    });
