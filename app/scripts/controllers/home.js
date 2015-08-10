'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('HomeCtrl', function (Restangular) {
    Restangular.all('patient').one('55c236d664a84dfd20326512').get()  // GET: /users
      .then(function (patient) {
        // returns a list of users
        console.log('patient', patient);

      });
  });