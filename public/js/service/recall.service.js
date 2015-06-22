auroraApp.factory('recallService', function () {

  var service = {};
  angular.extend(service, new Pubsubable());
  angular.extend(service, Pubsubable.prototype);

  service.LIMIT = 50;
  service.URL = 'https://api.fda.gov/food/enforcement.json';

  var _countMap = {};

  service.Event = {
    FETCH_COUNT:'FETCH_COUNT',
    FETCH_COUNT_ERROR:'FETCH_COUNT_ERROR'
  };

  service.fetchCounts = function (stateAbbrArr) {
    var promises;

    promises = [];

    stateAbbrArr.forEach(function (abbr) {
      promises.push(fetchCount(abbr));
    });

    $.when.apply($, promises).then(
      function () {
        service.publish(service.Event.FETCH_COUNT);
      },
      function(res) {
        service.publish(service.Event.FETCH_COUNT_ERROR, res);
      }
    );
  };

  service.getSearchString = function (stateAbbr) {
    return 'distribution_pattern:' + stateAbbr + '+' + StateHash[stateAbbr];
  };

  service.getStateCount = function (stateAbbr) {
    return _countMap[stateAbbr];
  };

  var fetchCount = function (abbr) {
    var d, url;
    d = $.Deferred();
    url = service.URL + '?search=' + service.getSearchString(abbr);
    httpUtil.ajax(
      'GET',
      url,
      null,
      function (res) {
        _countMap[abbr] = res.meta.results.total;
        d.resolve(res);
      },
      function (res) {
        d.reject(res);
      }
    );
    return d.promise();
  };

  return service;
});
