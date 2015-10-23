'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('entryNote', function (dreFrontendNotesService) {
        return {
            templateUrl: 'views/directives/entry-note.html',
            restrict: 'AE',
            scope: {
                entryNote: '=',
                readOnly: '=',
                withoutHeader: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    noteText: '',
                    isFavorite: false,
                    isEditMode: false,
                    noteId: '',
                    isNew: false,
                    lastUpdateDate: null,
                    error: ''
                };
                $scope.toggleFavorite = function () {
                    $scope.model.error = '';
                    if (!$scope.readOnly) {
                        $scope.model.isFavorite = !$scope.model.isFavorite;
                        if ($scope.model.noteId) {
                            dreFrontendNotesService.toggleFavorite($scope.model.isFavorite, $scope.model.noteId).then(function (note) {
                                initNoteDetails(note);
                            }).catch(function (error) {
                                $scope.model.error = error;
                            });
                        }
                    }
                };
                $scope.createNote = function () {
                    $scope.model.error = '';
                    dreFrontendNotesService.addNewNote($scope.model.noteText, $scope.entryNote.rawEntry.id, $scope.entryNote.type, $scope.model.isFavorite).then(function (note) {
                        initNoteDetails(note);
                    }).catch(function (error) {
                        $scope.model.error = error;
                    });
                };
                $scope.saveNote = function () {
                    $scope.model.error = '';
                    dreFrontendNotesService.editNote($scope.model.noteText, $scope.model.noteId).then(function (note) {
                        initNoteDetails(note);
                    }).catch(function (error) {
                        $scope.model.error = error;
                    });
                };
                $scope.deleteNote = function () {
                    $scope.model.error = '';
                    dreFrontendNotesService.deleteNote($scope.model.noteId).then(function () {
                        initNoteDetails(null);
                    }).catch(function (error) {
                        $scope.model.error = error;
                    });
                };
                var initNoteDetails = function (note) {
                    if (angular.isObject(note)) {
                        $scope.model.noteId = note._id;
                        $scope.model.noteText = note.note;
                        $scope.model.isFavorite = note.star;
                        $scope.model.lastUpdateDate = new Date(note.datetime);
                        $scope.model.isEditMode = false;
                        $scope.model.isNew = false;
                    } else {
                        $scope.model.noteId = '';
                        $scope.model.noteText = '';
                        $scope.model.isFavorite = false;
                        $scope.model.lastUpdateDate = null;
                        $scope.model.isEditMode = true;
                        $scope.model.isNew = true;
                    }
                };
                if ($scope.entryNote) {
                    dreFrontendNotesService.getNoteForEntry($scope.entryNote.rawEntry.id, $scope.entryNote.type)
                        .then(function (note) {

                            initNoteDetails(note);
                        });
                } else {
                    initNoteDetails(null);
                }
            }
        };
    });
