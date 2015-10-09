/**
 * Created by igi on 09.10.15.
 */
'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:prescriberSearch
 * @description
 * # prescriberSearch
 */
angular.module('dreFrontendApp')
    .directive('prescriberSearch', function ($log) {
        return {
            templateUrl: 'views/directives/prescriber-search.html',
            restrict: 'AE',
            scope: {
                resultPrescriber: '='
            },
            controller: function ($scope, dreFrontendPrescriberService) {
                $scope.model = {
                    query: null,
                    active: false
                };

/*
                $scope.prescriberSearch = function prescriberSearch(firstName, lastName, state) {
                    $scope.prescriberSearchActive = true;
                    $scope.prescriberResults = null;
                    $scope.prescriberCount = null;
                    $scope.prescriberError = null;
                    var searchTest = false;
                    var searchObj = {};
                    $scope.selectedPrescriber = null;
                    if (firstName) {
                        _.deepSet(searchObj, 'name[0].first', firstName);
                    }
                    if (lastName) {
                        _.deepSet(searchObj, 'name[0].last', lastName);
                    }
                    if (state) {
                        _.deepSet(searchObj, 'address[0].state', state);
                    }
                    if (!_.isEmpty(searchObj)) {
                        console.log('searchObj ', searchObj);
                        npiapi.findNPI(searchObj, function (err, data) {
                            $scope.prescriberSearchActive = false;
                            if (err) {
                                console.log("Martz err: " + err);
                                $scope.prescriberError = "No matches found, please try again";
                            } else {
                                if (data.length >= 100) {
                                    if (_.isEmpty(state)) {
                                        $scope.prescriberError = "More than 100 matches found, please enter a state";
                                    } else {
                                        $scope.prescriberError = "More than 100 matches found, please adjust your search terms";
                                    }
                                } else {
                                    console.log("prescriberError ", state, data.length);
                                    $scope.prescriberResults = data;
                                    $scope.prescriberCount = data.length;
                                    $scope.prescriberError = null;
                                }
                            }
                        });
                    } else {
                        $scope.prescriberError = "Please enter search terms";
                        $scope.prescriberSearchActive = false;
                    }
                };
*/
            }
        }
    });
