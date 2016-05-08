"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .factory("SearchFactory", [
    "$http",
    SearchFactoryFunction]);

  function SearchFactoryFunction($http){
    var url = "http://svcs.ebay.com/services/search/FindingService/v1";
     url += "?OPERATION-NAME=findItemsByKeywords";
     url += "&SERVICE-VERSION=1.0.0";
     url += "&SECURITY-APPNAME=MaryGrif-WDICarPr-PRD-42f839347-07238b74";
     url += "&GLOBAL-ID=EBAY-US";
     url += "&responseencoding=JSON";
     url += "&callback=JSON_CALLBACK";
     url += "&keywords=bmw";
     url += "&paginationInput.entriesPerPage=20";
     url += "&CategoryID=6001";

     $http.jsonp(url).success(function(res){
      var cars = res.findItemsByKeywordsResponse[0].searchResult[0].item || [];

      console.log("Car List");
      console.log(cars);

      var urlList = '&itemID=';
      for(var i = 0; i < cars.length; i++){
        urlList += cars[i].itemId[0] + ',';
      }
      var newUrl = "http://open.api.ebay.com/shopping?";
      newUrl += "callname=GetMultipleItems";
      newUrl += "&version=963";
      newUrl += "&appid=MaryGrif-WDICarPr-PRD-42f839347-07238b74";
      newUrl += "&GLOBAL-ID=EBAY-US";
      newUrl += "&responseencoding=JSON";
      newUrl += "&callbackname=JSON_CALLBACK";
      newUrl += "&IncludeSelector=ItemSpecifics";
      newUrl += "&REST-PAYLOAD";
      newUrl += urlList;

      console.log(newUrl)

      $http.jsonp(newUrl).success(function(finalItems){console.log(finalItems);});
    });
  }
}());
