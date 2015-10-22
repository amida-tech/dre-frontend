'use strict';

/**
 * @ngdoc service
 * @name dreFrontendApp.entry
 * @description
 * # entry
 * Service in the dreFrontendApp.
 */
angular.module('dreFrontendApp')
    .service('dreFrontendModalsService', function ($modal) {
        return {
            showMedicationInfo: function (item) {
                return $modal.open({
                    templateUrl: 'views/controllers/modals/medication-info.html',
                    controller: 'MedicationInfoCtrl',
                    size: 'lg',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });
            },
            showMedicationEdit: function (item) {
                return $modal.open({
                    templateUrl: 'views/controllers/modals/medication-edit.html',
                    controller: 'MedicationEditCtrl',
                    size: 'lg',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });
            },
            showPrintDlg: function () {
                return $modal.open({
                    templateUrl: 'views/controllers/modals/print-dlg.html',
                    controller: 'PrintDlgCtrl',
                    size: 'lg'
                });
            }
        };
    });
