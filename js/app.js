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
        templateUrl: "autograph/js/search.html",
        controller: "searchController",
        controllerAs: "searchVm"
      })
      .state("help", {
        url: "/help",
        templateUrl: "autograph/js/help.html",
        controller: "helpController",
        controllerAs: "helpVm"
      })
      .state("history", {
        url: "/history",
        templateUrl: "autograph/js/history.html",
        controller: "historyController",
        controllerAs: "historyVm"
      })
      .state("carShow", {
        url: "/show",
        templateUrl: "autograph/js/show.html",
        controller: "carShowController",
        controllerAs: "carShowVm"
      });

      $urlRouterProvider
      .otherwise("/");
    }
  }());
