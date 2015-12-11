/**
 * Created by igi on 11.12.15.
 */
'use strict';
angular.module('dreFrontend.core')
    .factory('Change', function ($log) {

        var Change = function (data) {
            $log.debug('new change');
            this.setData(data);
        };

        Change.prototype.setData = function (data) {
            if (data) {
                angular.extend(this, data);
                if (!this._apply) {
                    this._apply = false;
                }
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
