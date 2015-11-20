'use strict';

angular.module('dreFrontend.util')
    .service('dreFrontendAuthService', function (dreFrontendHttp, $q, dreFrontendGlobals, $rootScope, $log) {
        var authData = null;
        var urls = {
            login: '/login',
            logout: '/logout',
            checkAuth: '/account',
            validateLogin: '/users',
            register: '/register',
            changePassword: '/changepassword'
        };
        return {
            login: function (login, password) {
                $rootScope.$emit(dreFrontendGlobals.authEvents.inProcess);
                return dreFrontendHttp({
                    url: urls.login,
                    data: {username: login, password: password},
                    method: 'POST'
                }).then(function () {
                    authData = {
                        isAuthenticated: true,
                        patientId: login
                    };
                    $rootScope.$emit(dreFrontendGlobals.authEvents.loggedIn, authData.patientId);
                    return true;
                }).catch(function () {
                    authData = {
                        isAuthenticated: false,
                        patientId: undefined
                    };
                    $rootScope.$emit(dreFrontendGlobals.authEvents.loggedOut);
                    return $q.reject(false);
                });
            },
            logout: function () {
                $rootScope.$emit(dreFrontendGlobals.authEvents.inProcess);
                return dreFrontendHttp({
                    url: urls.logout,
                    method: 'POST'
                }).finally(function () {
                    authData = {
                        isAuthenticated: false,
                        patientId: undefined
                    };
                    $rootScope.$emit(dreFrontendGlobals.authEvents.loggedOut);
                    return true;
                });
            },
            isAuthenticated: function (force) {
                if (angular.isObject(authData) && !force) {
                    return $q.when(authData.isAuthenticated);
                }
                return dreFrontendHttp({
                    url: urls.checkAuth,
                    method: 'GET'
                }).then(function (d) {
                    var origState = angular.isObject(authData) && authData.isAuthenticated;
                    if (d.authenticated) {
                        authData = {
                            isAuthenticated: true,
                            patientId: d.username /*3768*/
                        };
                        if (authData.isAuthenticated !== origState) {
                            $rootScope.$emit(dreFrontendGlobals.authEvents.loggedIn, authData.patientId);
                        }
                    } else {
                        authData = {
                            isAuthenticated: false,
                            patientId: undefined
                        };
                        if (authData.isAuthenticated !== origState) {
                            $rootScope.$emit(dreFrontendGlobals.authEvents.loggedOut);
                        }
                    }
                    return authData.isAuthenticated;
                }).catch(function () {
                    authData = {
                        isAuthenticated: false,
                        patientId: undefined
                    };
                    return false;
                });
            },
            isFreeLogin: function (login) {
                return dreFrontendHttp({
                    url: urls.validateLogin,
                    data: {username: login},
                    method: 'POST'
                }).then(function (used) {
                    return !used;
                }).catch(function () {
                    return false;
                });
            },
            registerUser: function (_data) {
                return dreFrontendHttp({url: urls.register, data: _data, method: 'POST'})
                    .then(function () {
                        return true;
                    })
                    .catch(function (error) {
                        $log.debug('$log', error);
                        return $q.reject(error.message);
                    });
            },
            changePassword: function (oldpassword, newpassword) {
                return dreFrontendHttp({
                    url: urls.changePassword,
                    data: {
                        old: oldpassword,
                        new: newpassword
                    },
                    method: 'POST'
                }).then(function () {
                    return true;
                }).catch(function (error) {
                    $log.debug('$log', error);
                    return $q.reject(error);
                });
            }
        };
    });
