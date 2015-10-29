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

    it('should upload file', function () {
        var files = ($('[ui-sref="files"]'));

        files.click();

        expect(browser.getCurrentUrl()).toEqual(url + 'home/files');
        shoot('upload1');
        var countBefore;
        var hundredButton = element(by.cssContainingText('button', '100'));

        hundredButton.click().then(function () {

            var candidates = element.all(by.xpath('//td[@data-title-text="Modified"]'));

            candidates.count().then(function (value) {
                countBefore = value;

                console.log(value);
                // browser.sleep(5000);


                var uploadFile = element(by.cssContainingText('a.btn.btn-link', 'Upload File'));
                shoot('upload2');
                uploadFile.click();

                ($('input[type="file"]')).sendKeys("/Users/tatianashchelokova/Documents/dre-frontend/test/bluebutton-01-original.xml").then(function () {
                    shoot('upload3');
                    //($('#uploadButton')).click();
                    var uploadBtn = element(by.cssContainingText('button', 'Continue'));

                    uploadBtn.click();

                    expect(browser.getCurrentUrl()).toEqual(url + 'home/files/upload');

                    // browser.sleep(5000);

                    browser.wait(function () {
                        return browser.getCurrentUrl().then(function (aurl) {
                            //console.log(aurl);
                            return aurl === (url + 'home/files');
                        })
                    });

                    expect(browser.getCurrentUrl()).toEqual(url + 'home/files');

                    //browser.sleep(10000);

                    hundredButton = element(by.cssContainingText('button', '100'));
                    hundredButton.click().then(function () {

                        var candidates = element.all(by.xpath('//td[@data-title-text="Modified"]'));

                        var countAfter;
                        candidates.count().then(function (value) {
                            countAfter = value;
                            console.log(value);
                            shoot('upload6');
                            expect(countAfter - countBefore).toBe(1);

                        });
                        //browser.sleep(5000);
                    });
                });
            });
        });
    });
})