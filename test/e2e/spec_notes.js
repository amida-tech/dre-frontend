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


    it('should have my notes', function () {

        var notes = element(by.css('[ui-sref="notes"]'));
        notes.click();

        expect(browser.getCurrentUrl()).toEqual(url + 'home/notes/');
        shoot('note');
        var record = element(by.css('[ui-sref="record"]'));
        record.click();
        var medications = element(by.css('[ui-sref="record.medications"]'));
        medications.click().then(function () {

            var medication = element.all(by.cssContainingText('span', '12 HR Guaifenesin 1200 MG Extended Release Oral Tablet [Mucinex]')).first();

            var row = medication.element(by.xpath('ancestor::div[@class="panel panel-body"][last()]'));

            var medicationInfo = row.element(by.css('.medication-btn-info'));

            medicationInfo.click().then(function () {

                browser.sleep(3000);
                expect(element(by.css('.modal-content')).isDisplayed()).toBeTruthy();

                var setNotes = element(by.cssContainingText('button', 'Note'));
                shoot('note1');
                setNotes.click().then(function () {
                    var noteText = element(by.model('model.noteText'));
                    browser.sleep(5000);

                    noteText.sendKeys('new test note from test');
                    browser.sleep(5000);
                    shoot('note2');
                    var addNote = element(by.cssContainingText('button', 'Add Note'));

                    addNote.click();
                    var btnClose = element(by.cssContainingText('button', 'Close'));

                    btnClose.click();

                    browser.get(url + 'home/notes/');

                });
            });
        });
    });
});