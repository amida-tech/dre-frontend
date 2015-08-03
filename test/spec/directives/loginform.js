'use strict';

describe('Directive: loginForm', function () {

  // load the directive's module
  beforeEach(module('dreFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<login-form></login-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the loginForm directive');
  }));
});
