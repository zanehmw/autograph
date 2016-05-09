"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .controller("carShowController", [
    "DetailsFactory",
    "$http",
    carShowControllerFunction
  ]);

  function carShowControllerFunction(DetailsFactory, $http) {
    var carShowVm = this;
    DetailsFactory
      .then(function(res){
        carShowVm.cars = res.data
        console.log(carShowVm.cars)
    })
  }
}());
