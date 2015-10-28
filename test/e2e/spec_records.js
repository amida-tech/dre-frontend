
var url = require('./config').url;
var shoot = require('./config').shoot;
describe('DRE frontend', function() {

    it('should have my record', function() {
        browser.get(url);

        var uresName = element(by.id('login'));
        uresName.clear();
        uresName.sendKeys('test');
        var password = element(by.id('password'));
        password.clear();
        password.sendKeys('testtest');


        element(by.id('main-login-btn')).click();

        browser.waitForAngular();

        expect(browser.getTitle()).toEqual('My PHR | Home');

        var record = element(by.css('[ui-sref="record"]'));
        record.click();

        expect(browser.getCurrentUrl()).toEqual(url + 'home/record');
        shoot('record1');
        
    });
});