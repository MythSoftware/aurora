auroraApp.controller('CritCtrl', function($scope, recallService) {

  var _searching, _searchThrottle, _recallServiceSubIds;

  _searching = false;

  $scope.init = function () {
    $scope.$on("$destroy", destroy);
    $scope.searchQuery = recallService.criteria.searchQuery;
    _recallServiceSubIds = [];
    _searchThrottle = new util.Throttle(searchHelper);
    _recallServiceSubIds.push(recallService.subscribe(recallService.Event.FETCH_COUNT, handleFetchCount));
  };
  
  var destroy = function () {
    recallService.unsubscribe(_recallServiceSubIds);
  };

  $scope.getCriteria = function () {
    return recallService.criteria;
  };

  $scope.getWhenLabel = function (crit) {
    switch (crit) {
      case 'MONTH':
        return 'Past Month';
      case 'SIX_MONTHS':
        return 'Past 6 Months';
      case 'YEAR':
        return 'Past Year';
      case 'FIVE_YEARS':
       return 'Past 5 Years';
      default:
        return 'Past Week';
    }
  };

  $scope.getClassificationLabel = function (classification) {
    switch (classification) {
      case 'ALL':
        return 'All Classifications';
      case 'CLASS_I':
        return 'Class I';
      case 'CLASS_II':
        return 'Class II';
      default:
        return 'Class III';
    }
  };

  $scope.selectWhen = function (when) {
    recallService.updateCriteria('when', when);
  };

  $scope.selectClassification = function (classification) {
    recallService.updateCriteria('classification', classification);
  };

  $scope.isSearching = function () {
    return _searching;
  };

  $scope.search = function () {
    _searching = true;
    _searchThrottle.execute();
  };

  $scope.toggleGraph = function () {
    recallService.toggleGraph();
  };

  $scope.isShowingGraph = function () {
    return recallService.isShowingGraph();
  };

  var searchHelper = function () {
    recallService.updateCriteria('searchQuery', $scope.searchQuery);
  };

  var handleFetchCount = function () {
    _searching = false;
    $scope.$apply();
  };

  $scope.reset = function () {
     $scope.selectWhen('YEAR');
     $scope.selectClassification('ALL');
    $scope.searchQuery = null
    $scope.search();
  }

});
