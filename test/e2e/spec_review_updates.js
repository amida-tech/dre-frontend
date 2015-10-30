var url = require('./config').url;
var shoot = require('./config').shoot;

var tails = ['', 'observation', 'medicationorder', 'medicationdispense', 'documentreference', 'condition',
    'immunization', 'allergyintolerance', 'medicationstatement', 'practitioner', 'encounter', 'medication'];

describe('DRE frontend', function () {


    beforeAll(function () {
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

    afterAll(function () {
        browser.get(url + 'home');
        var dropdown = ($('[data-toggle="dropdown"]'));
        dropdown.click();
        var logout = element(by.cssContainingText('a', 'Log out'));
        logout.click();
    });


    it('should have review updates', function () {

        var review = element(by.css('[ui-sref="record.review"]'));
        review.click().then(function () {
            browser.waitForAngular();
           // shoot('review');

            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/');
        });
    });

    it('should have review updates test result', function () {

        var testResults = element(by.cssContainingText('a', 'Test Results'));
        testResults.click().then(function () {
            browser.waitForAngular();
            //shoot('testResults');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/observation');

        });
    });
    it('should have review updates medications order', function () {

        var medicationOrder = element(by.cssContainingText('a', 'Medications'));
        medicationOrder.click().then(function () {
            browser.waitForAngular();
            //shoot('medicationorder');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/medicationorder');

        });
    });
    it('should have review updates medication dispense', function () {

        var medicationDispense = element(by.cssContainingText('a', 'Medication Dispense'));
        medicationDispense.click().then(function () {
            browser.waitForAngular();
            //shoot('medicationdispense');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/medicationdispense');

        });
    });
    it('should have review updates document referencee', function () {

        var documentReference = element(by.cssContainingText('a', 'Document Reference'));
        documentReference.click().then(function () {
            browser.waitForAngular();
            //shoot('documentreference');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/documentreference');

        });
    });
    it('should have review updates condition', function () {

        var condition = element(by.cssContainingText('a', 'Condition'));
        condition.click().then(function () {
            browser.waitForAngular();
            //shoot('condition');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/condition');

        });
    });
    it('should have review updates immunization', function () {

        var immunization = element(by.cssContainingText('a', 'Immunization'));
        immunization.click().then(function () {
            browser.waitForAngular();
            //shoot('immunization');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/immunization');

        });
    });
    it('should have review updates allergy intolerance', function () {

        var allergyIntolerance = element(by.cssContainingText('a', 'Allergies'));
        allergyIntolerance.click().then(function () {
            browser.waitForAngular();
            //shoot('allergyintolerance');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/allergyintolerance');

        });
    });
    it('should have review updates medication statement', function () {

        var medicationStatement = element(by.cssContainingText('a', 'Medication Statement'));
        medicationStatement.click().then(function () {
            browser.waitForAngular();
            //shoot('medicationstatement');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/medicationstatement');

        });
    });
    it('should have review updates practitioner', function () {

        var practitioner = element(by.cssContainingText('a', 'Practitioner'));
        practitioner.click().then(function () {
            browser.waitForAngular();
            //shoot('practitioner');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/practitioner');

        });
    });
    it('should have review updates encounter', function () {

        var encounter = element(by.cssContainingText('a', 'Encounter'));
        encounter.click().then(function () {
            browser.waitForAngular();
            //shoot('encounter');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/encounter');

        });
    });
    it('should have review updates medication', function () {

        var medication = element(by.cssContainingText('a', 'Medication ('));

        medication.click().then(function () {
            browser.waitForAngular();
            //shoot('medication');
            expect(browser.getCurrentUrl()).toEqual(url + 'home/record/review/medication');

        });
    });
});
