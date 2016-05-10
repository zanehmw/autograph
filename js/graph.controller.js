"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .controller("graphController", [
  "$http",
  GraphControllerFunction])

  function GraphControllerFunction($http){
    var graphVm = this;
    $('.container').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Results'
        },
        subtitle: {
            text: 'Source: None'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Mileage'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            min: 0,
            max: 200000
        },
        yAxis: {
            title: {
                text: 'Price (USD)'
            },
            min: 0,
            max: 200000
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'Mileage: {point.x}, Price: {point.y}'
                }
            }
        },
        series: [{
            regression: true ,
            regressionSettings: {
           			name: 'Average Market Value',
                type: 'linear',
                color:  'rgba(223, 83, 83, .9)'
            },
            name: 'Car',
            color: 'rgba(223, 83, 83, .5)',
            data: [[1610, 51000], [16000, 59000], [15900, 49000], [157000, 63000], [155000, 200000],
                [170000, 59000], [159000, 47000], [166000, 69000], [176000, 66000], [100000, 75000],
                [172000, 55000], [170000, 54000], [172000, 20000], [153000, 42000], [160000, 50000],
                [147000, 49000], [168000, 49000], [175000, 73000], [157000, 17000], [167000, 68000],
                [176000, 71000], [164000, 55000], [160000, 48000], [174000, 166000], [163000, 67000]]

        }]
    })
      }
}());
