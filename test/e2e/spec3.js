var url = require('./config').url;

describe('DRE frontend', function() {
  
  it('should have a title', function() {
    browser.get(url);

    expect(browser.getTitle()).toEqual('My PHR');
  });

  it ('log out', function() {
    browser.get(url);

  	var uresName = element(by.id('login'));
  	uresName.clear();
  	uresName.sendKeys('test');
  	var password = element(by.id('password'));
  	password.clear();
  	password.sendKeys('testtest');

//browser.sleep(10000);
  	element(by.id('main-login-btn')).click().then(function() {

      expect(browser.getTitle()).toEqual('My PHR | Home');

      var dropdown = ($('[data-toggle="dropdown"]'));
      dropdown.click();

      var logout = element(by.cssContainingText('a', 'Log out'));

      //browser.sleep(10000);
      logout.click();

      expect(browser.getTitle()).toEqual('My PHR');
    });
  });
});