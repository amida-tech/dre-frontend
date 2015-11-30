/**
 * Created by igi on 25.11.15.
 */
'use strict';
describe('Factory:dreFrontendUtil', function(){
    var dreFrontendUtil;
    beforeEach(module('dreFrontend.util'));
    beforeEach(inject(function($injector){
        dreFrontendUtil = $injector.get('dreFrontendUtil');
    }));

    it('must be date', function(){
        expect(dreFrontendUtil.guessDataType('2006-05-01')).toBe('date');
    });
});
