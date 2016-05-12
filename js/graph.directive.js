(function(){
  angular
  .module('carGraphingApp')
  .directive('carGraph', function($http){
    return {
      templateUrl: 'autograph/js/graph.html',
      replace: false,
      controller: 'searchController',
      controllerAs: 'searchVm',
      scope: {
        control: '='
      },
      bindToController: {
        cars: '='
      },
      link: function(searchVm){
        searchVm.cars = [{x:2000, y:1000}, {x:130143, y:2330}]
        searchVm.maxPrice = 2330;
        searchVm.maxMileage = 130143;
        searchVm.GraphData = function($http){
          $('.container').highcharts({
            chart: {
              type: 'scatter',
              zoomType: 'xy'
            },
            title: {text: ''},
            // subtitle: {text: 'Ebay search results'},
            xAxis: {
              title: {
                enabled: true,
                text: 'Mileage'
              },
              startOnTick: true,
              endOnTick: true,
              showLastLabel: true,
              min: 0,
              max: (searchVm.maxMileage + 1000)
            },
            yAxis: {
              title: {text: 'Price (USD)'},
              min: 0,
              max: (searchVm.maxPrice + 1000)
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
                    marker: {enabled: false}
                  }
                },
                tooltip: {
                  useHTML: true,
                  pointFormat: '<b>{point.model}, {point.make}</b><br><b>Mileage: {point.x}</b><br> <b>Price: {point.y}</b><br> <b>Year: {point.year}</b><br> <b>Location: {point.location}</b>'
                }
              }
            },
            series: [{
              name: 'Avg value',
              type: 'line',
              color: 'rgba(223, 83, 83, .9)',
              data: searchVm.cars,
            }, {
              name: 'Car',
              type: 'scatter',
              color: 'rgba(223, 83, 83, .5)',
              data: searchVm.cars,
              point: {
                events: {
                  click: function() {
                    var someURL = this.listing_url;
                    if (someURL)
                    window.open(someURL);
                  }
                }
              }
            }]
          })
        }

  searchVm.GraphData()
      }
    }
  })
})();
