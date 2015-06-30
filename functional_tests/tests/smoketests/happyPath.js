var chai = require('chai');
var expect = chai.expect;

module.exports = {
    'Verify Aurora is up and Live' : function (browser) {
        browser
            .url('http://aurora.mythsoftware.com/')
            .waitForElementVisible("#crit-navbar", 1000)
            .assert.title('Aurora')
            .assert.containsText('body', 'Track food threats near you')
            .pause(1000)
            .click("#crit-navbar .date-ranges .dropdown-toggle")
            .waitForElementVisible(".date-ranges .dropdown-menu .ng-binding[ng-click=\"selectWhen(\'FIVE_YEARS\')\"]", 1000)
    },

    'Select the month and verify' : function (browser) {
        browser
            .click(".date-ranges .dropdown-menu .ng-binding[ng-click=\"selectWhen(\'SIX_MONTHS\')\"]")
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
            .waitForElementVisible("span.badge", 1000)

    },
    'Get all elements' : function(browser) {
        browser
            .elements('css selector', 'div.text p', function (result) {
                for (var i in result.value) {
                    this.elementIdAttribute(result.value[i].ELEMENT, 'id', function (result) {
                        console.log(result.value);
                    });
                }
            })
    },

    'Checking recalls': function (browser) {

        browser.getText("span.badge", function(result) {
            //console.log( '>>>>>>>>>', result.value );
            //this is how you get the value of an element
            if (result.value > 0)
            browser
                 .waitForElementVisible("li.recall-li", 1000)
                 .click("span.glyphicon.glyphicon-remove")

            else
            browser
                .click("span.glyphicon.glyphicon-remove")
            })
    },
    'Checking remove button': function (browser){
        browser.getText("span.badge", function(result) {
            if (result.value > 0)
                browser
                    .waitForElementVisible("li.recall-li", 1000)
                    .end();
            else
                browser
                    .end();
        })

    }
};
