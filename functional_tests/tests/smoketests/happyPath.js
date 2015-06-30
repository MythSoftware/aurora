var chai = require('chai');
var expect = chai.expect;

module.exports = {
    'Verify Aurora is up and Live' : function (browser) {
        browser
            .url('aurora.mythsoftware.com/')
            .waitForElementVisible("#crit-navbar", 1000)
            .assert.title('Aurora')
            .assert.containsText('body', 'Track food threats near you')
            .pause(1000)
            .click("#crit-navbar .date-ranges .dropdown-toggle")
            .waitForElementVisible(".date-ranges .dropdown-menu .ng-binding[ng-click=\"selectWhen(\'FIVE_YEARS\')\"]", 1000)
    },

    'Select the month and verify' : function (browser) {
        browser
            .click(".date-ranges .dropdown-menu .ng-binding[ng-click=\"selectWhen(\'MONTH\')\"]")
            .waitForElementVisible("button[data-toggle=\"dropdown\"] ", 1500)
    },
    'Select State dropdown' : function (browser) {
        browser
            .assert.containsText("button[data-toggle=\"dropdown\"] ", "Select State")
            .click("button[data-toggle=\"dropdown\"] ")
            .waitForElementVisible("ul.dropdown-menu .ng-scope a[href=\"/VA\"]", 1500)
            .assert.containsText("ul.dropdown-menu .ng-scope a[href=\"/VA\"]", "Virginia")

    },
    'Select State VA and wait for results' : function (browser) {
        browser
            .click("ul.dropdown-menu .ng-scope a[href=\"/VA\"]")
            .waitForElementVisible("ul.nav.nav-tabs a[href=\"/VA\"] span.stateDropdown", 3000)
            .assert.containsText("ul.nav.nav-tabs a[href=\"/VA\"] span.stateDropdown", "Virginia")
            .end();
    }
};
