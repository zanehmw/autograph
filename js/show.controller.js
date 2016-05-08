"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .controller("carShowController", [
    "SearchFactory",
    "$http",
    carShowControllerFunction
  ]);

  function carShowControllerFunction(SearchFactory, $http) {
    var carShowVm = this;
    console.log("Boop Bip Bip Boop");
    // this is not working b/c query requires $resource, not $http
    SearchFactory
      .success(function(res){
      carShowVm.cars = res.data
    })

    console.log(carShowVm.cars)
  }
}());
