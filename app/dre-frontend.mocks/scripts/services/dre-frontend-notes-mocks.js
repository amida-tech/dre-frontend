'use strict';

angular.module('dreFrontend.mocks')
  .service('dreFrontendNotesMocks', function ($log, $q, $rootScope, $httpBackend,_) {
    return function () {
      $log.debug('start configure notes mocks');
      var notesList = [{
        "_id": "55e3e903e770ae4417ddbd0f",
        "username": "isabella",
        "section": "medications",
        "entry": "55dfdf19e770ae4417ddbc20",
        "note": "asssssssss",
        "__v": 0,
        "star": true,
        "datetime": "2015-08-31T05:41:23.141Z"
      }, {
        "_id": "55e40cfae770ae4417ddbd11",
        "username": "isabella",
        "section": "medications",
        "entry": "55dfdf18e770ae4417ddbbfd",
        "note": "Notew",
        "__v": 0,
        "star": false,
        "datetime": "2015-08-31T08:37:35.512Z"
      }];
      //getAllNotes
      $httpBackend.whenGET('mock/notes/all').respond(function (method, url, data) {
        return [200, notesList, {}];
      });
      //addNewNote
      $httpBackend.whenPOST('mock/notes/add').respond(function (method, url, data) {
        var params = angular.fromJson(data);
        var newNote = {
          "_id": new Date().toString(),
          "username": "isabella",
          "section": params.section,
          "entry": params.entry,
          "note": params.note,
          "__v": 0,
          "star": params.star,
          "datetime": new Date().toISOString()
        };
        notesList.push(newNote);
        return [200, newNote, {}];
      });
      //editNote
      $httpBackend.whenPOST('mock/notes/edit').respond(function (method, url, data) {
        var params = angular.fromJson(data);
        var note = _.find(notesList, {_id: params.id});
        note.note = params.note;
        note.datetime = new Date().toISOString();
        return [200, note, {}];
      });
      //editNote
      $httpBackend.whenPOST('mock/notes/star').respond(function (method, url, data) {
        var params = angular.fromJson(data);
        var note = _.find(notesList, {_id: params.id});
        note.star = params.star;
        note.datetime = new Date().toISOString();
        return [200, note, {}];
      });
      //deleteNote
      $httpBackend.whenPOST('mock/notes/delete').respond(function (method, url, data) {
        var params = angular.fromJson(data);
        _.remove(notesList, {_id: params.id});
        return [200, {}, {}];
      });
    }
  });
