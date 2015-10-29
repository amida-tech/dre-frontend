var url = require('./config').url;
var shoot = require('./config').shoot;

describe('DRE frontend', function () {

    beforeEach(function () {
        browser.get(url);

        var uresName = element(by.id('login'));
        uresName.clear();
        uresName.sendKeys('test');
        var password = element(by.id('password'));
        password.clear();
        password.sendKeys('testtest');
        element(by.id('main-login-btn')).click();
        browser.waitForAngular();
    });

    afterEach(function () {
        browser.get(url + 'home');
        var dropdown = ($('[data-toggle="dropdown"]'));
        dropdown.click();
        var logout = element(by.cssContainingText('a', 'Log out'));
        logout.click();
    });


    it('should have my immunizations', function () {

        var record = element(by.css('[ui-sref="record"]'));
        record.click();

        expect(browser.getCurrentUrl()).toEqual(url + 'home/record');

        var recordImmun = element(by.css('[ui-sref="record.immunizations"]'));

        shoot('immun');
        recordImmun.click().then(function () {

            var immun = element.all(by.binding('userTimelineEntry.title'));

            //console.log(medications);
            var count;
            immun.count().then(function (value) {
                count = value;

                console.log('--------------', count);

                expect(count >= 1).toBeTruthy();

            });
            var detailsBtn = ($('[ng-click="setTab(\'details\')"]'));
            detailsBtn.click().then(function () {
                expect(element(by.css('.details-table')).isDisplayed()).toBeTruthy();

                shoot('immun1');
            });
        });
    });
});