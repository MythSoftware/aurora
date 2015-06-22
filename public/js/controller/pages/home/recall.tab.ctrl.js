auroraApp.controller('RecallTabCtrl', function($scope, $controller, $routeParams, recallService) {
  angular.extend(this, $controller('LoadableMixin', {$scope: $scope}));

  var _recallStore, _subIds, _expanded, _fetchingNext,
    _scrollDetector, _fetchedSome, _scrollDetectorSubIds, _noMore,
    _critSubIds;

  $scope.init = function () {
    $scope.$on("$destroy", destroy);
    _subIds = [];
    _critSubIds = [];
    _scrollDetectorSubIds = [];
    _expanded = [];
    _recallStore = new store.OpenFDACollectionStore({
      url: recallService.URL,
      params: {
        limit: recallService.LIMIT,
        search: getSearchString()
      }
    });
    _scrollDetector = new util.ScrollDetector();
    _scrollDetectorSubIds.push(_scrollDetector.subscribe(util.ScrollEvent.SCROLL_TO_BOTTOM, fetchNext));
    _subIds.push(_recallStore.subscribe(store.Event.FETCH, handleFetch));
    _subIds.push(_recallStore.subscribe(store.Event.ERROR, handleError));
    _critSubIds.push(recallService.subscribe(recallService.Event.UPDATE_CRIT, handleUpdateCrit));
    _recallStore.fetch();
  };

  var destroy = function () {
    _recallStore.unsubscribe(_subIds);
    recallService.unsubscribe(_critSubIds);
    _scrollDetector.unsubscribe(_scrollDetectorSubIds);
    _scrollDetector.destroy();
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

  var handleUpdateCrit = function () {
    _fetchedSome = false;
    _recallStore.refresh();
    _recallStore.getParams().search = getSearchString();
    _recallStore.fetch();
  };

  var getSearchString = function () {
    return recallService.getSearchString(getActiveTab());
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

  $scope.isFetchingNext = function () {
    return _fetchingNext;
  };

  $scope.isFetchedSome = function () {
    return _fetchedSome;
  };

  var handleFetch = function () {
    _fetchingNext = false;
    _fetchedSome = true;;
    $scope.setLoading(false);
    $scope.$apply();
  };

  var handleError = function () {
    _fetchingNext = false;
    _noMore = true;
    $scope.setLoading(false);
    $scope.$apply();
  };

  var fetchNext = function () {
    if (_fetchingNext || _noMore) return;
    _fetchingNext = true;
    _recallStore.fetchNext();
    $scope.$apply();
  };

});
