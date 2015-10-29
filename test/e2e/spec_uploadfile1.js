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

    it('upload another file', function () {

        var files = ($('[ui-sref="files"]'));
        files.click();

        expect(browser.getCurrentUrl()).toEqual(url + 'home/files');

        var uploadFile = element(by.cssContainingText('a.btn.btn-link', 'Upload File'));
        uploadFile.click();

        ($('input[type="file"]')).sendKeys("/Users/tatianashchelokova/Documents/dre-frontend/test/bluebutton-01-original.xml").then(function () {
            //($('#uploadButton')).click();
            var uploadBtn = element(by.cssContainingText('button', 'Continue'));
            uploadBtn.click();

            expect(browser.getCurrentUrl()).toEqual(url + 'home/files/upload');

            //browser.sleep(100000);

            browser.wait(function () {
                return browser.getCurrentUrl().then(function (aurl) {
                    return aurl === (url + 'home/files');
                })
            });

            expect(browser.getCurrentUrl()).toEqual(url + 'home/files');

        });
    });
});