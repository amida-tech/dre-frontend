'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:profilePhoto
 * @description
 * # profilePhoto
 */
angular.module('dreFrontendApp')
    .directive('profilePhoto', function (dreFrontendGlobals,$rootScope, $log) {
        return {
            templateUrl: 'views/directives/profile-photo.html',
            restrict: 'AE',
            scope: {
                patient:'='
            },
            controller: function ($scope) {

                $scope.model = {
                    srcImage: '',
                    resultImage: ''
                };

                var handleFileSelect=function(evt) {
                    var file=evt.currentTarget.files[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function($scope){
                            $scope.model.srcImage=evt.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
                };
                angular.element(document.querySelector('#imageInput')).on('change',handleFileSelect);

                $scope.updatePhoto = function () {
                    if ($scope.patient){
                        var expr = /^data:(.+);base64,(.+)$/;
                        var photoData = $scope.model.resultImage.match(expr);
                        if (photoData) {
                            $scope.patient.setBase64Photo(photoData[1], photoData[2])
                                .update()
                                .then(function(){
                                    $rootScope.$broadcast(dreFrontendGlobals.profileEvents.updated);
                                });
                        }
                    }
                }
            }
        };
    })
;
