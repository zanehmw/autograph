"use strict";

(function(){
  angular
  .module('carGraphingApp', [
    'ui.router',
    'ngResource'])
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      RouterFunction
    ]);

  function RouterFunction($stateProvider , $urlRouterProvider) {
    $stateProvider
    .state("search", {
      url: "/",
      templateUrl: "js/search.html",
      controller: "searchController",
      controllerAs: "searchVm"
    })
    .state("help", {
      url: "/help",
      templateUrl: "js/help.html",
      controller: "helpController",
      controllerAs: "helpVm"
    })
    .state("graph", {
      url: "/graph",
      templateUrl: "js/graph.html",
      controller: "graphController",
      controllerAs: "graphVm"
    })
    .state("carShow", {
      url: "/show",
      templateUrl: "js/show.html",
      controller: "carShowController",
      controllerAs: "carShowVm"
    });

    $urlRouterProvider
    .otherwise("/");
  }
}());
