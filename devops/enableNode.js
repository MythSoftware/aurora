var pkgcloud = require('pkgcloud');

var username = process.argv[2];
var apiKey = process.argv[3];
var loadBalancerId = process.argv[4];
var serviceNet = process.argv[5];

var handleError = function (err) {
  if (!err) return;
  console.log('Damn It!! ' + err);
  process.exit(1);
};

if (!username || !apiKey || !loadBalancerId || !serviceNet) {
  handleError('Usage: node /path/to/enableNode.js <rackspace_username> <api_key> <loadBalancerId> <serviceNet>');
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

var nodeToEnable = {
  address: serviceNet,
  port: 8888,
  condition: 'ENABLED', // also supports 'DISABLED' & 'DRAINING'
  type: 'PRIMARY' // use 'SECONDARY' as a fail over node
};

client.getLoadBalancer(loadBalancerId, function(err, loadBalancer) {
  
  handleError(err);

  var existingNode = getNode(loadBalancer, serviceNet);

  if (!existingNode) {
    client.addNodes(loadBalancer, nodeToEnable, function (err, enabledNode) {
      handleError(err);
      console.log('new load balancer node added');
      process.exit(0);
    });
  } else {
    existingNode.condition = 'ENABLED';
    client.updateNode(loadBalancer, existingNode, function (err, enabledNode) {
      handleError(err);
      console.log('existing load balancer node set to ENABLED');
      process.exit(0);
    });
  }

});