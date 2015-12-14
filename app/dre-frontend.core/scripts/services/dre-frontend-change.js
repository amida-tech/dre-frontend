/**
 * Created by igi on 11.12.15.
 */
'use strict';
angular.module('dreFrontend.core')
    .factory('Change', function () {

        var Change = function (data) {
            this.setData(data);
            this._apply = this._apply || false;
        };

        Change.prototype.setData = function (data) {
            if (data) {
                if (angular.isDefined(data.apply)) {
                    this._apply = data.apply;
                    delete data.apply;
                }
                angular.extend(this, data);
            }
        };

        Change.prototype.apply = function (val) {
            if (typeof val !== 'undefined') {
                this._apply = val;
                if (this.changes) {
                    for (var q = 0; q < this.changes.length; q++) {
                        this.changes[q].apply = val;
                    }
                }
            }
            return this._apply;
        };

        return Change;
    });
