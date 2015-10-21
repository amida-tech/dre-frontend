var url = require('./config').url;

describe('DRE frontend', function() {
  
  it('should have a title', function() {
    browser.get(url);

    expect(browser.getTitle()).toEqual('My PHR');
  });

  it ('upload another file', function() {
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

    var uploadFile = element(by.cssContainingText('button','Upload File'));
    uploadFile.click();

    ($('input[type="file"]')).sendKeys("bluebutton-cms.txt").then(function(){
    //($('#uploadButton')).click();
    var uploadBtn = element(by.cssContainingText('button','Continue'));
    uploadBtn.click();

    expect(browser.getCurrentUrl()).toEqual(url + 'home/files/upload');

        //browser.sleep(100000);

    browser.wait(function() {
        return browser.getCurrentUrl().then(function(url) {
          return url === (url + 'home/files');
        })
      });

    expect(browser.getCurrentUrl()).toEqual( url + 'home/files');


    });   
    
  });

});