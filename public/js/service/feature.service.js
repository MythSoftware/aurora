auroraApp.factory('featureService', function () {

  // quick and dirty
  // "_features" needs to a database
  var _features = ({
    alerts: function () {
      return false;
    },
    feedback: function () {
      return false;
    },
    contacts: function(){
      return true;
    }
  });

  var service = {};

  service.hasFeature = function (feature) {
    if (!_features[feature]) {
      return true;
    }
    return _features[feature]();
  };

  return service;
});
