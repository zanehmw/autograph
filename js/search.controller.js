"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .controller("searchController", [
    "$scope",
    "DatabaseFactory",
    "SearchFactory",
    SearchControllerFunction]);

  function SearchControllerFunction($scope, DatabaseFactory, SearchFactory){
    var searchVm = this;
    this.searchTerms = new DatabaseFactory();

    searchVm.onRefresh = function(newData, maxP, maxM){
      var chart = $('.container').highcharts();
      var cleanData = [];
      for(var i=0; i<newData.length; i++){
        var newY = (maxP - newData[i].y);
        cleanData.push([newData[i].x, newY]);
      }
      var compareFunc = function(a, b){
        return (a[0]-b[0]);
      }
      var logarithmic = function(lData) {
        var sum = [0, 0, 0, 0];
        var results = [];
        var len = lData.length
        for (var n=0; n < len; n++) {
          if (lData[n][1] && lData[n][0]) {
            sum[0] += Math.log(lData[n][0]);
            sum[1] += lData[n][1] * Math.log(lData[n][0]);
            sum[2] += lData[n][1];
            sum[3] += Math.pow(Math.log(lData[n][0]), 2);
          }
        }
        var B = (len * sum[1] - sum[2] * sum[0]) / (len * sum[3] - sum[0] * sum[0]);
        var A = (sum[2] - B * sum[0]) / len;

        for (var i = 0; i < len; i++) {
          var coordinate = [lData[i][0], A + B * Math.log(lData[i][0])];
          if (coordinate[1] > 0){
            results.push(coordinate);
          }
        }
        return results
      }
      var newRegression = logarithmic(cleanData)
      for (var n=0; n < newRegression.length; n++){
        var newRY = maxP - newRegression[n][1]
        newRegression[n][1] = newRY
      }
      newRegression.sort(compareFunc)
      chart.series[0].setData(newRegression, false);
      chart.series[1].setData(newData, false);
      chart.xAxis[0].setExtremes(0, (maxM * 1.1));
      chart.yAxis[0].setExtremes(0, (maxP * 1.1));
      chart.redraw();
    }

    this.search = function(){

      this.searchTerms.$save();

      SearchFactory.sendData(this.searchTerms)
      .then(function(res){
        searchVm.cars = [];
        searchVm.maxMileage = 0;
        searchVm.maxPrice = 0;

        for(var j=0; j<res.length; j++){
          searchVm.rawCars = res[j]
          for(var i=0; i<searchVm.rawCars.length; i++){
            if (searchVm.rawCars[i].ItemSpecifics){
              var toParse = searchVm.rawCars[i].ItemSpecifics.NameValueList;
              searchVm.c = {}
              jQuery.grep(toParse, function(n){
                if (n.Name == "Make") {searchVm.c.model = n.Value[0];}
                if (n.Name == "Model") {searchVm.c.make = n.Value[0];}
                if (n.Name == "Year") {searchVm.c.year = parseInt(n.Value[0]);}
                if (n.Name == "Mileage") {searchVm.c.mileage = parseFloat(n.Value[0]);}
              })

              if (searchVm.c.mileage > searchVm.maxMileage) {
                searchVm.maxMileage = searchVm.c.mileage
              }
              if (searchVm.rawCars[i].ConvertedCurrentPrice.Value > searchVm.maxPrice){
                searchVm.maxPrice = searchVm.rawCars[i].ConvertedCurrentPrice.Value
              }
              searchVm.cars.push({
                make: searchVm.c.make,
                model: searchVm.c.model,
                y: parseFloat(searchVm.rawCars[i].ConvertedCurrentPrice.Value),
                year: searchVm.c.year,
                x: searchVm.c.mileage,
                location: searchVm.rawCars[i].Location,
                listing_url: searchVm.rawCars[i].ViewItemURLForNaturalSearch,
                picture_url: searchVm.rawCars[i].GalleryURL,
                condition: searchVm.rawCars[i].ConditionDisplayName
              })
            }
          }
        }
      })
      .then(function(){
        document.getElementsByClassName('loading')[0].style.display= 'none';
        searchVm.onRefresh(searchVm.cars, searchVm.maxPrice, searchVm.maxMileage)
      })
    }
  }

}());
