"use strict";

angular.module('dreFrontend.util')
.service('dreFrontendFilesService', function (dreFrontendHttp, $q, _,$log) {
        angular.extend(this,{
            getFiles: function() {
                return dreFrontendHttp({
                    url:'/storage',
                    method:"GET"
                });
            }
        });
    });

