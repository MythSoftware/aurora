auroraApp.factory('featureService', function () {

  // quick and dirty
  // "_features" needs to be moved to a properties
  // file outside the project structure for different
  // environments
  var _features = {
    alerts: function () {
      return false;
    }
  };

  var service = {};

  service.hasFeature = function (feature) {
    if (!_features[feature]) {
      return true;
    }
    return _features[feature]();
  };

  return service;
});
