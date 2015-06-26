/**
 * Created by kshah on 6/26/15.
 */

function drawUSMap() {

    var dataArray = new Array(50);

    var i = 1;

    dataArray[0] = ['State', 'Total', 'Class 1', 'Class 2', 'Class 3'];

    for(state in StateHash) {
        var class1 = Math.floor(Math.random() * 1000);
        var class2 = Math.floor(Math.random() * 1000);
        var class3 = Math.floor(Math.random() * 1000);

        dataArray[i] = [StateHash[state], class1 + class2 + class3, class1, class2, class3];

        //dataArray[i].name = StateHash[state];
        //dataArray[i].total = class1 + class2 + class3;
        //dataArray[i].class1 = class1;
        //dataArray[i].class2 = class2;
        //dataArray[i].class3 = class3;

        i++
    }

    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        region: 'US', // North America
        colorAxis: {colors: ['#00853f', 'yellow', '#e31b23']},
        //backgroundColor: '#81d4fa',
        //datalessRegionColor: '#f8bbd0',
        resolution: "provinces",
        defaultColor: '#f5f5f5',
        enableRegionInteractivity: 'true',
        //width: 600,
    };


    var chart = new google.visualization.GeoChart(document.getElementById('usmap'));

    google.visualization.events.addListener(chart, 'regionClick', clickHandler);

    chart.draw(data, options);
};

function clickHandler(event) {
    alert(event.region);
};
