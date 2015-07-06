auroraApp.controller('LandingCtrl', function($scope, $http, $location, $controller, $routeParams, recallService, $window) {
    var _recallServiceSubIds, _allStates;
    $scope.show = false;
    $scope.init = function() {
        _recallServiceSubIds = [];
        _recallServiceSubIds.push(recallService.subscribe(recallService.Event.UPDATE_CRIT, fetchCounts));
        _recallServiceSubIds.push(recallService.subscribe(recallService.Event.FETCH_NATIONAL_COUNT, handleFetchCount));
        _recallServiceSubIds.push(recallService.subscribe(recallService.Event.FETCH_NATIONAL_COUNT_ERROR, handleFetchCount));

        _allStates = recallService.buildAllStates();


        fetchCounts();

        angular.element($window).on('resize', function () {
            var stateSvg = document.getElementById("statesvg");
            stateSvg.viewbox = "0,0," + stateSvg.parentNode.clientHeight + "," + stateSvg.parentNode.clientWidth;
        });
    };

    $scope.findState = function() {
        var param =  {
            params: {
                zip: this.zipCode
            }
        };
        console.log("param object is "+ param);
        $http.get('/api/ziptostate', param).
            success(function(data, status, headers, config) {
                if(data.state === "no matching state"){
                    $scope.zipCode = null;
                    $scope.show = true;
                }
                else {
                    $scope.show = false;
                    var host = $location.host();
                    var port = $location.port();

                    if(port != 80 || port != 443){
                        host = location.host;  // get port
                        $window.location.href =  ' http://' + host +'/recalls/' + data.state;
                    }
                    $window.location.href =  ' http://' + host +'/recalls/' + data.state;
                }
             }).
            error(function(data, status, headers, config) {
                alert("Connection error");
            });;
    };

    //Private
    function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
        return "<h4>"+n+"</h4><table>"+
            "<tr><td>Total</td><td>"+(d.total)+"</td></tr>"+
            "</table>";
    }


    $scope.drawD3Map = function () {

        var max = 0;

        _allStates.forEach(function(value) {
            max = max < recallService.getStateCount(value) ? recallService.getStateCount(value) : max;
        });

        var mapData ={};	/* Sample random data. */
        ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
            "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
            "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
            "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
            "WI", "MO", "AR", "OK", "KS", "LA", "VA"]
            .forEach(function(state){

                var total = recallService.getStateCount(state);

                mapData[state]={total: total};

                if(max != 0) {

                    var ratio = total / max;

                    if (ratio < .5) {
                        mapData[state].color = d3.interpolate("white", "yellow")(ratio * 2);
                    } else {
                        mapData[state].color = d3.interpolate("yellow", "red")(2*ratio - 1);
                    }
                } else {
                    mapData[state].color = "#FFFFFF";
                }

            });


        var stateSvg = document.getElementById("statesvg");
        stateSvg.viewbox = "0,0," + stateSvg.parentNode.clientHeight + "," + stateSvg.parentNode.clientWidth;

        /* draw states on id #statesvg */
        uStates.draw("#statesvg", mapData, tooltipHtml);
    }

    $scope.selectWhen = function (when) {
        recallService.updateCriteria('when', when);
    };

    $scope.selectClassification = function (classification) {
        recallService.updateCriteria('classification', classification);
    };

    var fetchCounts = function () {
        recallService.fetchNationwideCounts();
    };

    var handleFetchCount = function () {
        $scope.$apply();

        $scope.drawD3Map();
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

    $scope.getCriteria = function () {
        return recallService.criteria;
    };
});
