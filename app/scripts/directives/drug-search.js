/**
 * Created by igi on 08.10.15.
 */
'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:drugSearch
 * @description
 * # drugSearch
 */
angular.module('dreFrontendApp')
    .directive('drugSearch', function ($log) {
        return {
            templateUrl: 'views/directives/drug-search.html',
            restrict: 'AE',
            scope: {
                resultDrug: '='
            },
            controller: function ($scope, dreFrontendMedicationService) {
                $scope.model = {
                    query: null,
                    active: false
                };

                function initDrug() {
                    angular.extend($scope.model,{
                        suggestions: null,
                        rxgroup: null,
                        drugCount: 0,
                        err: null,
                        warn: null,
                        brand: {},
                        drug: {name:''}
                    });
                }

                function unselectDrugs() {
                    if ($scope.model.rxgroup.compiled !== null) {
                        for (var j = 0; j < $scope.model.rxgroup.compiled.length; j++) {
                            $scope.model.rxgroup.compiled[j].selected = false;
                        }
                    }
                }

                $scope.search = function (query) {
                    $scope.model.active= true;
                    $scope.model.query= query;

                    initDrug();

                    dreFrontendMedicationService.getGroup(query)
                        .then(function (res) {
                            $scope.model.rxgroup = res;
                            unselectDrugs();
                            for (var j = 0; j < res.drugGroup.conceptGroup.length; j++) {
                                if (res.drugGroup.conceptGroup[j].conceptProperties) {
                                    $scope.model.drugCount += res.drugGroup.conceptGroup[j].conceptProperties.length;
                                }
                            }
                            return res;
                        })
                        .catch(function () {
                            $log.debug("here");
                            return dreFrontendMedicationService.getSpelling(query)
                                .then(function (res) {
                                    $scope.model.warn = "No matches found... did you mean one of these:";
                                    $scope.model.suggestions = res;
                                    return res;
                                })
                                .catch(function (err) {
                                    $scope.model.err = "No matches found.  Please Try Something Else";
                                    return err;
                                });
                        })
                        .finally(function(){
                            $scope.model.active= false;
                        });

                };

                $scope.selectDrug = function(){
                    if (this.rxdrug.selected) {
                        this.rxdrug.selected = false;
                        $scope.resultDrug = null;
                    } else {
                        unselectDrugs();
                        this.rxdrug.selected = true;
                        $scope.resultDrug = this.rxdrug;
                        $log.debug(this.rxdrug);
                    }
                };
            }
        };
    });
