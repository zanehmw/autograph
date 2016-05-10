"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .controller("searchController", [
  "$scope",
  "SearchFactory",
  SearchControllerFunction]);

  function SearchControllerFunction($scope, SearchFactory){
    var searchVm = this;

    searchVm.cars = [{x:2000, y:1000}, {x:130143, y:2330}]
    searchVm.maxPrice = 2330;
    searchVm.maxMileage = 130143;

    this.search = function(){

    $scope.result= SearchFactory.sendData(this.searchTerms).then(function(res){
      console.log(res);
      return res

  })


}
}
}());
