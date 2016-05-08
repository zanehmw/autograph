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
    this.cars = SearchFactory.query();

  }
}());
