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

    it('should have my medications', function () {

        var record = element(by.css('[ui-sref="record"]'));
        record.click();

        expect(browser.getCurrentUrl()).toEqual(url + 'home/record');

        var recordMedications = element(by.css('[ui-sref="record.medications"]'));
        recordMedications.click().then(function () {
            shoot('med');
            var medications = element.all(by.binding('userTimelineEntry.title'));

            //console.log(medications);
            var count;
            medications.count().then(function (value) {
                shoot('med1');
                count = value;

                console.log('--------------', count);

                expect(count >= 1).toBeTruthy();

            });
        });
    });
});