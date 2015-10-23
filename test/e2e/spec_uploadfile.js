var url = require('./config').url;

describe('DRE frontend', function() {

    it('should upload file', function() {
        browser.get(url);

        var uresName = element(by.id('login'));
        uresName.clear();
        uresName.sendKeys('test');
        var password = element(by.id('password'));
        password.clear();
        password.sendKeys('testtest');


        element(by.id('main-login-btn')).click();

        browser.waitForAngular();

        expect(browser.getTitle()).toEqual('My PHR | Home');

        var files = ($('[ui-sref="files"]'));
        files.click();

        expect(browser.getCurrentUrl()).toEqual(url + 'home/files');

        var countBefore;
        var hundredButton = element(by.cssContainingText('button', '100'));

        hundredButton.click().then(function() {

            var candidates = element.all(by.xpath('//td[@data-title-text="Modified"]'));

            candidates.count().then(function(value) {
                countBefore = value;
            });
        });


        var uploadFile = element(by.cssContainingText('button', 'Upload File'));
        uploadFile.click();

        ($('input[type="file"]')).sendKeys("sbluebutton-01-original.xml").then(function() {

            //($('#uploadButton')).click();
            var uploadBtn = element(by.cssContainingText('button', 'Continue'));
            uploadBtn.click();

            expect(browser.getCurrentUrl()).toEqual(url + 'home/files/upload');

            browser.wait(function() {
                return browser.getCurrentUrl().then(function(url) {
                    return url === (url + 'home/files');
                })
            });

            expect(browser.getCurrentUrl()).toEqual(url + 'home/files');

            //browser.sleep(5000);

            hundredButton.click().then(function() {

                var candidates = element.all(by.xpath('//td[@data-title-text="Modified"]'));

                var countAfter;
                candidates.count().then(function(value) {
                    countAfter = value;

                    expect(countAfter - countBefore).toBe(1);

                });
                //browser.sleep(5000);
            });
        });
    });
});