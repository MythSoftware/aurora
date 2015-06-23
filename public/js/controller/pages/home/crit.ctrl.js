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

  $scope.getClassificationLabel = function (classification) {
    switch (classification) {
      case 'ALL':
        return 'All Classifications';
      case 'CLASS_I':
        return 'Class I';
      case 'CLASS_II':
        return 'Class II';
      default:
        return 'CLASS III';
    }
  };

  $scope.selectWhen = function (when) {
    recallService.updateCriteria('when', when);
  };

  $scope.selectClassification = function (classification) {
    recallService.updateCriteria('classification', classification);
  };

});
