'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('NotesMenuCtrl', function ($scope, dreFrontendNotesService, _, dreFrontendGlobals) {
        $scope.model = {
            notesTypes: []
        };
        dreFrontendNotesService.getAllNotes().then(function (notesList) {
            var rawMenuTypes = _.groupBy(notesList, 'section');
            $scope.model.notesTypes = [];
            _.forEach(rawMenuTypes, function (noteType) {
                $scope.model.notesTypes.push({
                    title: _.find(dreFrontendGlobals.resourceTypes, {type:_.first(noteType).section}).title,
                    noteType: _.find(dreFrontendGlobals.resourceTypes, {type:_.first(noteType).section}).alias,
                    itemCount: noteType.length});
            })
        })
    });
