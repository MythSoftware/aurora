auroraApp.controller('RecallTabCtrl', function($scope, $controller, $routeParams) {
  angular.extend(this, $controller('LoadableMixin', {$scope: $scope}));

  var _recallStore, _subIds, _expanded;

  $scope.init = function () {
    $scope.$on("$destroy", destroy);
    _subIds = [];
    _expanded = [];
    _recallStore = new store.OpenFDACollectionStore({
      url: 'https://api.fda.gov/food/enforcement.json',
      params: {
        limit: 50,
        search: getSearchString()
      }
    });
    _subIds.push(_recallStore.subscribe(store.Event.FETCH, handleFetch));
    _subIds.push(_recallStore.subscribe(store.Event.ERROR, handleError));
    _recallStore.fetch();
  };

  var destroy = function () {
    _recallStore.unsubscribe(_subIds);
  };

  $scope.isExpanded = function (recall) {
    return _expanded.indexOf(recall) >= 0;
  };

  $scope.toggleExpand = function (recall) {
    var idx = _expanded.indexOf(recall);
    if (idx < 0) {
      _expanded.push(recall);
    }
    else {
      _expanded.splice(idx, 1);
    }
  };

  var getSearchString = function () {
    return 'distribution_pattern:' + getActiveTab() + '+' + StateHash[getActiveTab()];
  };

  var getActiveTab = function () {
    return localStorage['activeTab'];
  };

  $scope.getRecallStore = function () {
    return _recallStore;
  };

  $scope.getClassificationClass = function (recall) {
    if (recall.classification == 'Class III') {
      return 'label-danger';
    }
    if (recall.classification == 'Class II') {
      return 'label-warning';
    }
    if (recall.classification == 'Class I') {
      return 'label-success';
    }
    return 'label-default';
  };

  $scope.fromNow = function (d) {
    return moment(d, "YYYYMMDD").fromNow();
  };

  var handleFetch = function () {
    $scope.setLoading(false);
    $scope.$apply();
  };

  var handleError = function () {
    _recallStore.setCollection([]);
    $scope.setLoading(false);
    $scope.$apply();
  };

});
