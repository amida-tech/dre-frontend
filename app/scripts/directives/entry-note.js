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
        entryNote: '='
      },
      controller: function ($scope) {
        $scope.model = {
          noteText:'',
          isFavorite:false,
          isEditMode: false,
          noteId: '',
          isNew: false,
          lastUpdateDate: null,
          error:''
        };
        $scope.toggleFavorite = function(){
          $scope.model.error = '';
          if($scope.model.noteId){
            dreFrontendNotesService.toggleFavorite($scope.model.isFavorite, $scope.model.noteId).then(function(note){
              initNoteDetails(note);
            }).catch(function(error){
              $scope.model.error = error;
            });
          }else{
            $scope.model.isFavorite = !$scope.model.isFavorite;
          }
        };
        $scope.createNote = function(){
          $scope.model.error = '';
          dreFrontendNotesService.addNewNote($scope.model.noteText, $scope.entryNote.id, $scope.entryNote.type,$scope.model.isFavorite).then(function(note){
            initNoteDetails(note);
          }).catch(function(error){
            $scope.model.error = error;
          });
        };
        $scope.saveNote = function(){
          $scope.model.error = '';
          dreFrontendNotesService.addNewNote($scope.model.noteText, $scope.entryNote.id, $scope.entryNote.type,$scope.model.isFavorite).then(function(note){
            initNoteDetails(note);
          }).catch(function(error){
            $scope.model.error = error;
          });
        };
        $scope.deleteNote = function(){
          $scope.model.error = '';
          dreFrontendNotesService.deleteNote().then(function(){
            initNoteDetails(null);
          }).catch(function(error){
            $scope.model.error = error;
          });
        };
        var initNoteDetails = function(note){
          console.log('initNoteDetails', note);
          if(angular.isObject(note)){
            $scope.model.noteId = note.id;
            $scope.model.noteText = note.note;
            $scope.model.isFavorite = note.star;
            $scope.model.lastUpdateDate = new Date(note.datetime);
            $scope.model.isEditMode = false;
            $scope.model.isNew = false;
          }else{
            $scope.model.isEditMode = true;
            $scope.model.isNew = true;
          }
        };
        if($scope.entryDetails){
          dreFrontendNotesService.getNoteForEntry($scope.entryNote.id, $scope.entryNote.type).then(function(note){
            initNoteDetails(note);
          });
        }else{
          initNoteDetails(null);
        }
      }
    };
  });
