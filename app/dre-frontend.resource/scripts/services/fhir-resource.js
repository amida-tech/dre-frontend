/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirResource',function(dreFrontendFhirService){
        var FhirResource = function (data){
            this.setData(data);
        };

        FhirResource.prototype.setData = function(data) {
            if (data) {
                angular.extend(this,data);
            }
        };

        FhirResource.prototype.save = function () {
            var _data = angular.fromJson(angular.toJson(this));
            var self = this;

            var f = function (resp){
                self.setData(resp);
                return self;
            };
            if (!_data.id) {
                return dreFrontendFhirService.create(_data.resourceType, _data)
                    .then(f);
            } else {
                return dreFrontendFhirService.update(_data.resourceType,_data.id, _data)
                    .then(f);
            }
        };

        /* do nothing. extend in childs */
        FhirResource.prototype.setBaseTemplate = function () {
            angular.extend(this, { });
        };

        return FhirResource;
    });

