var url = require('./config').url;

require('protractor-linkuisref-locator')(protractor);

var randomName;

describe('DRE signUp', function() {
  
  it('signUp', function() {
  	browser.get(url);

  	var button = element(by.linkUiSref('register'));
    //var button = $('a').filter(function(index) { return $(this).text() === "Sign Up"; });
    button.click();

    expect(browser.getCurrentUrl()).toEqual(url + 'register');

    });

    /*it('userName', function() {
    	var userName = element(by.model('model.login'));
    	userName.clear();
    	userName.sendKeys('test');

    	expect($('[ng-message=uniqueUsername]').isDisplayed()).toBeTruthy(); 
    });*/

  
    it('register random user', function() {
    	browser.get(url + 'register');

    	var userName = element(by.name('login'));

    	while(true) {
    		randomName = 'test' + Math.floor((Math.random()*10000));
	    	userName.clear();
    		userName.sendKeys(randomName);
    		console.log(randomName);
    		//if(browser.wait($('[ng-message=uniqueUsername]').isDisplayed()))  {
    		//	continue;
    		//}
    		break;
    	}
    	
    	var email = element(by.model('model.email'));
    	email.clear();
    	email.sendKeys(randomName).then( function(){

	    	expect($('[ng-message="required, minlength, maxlength, email"]').isDisplayed()).toBeTruthy();

	   		email.clear();
	    	email.sendKeys(randomName + '@amida-demo.com').then(function() {

		   		expect($('[ng-message="required, minlength, maxlength, email"]').isPresent()).toBeFalsy();

		   		var password =element(by.model('model.password'));
		   		password.clear();
		   		password.sendKeys('tes').then(function(){

			   		expect($('[ng-message="required, minlength, maxlength"]').isDisplayed()).toBeTruthy();

			   		password.clear();
			   		password.sendKeys('testtest').then( function(){

				   		expect($('[ng-message=equals]').isDisplayed()).toBeTruthy();

				   		var confirmPassword =element(by.model('model.confirm'));
				   		confirmPassword.clear();
				   		confirmPassword.sendKeys('tes').then( function() {

					   		expect($('[ng-message="required, minlength, maxlength"]').isDisplayed()).toBeTruthy();

					   		confirmPassword.clear();
					   		confirmPassword.sendKeys('testtest').then( function(){

						   		expect($('[ng-message="required, minlength, maxlength"]').isPresent()).toBeFalsy();

						   		var button = element(by.buttonText('Next'));
						   		button.click();

						   		expect($('[ng-show="model.step == 2"]').isDisplayed()).toBeTruthy();

						   		var firstName = element(by.model('model.firstName'));
						   		firstName.clear();
						   		firstName.sendKeys('test');

						   		var middleName = element(by.model('model.middleName'));
						   		middleName.clear();
						   		middleName.sendKeys('test');

						   		var lastName = element(by.model('model.lastName'));
						   		lastName.clear();
						   		lastName.sendKeys('test');

						   		var birthDay = element(by.model('model.birthDay'));
						   		birthDay.clear();
						   		birthDay.sendKeys('03/12/1988');

						   		var gender = element(by.model('model.gender'));
	
								gender.element(by.cssContainingText('option', 'Female')).click();
						   		//gender.sendKeys('Female');

						   		var buttonNext = element.all(by.buttonText('Next')).get(1);
						   		buttonNext.click();	

						   		expect($('[ng-show="model.step == 3"]').isDisplayed()).toBeTruthy();
						   		browser.sleep(10000);
					   		})
			   			})				   		
			   		})
		   		})
	    	})
    	});
    });
});
