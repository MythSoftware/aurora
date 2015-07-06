auroraApp.controller('LandingCtrl', function($scope, $http, $controller, $routeParams, recallService, $window) {
    var _recallServiceSubIds, _allStates;

    $scope.init = function() {
        _recallServiceSubIds = [];
        _recallServiceSubIds.push(recallService.subscribe(recallService.Event.UPDATE_CRIT, fetchCounts));
        _recallServiceSubIds.push(recallService.subscribe(recallService.Event.FETCH_NATIONAL_COUNT, handleFetchCount));

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
                console.log(data.state);
                window.location.href = 'http://localhost:8888/recalls/'+ data.state;
            }).
            error(function(data, status, headers, config) {

                // called asynchronously if an error occurs
                // or server returns response with an error status.
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

    var fetchCounts = function () {
        recallService.fetchNationwideCounts();
    };

    var handleFetchCount = function () {
        $scope.$apply();

        $scope.drawD3Map();
    };
});
