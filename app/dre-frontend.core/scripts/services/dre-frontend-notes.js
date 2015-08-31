'use strict';

angular.module('dreFrontend.util')
  .service('dreFrontendNotesService', function (dreFrontendHttp, $q, _,$log) {
    var notesList = null;
    var urls = {
      newNote: '/notes/add',
      favoriteNote: '/notes/star',
      editNote: '/notes/edit',
      deleteNote: '/notes/delete',
      allNotes: '/notes/all'
    };
    var self = {
      getAllNotes: function () {
        return dreFrontendHttp({
          url: urls.allNotes,
          method: 'GET'
        }).then(function (notes) {
          notesList = notes;
          return notesList;
        });
      },
      getNoteForEntry: function (entryId, section) {
        return $q.when(_.find(notesList, {entry:entryId, section: section}));
      },
      addNewNote: function (noteText, entryId, section, starred) {
        return dreFrontendHttp({
          url: urls.newNote,
          data: {
            entry: entryId,
            note: noteText,
            section: section,
            starred: starred
          },
          method: 'POST'
        }).then(function (note) {
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
        }).then(function (note) {
          return note;
        });
      },
      toggleFavorite: function (starred, noteId) {
        return dreFrontendHttp({
          url: urls.favoriteNote,
          data: {
            id: noteId,
            starred: starred
          },
          method: 'POST'
        }).then(function (note) {
          return note;
        });
      }
    };
    return self;
  });
