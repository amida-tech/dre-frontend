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
            dataTypes: []
        };
        dreFrontendNotesService.getAllNotes().then(function (notesList) {
            var rawMenuTypes = _.groupBy(notesList, 'section');
            $scope.model.dataTypes = [];
            _.forEach(rawMenuTypes, function (noteType) {
                var resourceType = _.find(dreFrontendGlobals.resourceTypes, {type:_.first(noteType).section});
                if (resourceType) {
                    $scope.model.dataTypes.push({
                        title: resourceType.title,
                        type: resourceType.alias,
                        itemCount: noteType.length
                    });
                }
            });
        });
    });
