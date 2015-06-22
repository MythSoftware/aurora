var pkgcloud = require('pkgcloud');

var username = process.argv[2];
var apiKey = process.argv[3];
var loadBalancerId = process.argv[4];
var serviceNet = process.argv[5];

var SECONDS_TO_WAIT = 10;

var tries = 0;

var handleError = function (err) {
  if (!err) return;
  console.log('Damn It!! ' + err);
  if (tries > 4) {
    process.exit(1);
  }
  else {
    setTimeout(function () {
      console.log('Retry after error.');
      doIt();
    }, 2000);
  }
};

if (!username || !apiKey || !loadBalancerId || !serviceNet) {
  handleError('Usage: node /path/to/enableNode.js <username> <api_key> <loadBalancerId> <serviceNet>');
}

var client = pkgcloud.loadbalancer.createClient({
  provider: 'rackspace',
  username: username,
  apiKey: apiKey,
  service: 'compute',
  region: 'ORD'
});

var getNode = function (loadBalancer, serviceNetIp) {
  if (!loadBalancer) {
    handleError('loadBalancer not found');
  }
  if (!loadBalancer.nodes) {
    handleError('loadBalancer.nodes is null or undefined');
  }
  if (!Array.isArray(loadBalancer.nodes)) {
    handleError('loadBalancer.nodes must be an array');
  }
  for (var i = 0; i < loadBalancer.nodes.length; i++) {
    var n = loadBalancer.nodes[i];
    if (n.address == serviceNetIp) {
      return n;
    }
  }
  return false;
};

var doIt = function () {

  client.getLoadBalancer(loadBalancerId, function(err, loadBalancer) {
    
    handleError(err);

    if (!loadBalancer) {
      handleError('load balancer not found');
    }

    var existingNode = getNode(loadBalancer, serviceNet);

    if (!existingNode) {
      // nothing to drain
      console.log('node not found - nothing to do');
      process.exit(0);
    }

    if (existingNode.condition != 'ENABLED') {
      console.log('node not enabled - nothing to do');
      process.exit(0);
    }

    existingNode.condition = 'DRAINING';
    client.updateNode(loadBalancer, existingNode, function (err, enabledNode) {
      handleError(err);
      console.log('existing load balancer node set to DRAINING');
      setTimeout(function() {
        console.log('waited long enough');
        process.exit(0);
      }, SECONDS_TO_WAIT * 1000);
    });

  });

};

doIt();
