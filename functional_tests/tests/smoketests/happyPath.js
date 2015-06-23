module.exports = {
    'Verify Aurora is up and Live' : function (browser) {
        browser
            .url('http://aurora.mythsoftware.com/')
            .waitForElementVisible('#crit-navbar', 1000)
            .assert.title('Aurora')
            .assert.containsText('body', 'Track food threats near you')
            .pause(1000)
            .assert.containsText("button[data-toggle=\"dropdown\"] ", "Select State")
            .click("#crit-navbar .dropdown-toggle")
            .pause(1000)
            //.assert.containsText("button[data-toggle=\"dropdown\"] ", "Select State")
            .end();
    }
};
