auroraApp.controller('UsersCtrl', function($scope, $controller) {
  angular.extend(this, $controller('LoadableMixin', {$scope: $scope}));

  var _usersStore, _subscriptionIds;

  _subscriptionIds = [];

  _usersStore = new store.CollectionStore({
    url: '/proxy/users'
  });

  _usersStore.subscribe(store.Event.FETCH, function (res) {
    if ($scope.isLoading()) {
      $scope.setLoading(false);
      $scope.$apply();
    }
  });

  // we can do this later (no need now)
  // _usersStore.startPolling();
  _usersStore.fetch();

  $scope.getUsers = function () {
    return _usersStore.getCollection();
  };

  $scope.$on("$destroy", function() {
    _usersStore.unsubscribe(_subscriptionIds);
  });

});
