auroraApp.controller('FeatureMixin', function ($scope, featureService) {
  
  $scope.hasFeature = function (feature) {
    return featureService.hasFeature(feature);
  };

});
