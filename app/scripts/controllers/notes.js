'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('NotesCtrl', function ($scope, $stateParams, dreFrontendNotesService, _, dreFrontendGlobals, dreFrontendUtil) {
        $scope.model = {
            notesList: [],
            filterByStar: 'all'
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
                        date: new Date(entry.datetime)
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
    });
