'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ReviewMenuCtrl
 * @description
 * # ReviewMenuCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ReviewMenuCtrl', function ($scope, dreFrontEndPatientInfoService, dreFrontendMergeService, dreFrontendUtil, _, dreFrontendGlobals) {
        $scope.model = {
            dataTypes: []
        };
        dreFrontEndPatientInfoService.getPatientId()
            .then(function (patient_id) {
                dreFrontendMergeService.getList(patient_id)
                    .then(function (matches) {
                        var types = {};
                        _.forEach(matches, function (match) {
                            if (!types[match.lhs.resourceType]) {
                                types[match.lhs.resourceType] = 0;
                            }
                            types[match.lhs.resourceType]++;
                        });
                        _.forEach(types, function (qty, typeName) {
                            var _type = _.find(dreFrontendGlobals.resourceTypes, {fhirType: typeName});
                            $scope.model.dataTypes.push({
                                title: (_type) ? _type.title : dreFrontendUtil.camelCaseToString(typeName),
                                type: typeName.toLowerCase(),
                                itemCount: qty
                            });
                        });
                    });
            });
    });
