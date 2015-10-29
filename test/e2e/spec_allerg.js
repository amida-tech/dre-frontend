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


    it('should have my allergies', function () {

        expect(browser.getTitle()).toEqual('My PHR | Home');

        var record = element(by.css('[ui-sref="record"]'));
        record.click();

        expect(browser.getCurrentUrl()).toEqual(url + 'home/record');

        var recordAllergies = element(by.css('[ui-sref="record.allergies"]'));
        recordAllergies.click().then(function () {

            var allergies = element.all(by.binding('userTimelineEntry.title'));
            var count;
            allergies.count().then(function (value) {
                count = value;

                console.log('--------------', count);

                expect(count >= 1).toBeTruthy();
            });
            var detailsBtn = ($('[ng-click="setTab(\'details\')"]'));
            detailsBtn.click().then(function () {
                shoot('allergy1');
                expect(element(by.css('.details-table')).isDisplayed()).toBeTruthy();
                shoot('allergy');
            });
        });
    });
});