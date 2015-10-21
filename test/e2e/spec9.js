
/* no data in the maesurements chart */
var url = require('./config').url;

describe('DRE frontend', function() {
  
  it('should have a title', function() {
    browser.get(url);

    expect(browser.getTitle()).toEqual('My PHR');
  });

  it ('my allergies', function() {
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

    var record = element(by.css('[ui-sref="record"]'));
    record.click();

    expect(browser.getCurrentUrl()).toEqual(url + 'home/record');

    var recordAllergies = element(by.css('[ui-sref="record.allergies"]'));
    recordAllergies.click().then( function() {

    var allergies = element.all(by.binding('userTimelineEntry.title'));

    //console.log(medications);
    var count;
    allergies.count().then(function(value) {
        count = value;
    
    console.log ('--------------',count);

        expect( count >=1).toBeTruthy();
    
    });

    //console.log ('--------------',medications.length);

    //expect(medications.length > 0); 
  });
    });
  });
