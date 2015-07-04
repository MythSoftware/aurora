auroraApp.factory('recallService', function () {

  var _showGraph = false;

  var service = {};
  angular.extend(service, new Pubsubable());
  angular.extend(service, Pubsubable.prototype);

  service.LIMIT = 50;
  service.URL = 'https://api.fda.gov/food/enforcement.json';
  service.API_KEY = 'hxSIUuPHE4TVRPHL13ATQyUUfGg0c1eePomd20Ts';

  var _countMap = {};

  var ONE_WEEK = 604800000;

  service.Event = {
    FETCH_COUNT:'FETCH_COUNT',
    FETCH_COUNT_ERROR:'FETCH_COUNT_ERROR',
    UPDATE_CRIT:'UPDATE_CRIT',
    SHOW_GRAPH:'SHOW_GRAPH',
    FETCH_NATIONAL_COUNT:'FETCH_NATIONAL_COUNT',
    FETCH_NATIONAL_COUNT_ERROR:'FETCH_NATIONAL_COUNT_ERROR'
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

  service.fetchNationwideCounts = function () {
    var promise;

    //Use 'NW' for "Nationwide" counts.
    promise = fetchCount(null);

    $.when($, promise).then(
        function () {
          service.publish(service.Event.FETCH_NATIONAL_COUNT);
        },
        function(res) {
          service.publish(service.Event.FETCH_NATIONAL_COUNT_ERROR, res);
        }
    );
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

    if (stateAbbr) {
      str += '(distribution_pattern:' + stateAbbr + '+"' + StateHash[stateAbbr].replace(' ', '+') + '")+AND+';
    }
    now = Date.now();
    from = now - millisToSubtract;
    fromStr = moment(from).format('YYYYMMDD');
    toStr = moment(now).format('YYYYMMDD');
    str += 'recall_initiation_date:[' + fromStr + '+TO+' + toStr +']';
    classText = getClassificationText();
    if (classText) {
      str += '+AND+classification:' + classText;
    }
    return str;
  };

  service.getStateCount = function (stateAbbr) {
    if(stateAbbr in _countMap) {
      return _countMap[stateAbbr];

    } else {

      return 0;
    }

  };

  service.isShowingGraph = function () {
    return _showGraph;
  };

  service.toggleGraph = function () {
    _showGraph = !_showGraph;
    if (_showGraph) {
      service.publish(service.Event.SHOW_GRAPH);
    }
    else {
      $('#graph-container').css('max-height', 0);
    }
  };

  service.buildAllStates = function () {
    var key;
    var allStates = [];
    for (key in StateHash.reverse) {
      allStates.push(StateHash.reverse[key]);
    }

    return allStates;
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

    url = service.URL + "?api_key=" + service.API_KEY + '&search=' + service.getSearchString(abbr);

    if(abbr == null) {
      url += '&count=distribution_pattern';
    }

    httpUtil.ajax(
      'GET',
      url,
      null,
      function (res) {

        var national = 0;

        if(abbr) {
          _countMap[abbr] = res.meta.results.total;

        } else {

          //Initialize the countMap with all states set to zero so that the national numbers get added to them
          //appropriately.

          angular.forEach(StateHash, function (value, key) {
            if(key != 'reverse') {
              _countMap[key] = 0;
            }
          });

          res.results.forEach(function (value) {

            var term = value.term.toUpperCase();

            if(term in StateHash) {

              _countMap[term] = value.count;

            } else if(_.startCase(term) in StateHash.reverse) {

              _countMap[StateHash.reverse[_.startCase(term)]] = value.count;
            } else if(term.toLowerCase() == 'national' || term.toLowerCase() == 'worldwide') {
              national += value.count;
            }

          });

          //Now add the national counts to all the states.
          angular.forEach(_countMap, function (value, key) {
            _countMap[key] += national;
          });
        }

        d.resolve(res);
      },
      function (res) {

        if(abbr) {
          _countMap[abbr] = 0;
        }

        d.resolve(res);
      }
    );
    return d.promise();
  };


  return service;
});
