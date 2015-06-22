auroraApp.controller('CritCtrl', function($scope, recallService) {

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
      default:
        return 'Past Week';
    }
  };

  $scope.selectWhen = function (when) {
    recallService.updateCriteria('when', when);
  };

});
