
module.exports = {
    'Demo test Google' : function (client) {
        client
            .url('http://aurora.mythsoftware.com/about')
            .pause(1000);

            client.expect.element('body').to.be.present.before(1000);

            client.end();
        }
    };