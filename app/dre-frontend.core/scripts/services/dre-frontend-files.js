"use strict";

angular.module('dreFrontend.util')
.service('dreFrontendFilesService', function (dreFrontendHttp, dreFrontendUtil) {
        angular.extend(this,{
            getFiles: function() {
                return dreFrontendHttp({
                    url:'/storage',
                    method:"GET"
                })
                    .then(function (data){
                        angular.forEach (data.storage, function(v,k){
                           data.storage[k].url = dreFrontendUtil.buildServiceUrl('/storage/record/'+ v.file_id);
                        });
                        return data;
                    });
            }
        });
    });

