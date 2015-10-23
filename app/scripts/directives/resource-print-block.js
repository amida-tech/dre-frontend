/**
 * Created by igi on 22.10.15.
 */
"use strict";
angular.module('dreFrontendApp')
    .directive('resourcePrintBlock', function () {
        return {
            templateUrl: 'views/directives/resource-print-block.html',
            restrict: 'AE',
            scope: {
                patientId: "=",
                data: "="
            },
            controller: function ($scope, $injector) {
                $scope.model = {
                    title: $scope.data.title,
                    bundle: []
                };

                if ($scope.data.serviceName && $scope.patientId) {
                    var fhir_service = $injector.get($scope.data.serviceName);
                    fhir_service.getByPatientId($scope.patientId)
                        .then(function (bundle) {
                            if (bundle.entry && bundle.entry.length > 0) {
                                $scope.model.bundle = bundle.entry;
                            }
                        });
                }
            }
        };
    });
