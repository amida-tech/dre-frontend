'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('NotesMenuCtrl', function ($scope, stateParams, dreFrontendNotesService, _) {
        $scope.model = {
            notesTypes:[]
        };
        dreFrontendNotesService.getAllNotes().then(function(notesList){
            var rawMenuTypes = _.uniq(_.(notesList, 'section'));
            $scope.model.notesTypes = [];
            _.forEach(rawMenuTypes,function(noteType){
                $scope.model.notesTypes.put({title:noteType, noteType:noteType})
            })
        })
  });
