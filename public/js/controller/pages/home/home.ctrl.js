auroraApp.controller('HomeCtrl', function($scope, $location, $routeParams) {
  var _stateTabs, _allStates;

  var init = function () {
    var abbr;
    buildAllStates();
    if (!localStorage['stateTabs']) {
      localStorage['stateTabs'] = '{}';
    }
    _stateTabs = alphabetizeByState(JSON.parse(localStorage['stateTabs']));
    if ($routeParams.state) {
      abbr = $routeParams.state.toUpperCase();
      if (abbr != 'ADD' && !StateHash[abbr]) {
        $location.path('/');
      }
      else if (abbr != 'ADD') {
        saveTabIfNotInStorage(abbr);
        localStorage['activeTab'] = abbr;
        _stateTabs = alphabetizeByState(JSON.parse(localStorage['stateTabs']));
      }
      else if (abbr == 'ADD' || !localStorage['activeTab']) {
        localStorage['activeTab'] = 'ADD';
      }
    }
  };

  var alphabetizeByState = function (obj) {
    var stateNames, stateTabs, abbr;
    stateTabs = {};
    stateNames = [];
    for (abbr in obj) {
      stateNames.push(StateHash[abbr]);
    }
    stateNames.sort();
    stateNames.forEach(function (name) {
      stateTabs[StateHash.reverse[name]] = name;
    });
    return stateTabs;
  };

  $scope.isAdding = function () {
    if (localStorage['activeTab'] == 'ADD' || !$routeParams || !localStorage['activeTab']) {
      return true;
    }
    if ($routeParams.state && $routeParams.state.toUpperCase() == 'ADD') {
      return true;
    }
    return false;
  };

  $scope.getStateTabs = function () {
    return Object.keys(_stateTabs);
  };

  $scope.isActive = function (tab) {
    return tab === localStorage['activeTab'];
  };

  $scope.getStateName = function (abbr) {
    return StateHash[abbr];
  };

  $scope.getAllStates = function () {
    return _allStates;
  };

  $scope.closeTab = function (abbr, e) {
    e.stopPropagation();
    e.preventDefault();
    delete _stateTabs[abbr];
    localStorage['stateTabs'] = JSON.stringify(_stateTabs);
    if (localStorage['activeTab'] == abbr) {
      gotoNextTab();
    }
  };

  var gotoNextTab = function () {
    var stateTabs, abbr, currentTab;
    stateTabs = alphabetizeByState(JSON.parse(localStorage['stateTabs']));
    hasNext = false;
    currentTab = localStorage['activeTab'];
    for (abbr in stateTabs) {
      if (abbr > currentTab) {
        $location.path('/' + abbr);
        return;
      }
    }
    $location.path('/add');
  };

  var buildAllStates = function () {
    var key;
    _allStates = [];
    for (key in StateHash.reverse) {
      _allStates.push(StateHash.reverse[key]);
    }
  };

  var tabExists = function (stateAbbr) {
    return !!_stateTabs[stateAbbr];
  };

  var saveTabIfNotInStorage = function (stateAbbr) {
    if (!tabExists(stateAbbr)) {
      _stateTabs[stateAbbr] = {state: stateAbbr}; // more info (like search options) will go here
      localStorage['stateTabs'] = JSON.stringify(_stateTabs);
    }
  };

  init();
});
