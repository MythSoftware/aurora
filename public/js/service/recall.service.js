auroraApp.factory('recallService', function () {

  var service = {};
  angular.extend(service, new Pubsubable());
  angular.extend(service, Pubsubable.prototype);

  service.LIMIT = 50;
  service.URL = 'https://api.fda.gov/food/enforcement.json';

  var _countMap = {};
  var ONE_WEEK = 604800000;

  service.Event = {
    FETCH_COUNT:'FETCH_COUNT',
    FETCH_COUNT_ERROR:'FETCH_COUNT_ERROR',
    UPDATE_CRIT:'UPDATE_CRIT'
  };

  service.criteria = {
    when: 'YEAR',
    classification: 'ALL',
    search: ''
  };

  service.updateCriteria = function (key, value) {
    service.criteria[key] = value;
    service.publish(service.Event.UPDATE_CRIT, service.criteria);
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
    var str, millisToSubtract, from, fromStr, now, classText;

    millisToSubtract = getNumberOfWeeks() * ONE_WEEK;
    str = '';
    if (service.criteria.searchQuery) {
      str += 'product_description:' + service.criteria.searchQuery.replace(new RegExp(' ', 'g'), '+') + '+AND+';
    }
    str += '(distribution_pattern:' + stateAbbr + '+' + StateHash[stateAbbr] + ')';
    now = Date.now();
    from = now - millisToSubtract;
    fromStr = moment(from).format('YYYYMMDD');
    toStr = moment(now).format('YYYYMMDD');
    str += '+AND+recall_initiation_date:[' + fromStr + '+TO+' + toStr +']';
    classText = getClassificationText();
    if (classText) {
      str += '+AND+classification:' + classText;
    }
    console.log('str ' + str);
    return str;
  };

  service.getStateCount = function (stateAbbr) {
    return _countMap[stateAbbr];
  };

  var getClassificationText = function () {
    switch (service.criteria.classification) {
      case 'CLASS_I':
        return '"Class+I"';
      case 'CLASS_II':
        return '"Class+II"';
      case 'CLASS_III':
        return '"Class+III"';
      default:
        return null;
    }
  };

  var getNumberOfWeeks = function () {
    switch (service.criteria.when) {
      case 'MONTH':
        return 4.34812;
      case 'SIX_MONTHS':
        return 26;
      case 'YEAR':
        return 52;
      case 'FIVE_YEARS':
        return 260;
      default:
        return 1;
    }
  };

  var fetchCount = function (abbr) {
    var d, url;
    d = $.Deferred();
    var form = {
      search: service.getSearchString()
    }
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
        _countMap[abbr] = 0;
        d.resolve(res);
      }
    );
    return d.promise();
  };

  return service;
});
