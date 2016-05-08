"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .controller("searchController", [
  "SearchFactory",
  "CarFactory",
  "$http",
  SearchControllerFunction]);

  function SearchControllerFunction(searchFactory, carFactory, $http){
    var searchVm = this;
    searchFactory();
}

}());
