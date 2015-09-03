'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
  .directive('userMeasurements', function ($state, dreFrontendObservations, $filter) {
    return {
      templateUrl: 'views/directives/user-measurements.html',
      restrict: 'AE',
      scope: {},
      controller: function ($scope) {
        $scope.model = {
          height: 'n/a',
          weight: 'n/a',
          BMI: 'n/a',
          pressure: 'n/a',
          chartOptions: {
            chart: {
              type: "lineChart",
              height: 220,
              width: 390,
              useInteractiveGuideline: true,
              x: function (d) {
                return d.x.getTime();
              },
              y: function (d) {
                return d.y;
              },
              xAxis: {
                axisLabel: "Time",
                tickFormat: function(d){
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
              key: 'Blood Pressure',
              color: '#2ca02c'
            }
          ]
        };
        
        //init base values
        dreFrontendObservations.getLastHeight(3768).then(function (lastHeight) {
          if (lastHeight && lastHeight.entry && lastHeight.entry.length > 0 && lastHeight.entry[0].valueQuantity) {
            $scope.model.height = lastHeight.entry[0].valueQuantity.value + ' ' + (lastHeight.entry[0].valueQuantity.units || 'inches');
          }
        });
        dreFrontendObservations.getLastWeight(3768).then(function (lastWeight) {
          if (lastWeight && lastWeight.entry && lastWeight.entry.length > 0 && lastWeight.entry[0].valueQuantity) {
            $scope.model.weight = lastWeight.entry[0].valueQuantity.value + ' ' + (lastWeight.entry[0].valueQuantity.units || 'lbs');
          }
        });
        dreFrontendObservations.getLastBMI(3768).then(function (lastBMI) {
          if (lastBMI && lastBMI.entry && lastBMI.entry.length > 0 && lastBMI.entry[0].valueQuantity) {
            $scope.model.BMI = lastBMI.entry[0].valueQuantity.value;
          }
        });
        dreFrontendObservations.getLastBloodPressureDiastolic(3768).then(function (lastPressure) {
          if (lastPressure && lastPressure.entry && lastPressure.entry.length > 0 && lastPressure.entry[0].valueQuantity) {
            $scope.model.pressure = lastPressure.entry[0].valueQuantity.value;
          }
        });
        //init graph values
        dreFrontendObservations.getWeightHistory(3768).then(function (weightHistory) {
          $scope.model.weightData[0].values = [];
          _.forEach(weightHistory.entry, function (entry) {
            var applyDate = entry.appliesDateTime || (entry.issued || entry.meta.lastUpdated);
            $scope.model.weightData[0].values.push({
              y: entry.valueQuantity.value,
              x: new Date(applyDate)
            });

          });
        });
        dreFrontendObservations.getBloodPressureDiastolicHistory(3768).then(function (pressureHistory) {
          $scope.model.pressureData[0].values = [];
          _.forEach(pressureHistory.entry, function (entry) {
            var applyDate = entry.appliesDateTime || (entry.issued || entry.meta.lastUpdated);
            $scope.model.pressureData[0].values.push({
              y: entry.valueQuantity.value,
              x: new Date(applyDate)
            });
          });
        });
      }
    };
  });
