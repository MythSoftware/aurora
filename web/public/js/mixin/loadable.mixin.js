auroraApp.controller('LoadableMixin', function($scope) {
  
  var _loading = true;

  $scope.setLoading = function (loading) {
    _loading = loading;
  };

  $scope.isLoading = function () {
    return _loading;
  };

});
