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

        FhirResource.prototype.codableConceptTitle = function(cc_data) {
            var res;
            if (angular.isArray(cc_data)) {
                cc_data = cc_data[0];
            }
            if (cc_data) {
                if (cc_data.coding && cc_data.coding[0]){
                    res = cc_data.coding[0].display || cc_data.coding[0].code;
                } else {
                    res = cc_data.text;
                }
            }
            return res;
        };

        /* do nothing. extend in childs */
        FhirResource.prototype.setBaseTemplate = function () {
            angular.extend(this, { });
        };

        return FhirResource;
    });

