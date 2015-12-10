/**
 * Created by igi on 10.12.15.
 */
'use strict';

angular.module('dreFrontendApp')
    .controller('ConfirmDlgCtrl', function ($scope, $modalInstance, confDlg) {
        $scope.close = function () {
            $modalInstance.close(0);
        };
        $scope.proceed = $modalInstance.close;
        $scope.model = confDlg || {};
    });
