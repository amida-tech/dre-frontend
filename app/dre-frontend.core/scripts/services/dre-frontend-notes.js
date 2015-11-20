'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendNotesService', function (dreFrontendHttp, $q, _) {
        var notesList = null;
        var notesListPromise = null;
        var urls = {
            newNote: '/notes/add',
            favoriteNote: '/notes/star',
            editNote: '/notes/edit',
            deleteNote: '/notes/delete',
            allNotes: '/notes/all'
        };
        var self = {
            getAllNotes: function () {
                if(notesList){
                    return $q.when(notesList);
                }
                notesListPromise = dreFrontendHttp({
                    url: urls.allNotes,
                    method: 'GET'
                }).then(function (notes) {
                    notesList = notes;
                    return notesList;
                });
                return notesListPromise;
            },
            getNoteForEntry: function (entryId, section) {
                return self.getAllNotes().then(function(notes){
                    return $q.when(_.find(notes, {entry: entryId, section: section}));
                });
            },
            addNewNote: function (noteText, entryId, section, starred) {
                return dreFrontendHttp({
                    url: urls.newNote,
                    data: {
                        entry: entryId,
                        note: noteText,
                        section: section,
                        star: starred
                    },
                    method: 'POST'
                }).then(function (note) {
                    notesList.push(note);
                    return note;
                });
            },
            editNote: function (noteText, noteId) {
                return dreFrontendHttp({
                    url: urls.editNote,
                    data: {
                        id: noteId,
                        note: noteText
                    },
                    method: 'POST'
                }).then(function (note) {
                    _.remove(notesList, {_id:noteId});
                    notesList.push(note);
                    return note;
                });
            },
            deleteNote: function (noteId) {
                return dreFrontendHttp({
                    url: urls.deleteNote,
                    data: {
                        id: noteId
                    },
                    method: 'POST'
                }).then(function () {
                    _.remove(notesList, {_id:noteId});
                    return true;
                });
            },
            toggleFavorite: function (starred, noteId) {
                return dreFrontendHttp({
                    url: urls.favoriteNote,
                    data: {
                        id: noteId,
                        star: starred
                    },
                    method: 'POST'
                }).then(function (note) {
                    _.remove(notesList, {_id:noteId});
                    notesList.push(note);
                    return note;
                });
            },
            clearAllNotes: function () {
                notesList = null;
            }
        };
        return self;
    });
