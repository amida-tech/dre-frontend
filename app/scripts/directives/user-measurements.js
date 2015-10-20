'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:userMeasurements
 * @description
 * # userMeasurements
 */
angular.module('dreFrontendApp')
    .directive('userMeasurements', function ($state, dreFrontendObservations, $filter, _, dreFrontEndPatientInfoService,$timeout) {
        return {
            templateUrl: 'views/directives/user-measurements.html',
            restrict: 'AE',
            scope: {},
            controller: function ($scope) {
                $scope.model = {
                    height: 'n/a',
                    weight: 'n/a',
                    BMI: 'n/a',
                    pressureDiastolic: 'n/a',
                    pressureSystolic: 'n/a',
                    bpApi: null,
                    wApi: null,
                    chartOptions: {
                        chart: {
                            type: "lineChart",
                            height: 220,
                            margin: {
                                right: 20
                            },
                            dispatch: {},
                            useInteractiveGuideline: true,
                            x: function (d) {
                                return d.x.getTime();
                            },
                            y: function (d) {
                                return d.y;
                            },
                            xAxis: {
                                axisLabel: "Time",
                                tickFormat: function (d) {
                                    return $filter('date')(d, 'shortDate');
                                }
                            },
                            yAxis: {
                                axisLabel: "Value"
                            },
                            transitionDuration: 250
                        }
                    },
                    weightData: [
                        {
                            values: [],
                            key: 'Weight',
                            color: '#2ca02c'
                        }
                    ],
                    pressureData: [
                        {
                            values: [],
                            key: 'Diastolic',
                            color: '#2ca02c'
                        },
                        {
                            values: [],
                            key: 'Systolic',
                            color: '#ff7f0e'
                        }
                    ]
                };

                function prepareValues(bundle) {
                    var values = [];
                    _.forEach(bundle.entry, function (observation) {
                        values.push({
                            y: observation.measurement(),
                            x: new Date(observation.dateTime())
                        });
                    });
                    return values;
                }

                dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
                    //init base values
                    dreFrontendObservations.getLastHeight(patientId).then(function (lastHeight) {
                        if (lastHeight) {
                            $scope.model.height = lastHeight.measurement(true);
                        }
                    });

                    dreFrontendObservations.getLastWeight(patientId)
                        .then(function (wght) {
                            if (wght) {
                                $scope.model.weight = wght.measurement(true);
                            }
                        });

                    dreFrontendObservations.getLastBMI(patientId).then(function (lastBMI) {
                        if (lastBMI) {
                            $scope.model.BMI = lastBMI.measurement();
                        }
                    });

                    dreFrontendObservations.getLastBloodPressureDiastolic(patientId).then(function (lastPressure) {
                        if (lastPressure) {
                            $scope.model.pressureDiastolic = lastPressure.measurement(true);
                        }
                    });

                    dreFrontendObservations.getLastBloodPressureSystolic(patientId).then(function (lastPressure) {
                        if (lastPressure) {
                            $scope.model.pressureSystolic = lastPressure.measurement(true);
                        }
                    });

                    //init graph values
                    dreFrontendObservations.getWeightHistory(patientId)
                        .then(function (bundle) {
                            $scope.model.weightData[0].values = prepareValues(bundle);
                        });

                    dreFrontendObservations.getBloodPressureDiastolicHistory(patientId)
                        .then(function (bundle) {
                            $scope.model.pressureData[0].values = _.sortBy(prepareValues(bundle), 'x');
                        });

                    dreFrontendObservations.getBloodPressureSystolicHistory(patientId)
                        .then(function (bundle) {
                            $scope.model.pressureData[1].values = _.sortBy(prepareValues(bundle), 'x');
                        });
                });

                $scope.updateChart = function (api) {
                    if (api) {
                        $timeout(function(){api.refresh()},0);
                    }
                }
            }
        };
    });
