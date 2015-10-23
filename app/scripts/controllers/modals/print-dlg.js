'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:PrintDlgCtrl
 * @description
 * # PrintDlgCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('PrintDlgCtrl', function ($scope, $modalInstance, dreFrontendGlobals, $log, $q) {

        /* copied from DRE version */
        var blocks = ["AllergyIntolerance", "MedicationOrder", "Condition", "Procedure", "TestResult",
            "Encounter", "Immunization", "Insurance", "Claim", "SocialHistory", "Vital"];

        $scope.model= {
            data: [],
            isDone: false
        };

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.printRecord = function(withUserData) {
            angular.forEach(blocks, function(block_name){
                $scope.model.data.push(
                    angular.extend(
                        angular.copy(dreFrontendGlobals.resourceTypes[block_name]),
                        {"withUserData": withUserData}
                    )
                );
            });
        };

        $scope.printData = function (divName) {

            var printContents = document.getElementById(divName).innerHTML;
            var originalContents = document.body.innerHTML;

            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                popupWin.window.focus();
                popupWin.document.write('<!DOCTYPE html><html><head>' +
                    '<link rel="stylesheet" type="text/css" href="style.css" />' +
                    '</head><body onload="window.print()"><div class="reward-body">' + printContents + '</div></html>');
                popupWin.onbeforeunload = function (event) {
                    popupWin.close();
                    return '.\n';
                };
                popupWin.onabort = function (event) {
                    popupWin.document.close();
                    popupWin.close();
                }
            } else {
                var popupWin = window.open('', '_blank', 'width=800,height=600');
                popupWin.document.open();
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
                popupWin.document.close();
            }
            popupWin.document.close();

            return true;
        }

    });
