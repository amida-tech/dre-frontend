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

    it('add medication', function () {
        var record = element(by.css('[ui-sref="record"]'));
        record.click();
        shoot('record');
        expect(browser.getCurrentUrl()).toEqual(url + 'home/record');

        var recordMedications = element(by.css('[ui-sref="record.medications"]'));
        recordMedications.click();

        var addMedication = element(by.cssContainingText('button', 'Add Medication'));
        shoot('addmedication');
        addMedication.click();
        var overTheCounter = element(by.cssContainingText('button', 'Over the Counter'));
        shoot('addmedication');
        overTheCounter.click();
        var drugName = element(by.model('model.query'));
        drugName.sendKeys('Mucinex');
        var search = element(by.cssContainingText('button', 'Search'));

        shoot('medication1');

        search.click();
        var medType = element(by.model('model.drug.$'));
        medType.element(by.cssContainingText('option', 'Oral Tablet')).click().then(function () {
            var select = element(by.css('[ng-click="selectDrug()"]'));
            shoot('addmedication2');
            select.click();

            shoot('medication3');

            var nextBtn = element(by.cssContainingText('button', 'Next'));
            shoot('addmedication4');

            nextBtn.click();
            var date = element(by.model('resultDate'));
            date.sendKeys('10/20/2015');
            var dose = element(by.model('model.drugNote'));
            dose.sendKeys('1 pill');
            browser.sleep(3000);
            var btnNext = element(by.css('[ng-click="next()"]'));
            shoot('addmedication5');

            btnNext.click();
            var submit = element(by.css('[ng-click="saveMedication()"]'));
            shoot('addmedication6');

            submit.click();
            browser.sleep(3000);
            var newMedication = element(by.cssContainingText('span', 'I12 HR Guaifenesin 1200 MG Extended Release Oral Tablet [Mucinex]'));

            expect(newMedication != null).toBeTruthy();
        });
    });
});