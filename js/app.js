"use strict";

(function(){
  angular
  .module("app", ["ui.router", "ngResource"])
  .config(['$stateProvider', RouterFunction])
  .controller('searchController', searchController)
  .factory('searchFactory', searchFactory)
  .factory('carFactory', carFactory)

  function RouterFunction($stateProvider) {
    $stateProvider
    .state("search", {
      url: "/searches",
      templateUrl: "js/search.html",
      controller: "searchController",
      controllerAs: "searchVm"
    })
    .state("help", {
      url: "/help",
      templateUrl: "js/help.html",
      controller: "helpController",
      controllerAs: "helpVm"
    });
  }

  searchFactory.$inject = ["$http"];
  function searchFactory($http){
    var url = "http://svcs.ebay.com/services/search/FindingService/v1";
     url += "?OPERATION-NAME=findItemsByKeywords";
     url += "&SERVICE-VERSION=1.0.0";
     url += "&SECURITY-APPNAME=MaryGrif-WDICarPr-PRD-42f839347-07238b74";
     url += "&GLOBAL-ID=EBAY-US";
     url += "&responseencoding=JSON";
     url += "&callback=JSON_CALLBACK";
     url += "&keywords=bmw";
     url += "&paginationInput.entriesPerPage=20";
     url += "&CategoryID=6001"
    return $http.jsonp(url);
  }

  carFactory.$inject = ["$http"];
  function carFactory($http){
    var urlList = '&itemID='
    var cars = [];
    for(var i = 0; i < cars.length; i++){
      urlList += cars[i].itemId + ',';
    }
    var newUrl = "http://open.api.ebay.com/shopping?";
    newUrl += "callname=GetMultipleItems";
    newUrl += "&version=963";
    newUrl += "&appid=MaryGrif-WDICarPr-PRD-42f839347-07238b74";
    newUrl += "&GLOBAL-ID=EBAY-US";
    newUrl += "&responseencoding=JSON";
    newUrl += "&IncludeSelector=ItemSpecifics";
    newUrl += "&REST-PAYLOAD";
    newUrl += urlList;
    return $http.jsonp(newUrl);
  }

  searchController.$inject = ["searchFactory", "carFactory", "$http"];
  function searchController(searchFactory, carFactory, $http){
    var searchVm = this;
    searchVm.message = "hi"
    searchFactory
      .success(function(res, $http){
        var cars = res.findItemsByKeywordsResponse[0].searchResult[0].item || [];
        console.log(cars);

        var urlList = '&itemID='
        cars = [];
        for(var i = 0; i < cars.length; i++){
          urlList += cars[i].itemId + ',';
        }
        var newUrl = "http://open.api.ebay.com/shopping?";
        newUrl += "callname=GetMultipleItems";
        newUrl += "&version=963";
        newUrl += "&appid=MaryGrif-WDICarPr-PRD-42f839347-07238b74";
        newUrl += "&GLOBAL-ID=EBAY-US";
        newUrl += "&responseencoding=JSON";
        newUrl += "&IncludeSelector=ItemSpecifics";
        newUrl += "&REST-PAYLOAD";
        newUrl += urlList;

        carFactory.success(function(finalItems){console.log(finalItems)});
      });
  }


})();
