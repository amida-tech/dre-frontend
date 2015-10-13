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
                var query = {};
                $scope.model = {
                    name: {
                        first: '',
                        last: ''
                    },
                    address: {
                        state: ''
                    },
                    active: false,
                    err: null,
                    result: {
                        qty: 0,
                        data: []
                    }
                };

                function setQueryParam(param_name) {
                    var param_val = _.pick($scope.model[param_name], _.identity);
                    if (!_.isEmpty(param_val)) {
                        query[param_name] = [];
                        query[param_name][0] = param_val;
                    }

                }

                function NpiPrescriber(data) {
                    if (data)
                        angular.extend(this, data);
                }

                NpiPrescriber.prototype.getPracticeAddress = function () {
                    var res = [];
                    var pa = this.practice_address;

                    if (pa) {
                        res.push (pa.address_line + ((pa.address_details_line)?', ' + pa.address_details_line:''));
                        res.push (pa.city + ', ' + pa.state + ' ' + pa.zip);

                    }
                    return res;
                };

                NpiPrescriber.prototype.getName = function () {
                    var res = '';
                    if (this.first_name) {
                        res += this.first_name;
                    }
                    if (this.last_name) {
                        res += ' ' + this.last_name;
                    }
                    if (this.credential) {
                        res += ', ' + this.credential;
                    }
                    return res;
                };

                $scope.search = function () {
                    $scope.model.active = true;
                    $scope.model.err = null;
                    $scope.model.result = {
                        qty: 0,
                        data: []
                    };
                    setQueryParam('name');
                    setQueryParam('address');

                    if (!_.isEmpty(query)) {
                        dreFrontendPrescriberService.findnpi(query)
                            .then(function (npidata) {
                                $scope.model.result = [];
                                for (var n = 0; n < npidata.length; n++) {
                                    $scope.model.result.push(new NpiPrescriber(npidata[n]));
                                }
                            })
                            .catch(function (err) {
                                $scope.model.err = err;
                            })
                            .finally(function () {
                                $scope.model.active = false;
                            });
                    } else {
                        $scope.model.err = "Please enter search terms";
                        $scope.model.active = false;
                    }
                };

                function unselectPrescribers() {
                    for (var p = 0; p < $scope.model.result.length; p++) {
                        $scope.model.result[p].selected = false;
                    }
                }

                $scope.select = function (prescriber) {
                    if (prescriber.selected) {
                        prescriber.selected = false;
                        $scope.resultPrescriber = null;
                    } else {
                        unselectPrescribers();
                        prescriber.selected = true;
                        $scope.resultPrescriber = prescriber;
                    }
                };
            }
        }
    });
