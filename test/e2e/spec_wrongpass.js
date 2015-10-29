var url = require('./config').url;
var shoot = require('./config').shoot;
describe('DRE frontend', function () {

    it('login with wrong password', function () {
        browser.get(url);

        var uresName = element(by.id('login'));
        uresName.clear();
        uresName.sendKeys('test');
        var password = element(by.id('password'));
        password.clear();
        password.sendKeys('test2222');


        element(by.id('main-login-btn')).click().then(function () {

            browser.waitForAngular();
            //browser.sleep(10000);
            shoot('wrongpass');
            expect($('[ng-if="model.error"]').isDisplayed()).toBeTruthy();

        });
    });
});