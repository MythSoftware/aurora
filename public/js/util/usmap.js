/**
 * Created by kshah on 6/26/15.
 */

function drawUSMap() {

    var dataArray = new Array(50);

    var i = 1;

    dataArray[0] = ['State', 'Recalls'];

    for(state in StateHash) {

        if(state.length != 2) {
            break;
        }

        var total = Math.floor(Math.random() * 1000);
        //var class2 = Math.floor(Math.random() * 1000);
        //var class3 = Math.floor(Math.random() * 1000);

        dataArray[i] = [StateHash[state], total];

        //dataArray[i].name = StateHash[state];
        //dataArray[i].total = class1 + class2 + class3;
        //dataArray[i].class1 = class1;
        //dataArray[i].class2 = class2;
        //dataArray[i].class3 = class3;

        i++
    }

    var data2 = google.visualization.arrayToDataTable([
        ['State',   'Class 1', 'Class 2'],
        ['Virginia', 36, 243], ['US-MD', 245, 25], ['US-WV', 6, 12], ['US-NC', 124, 54], ['US-CA', 0, 500]
    ]);

    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        region: 'US', // North America
        colorAxis: {colors: ['#00853f', 'yellow', '#e31b23']},
        //backgroundColor: '#81d4fa',
        //datalessRegionColor: '#f8bbd0',
        resolution: "provinces",
        defaultColor: '#f5f5f5',
        enableRegionInteractivity: 'true',
        legend: 'none',
        //width: 600,
    };


    var chart = new google.visualization.GeoChart(document.getElementById('usmap'));

    google.visualization.events.addListener(chart, 'regionClick', clickHandler);

    window.addEventListener("resize", function() {
        chart.draw(data, options);
    });

    chart.draw(data, options);
};

function clickHandler(event) {
    alert(event.region);
};
