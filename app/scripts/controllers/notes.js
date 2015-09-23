'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('NotesCtrl', function ($scope,$stateParams, dreFrontendNotesService,_) {
        $scope.model = {
            notesList:[]
        };
        dreFrontendNotesService.getAllNotes().then(function(notesList){
            $scope.model.notesList = angular.isUndefined($stateParams.noteType) ?  notesList : _.filter(notesList,{section:$stateParams.noteType});
        })
  });
