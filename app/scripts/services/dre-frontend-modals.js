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

        var self = {
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
                        item: function() {
                            return item;
                        }
                    }
                });
            }
        };

        return self;
    });
