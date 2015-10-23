var url = require('./config').url;

describe('DRE frontend', function() {

    it('should have a title', function() {
        browser.get(url);

        expect(browser.getTitle()).toEqual('My PHR');
    });

    it('user "test" should login', function() {
        browser.get(url);

        var uresName = element(by.id('login'));
        uresName.clear();
        uresName.sendKeys('test');
        var password = element(by.id('password'));
        password.clear();
        password.sendKeys('testtest');

        //browser.sleep(3000);
        element(by.id('main-login-btn')).click();

        browser.waitForAngular();

        expect(browser.getTitle()).toEqual('My PHR | Home');
    });
});