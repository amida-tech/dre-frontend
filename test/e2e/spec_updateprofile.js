var url = require('./config').url;

describe('DRE frontend', function() {

    it('should update Profile', function() {
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

            var profile = element(by.cssContainingText('a', 'My Profile'));

            //browser.sleep(10000);
            profile.click();

            expect(browser.getCurrentUrl()).toEqual(url + 'home/profile');

            var editBtn = ($('[ng-click="changeEditProfileSection(false)"]'));
            editBtn.click();

            var firstName = element(by.id('inputFirst'));
            firstName.clear();
            firstName.sendKeys('Bella');

            var middleName = element(by.id('inputMiddle'));
            middleName.clear();
            middleName.sendKeys('Mary');

            var lastName = element(by.id('inputLast'));
            lastName.clear();
            lastName.sendKeys('Jonnes');

            var dateBirth = element(by.id('inputDateOfBirth'));
            //dateBirth.clear();
            dateBirth.sendKeys('04/23/1977');

            var gender = element(by.id('inputGender'));
            gender.element(by.cssContainingText('option', 'female')).click();

            var race = element(by.id('inputRace'));
            race.element(by.cssContainingText('option', 'White')).click();

            var ethnicity = element(by.id('inputEthnicity'));
            ethnicity.element(by.cssContainingText('option', 'Not Hispanic or Latino')).click();

            var MaritalStatus = element(by.id('inputMaritalStatus'));
            MaritalStatus.element(by.cssContainingText('option', 'Married')).click();



            var updateBtn = ($('[ng-click="updateProfile()"]'));
            updateBtn.click();

            browser.sleep(10000);

            expect($('[ng-click="updateProfile()"]').isDisplayed()).toBeFalsy();
        });
    });

    it('update Address', function() {
        var editAddress = ($('[ng-click="changeEditAddressSection(false)"]'));
        editAddress.click();

        var addressType = element(by.id('inputAddressType'));
        addressType.element(by.cssContainingText('option', 'temporary address')).click();

        var inputAddress = element(by.id('inputAddress'));
        inputAddress.clear();
        inputAddress.sendKeys('11430 Connecticut ave.');

        var inputCity = element(by.id('inputCity'));
        inputCity.clear();
        inputCity.sendKeys('Kensington');

        var inputState = element(by.id('inputState'));
        inputState.clear();
        inputState.sendKeys('MD');

        var inputZip = element(by.id('inputZip'));
        inputZip.clear();
        inputZip.sendKeys('20895');

        var updateAddressBtn = ($('[ng-click="updateAddress()"]'));
        updateAddressBtn.click();

        expect($('[ng-click="updateAddress()"]').isDisplayed()).toBeFalsy();
    });

    it('update Phone', function() {
        var editPhone = ($('[ng-click="changeEditPhoneSection(false)"]'));
        editPhone.click();

        var phoneType = element(by.id('inputPhoneType'));
        phoneType.element(by.cssContainingText('option', 'direct')).click();

        var inputPhone = element(by.id('inputPhone'));
        inputPhone.clear();
        inputPhone.sendKeys('3012243799');

        var updatePhoneBtn = ($('[ng-click="updatePhone()"]'));
        updatePhoneBtn.click().then(function() {
            expect($('[ng-click="updatePhone()"]').isDisplayed()).toBeFalsy();
        });
    });
});