
"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .factory("SearchFactory", ["$http", SearchFactoryFunction])

  function SearchFactoryFunction($http, $q){
    var url=[];
    return {
      sendData: function(data){
<<<<<<< HEAD
=======

        //  console.log(data);
>>>>>>> 332d2d1745639d9e7e83e2c6a12d38151cf8669c
        url = "http://svcs.ebay.com/services/search/FindingService/v1";
          url += "?OPERATION-NAME=findItemsByKeywords";
          url += "&SERVICE-VERSION=1.0.0";
          url += "&SECURITY-APPNAME=MaryGrif-WDICarPr-PRD-42f839347-07238b74";
          url += "&GLOBAL-ID=EBAY-MOTOR";
          url += "&responseencoding=JSON";
          url += "&callback=JSON_CALLBACK";
          url += "&keywords=" + data.carMake + "%20" + data.carModel + "";
          url += "&buyerPostalCode=" + data.zipCode + "";
          url += "&CategoryID=6001";
          url += "&itemFilter(0).name=LocalSearchOnly";
          url += "&itemFilter(0).value=true";
          url += "&itemFilter(1).name=MaxDistance";
          url += "&itemFilter(1).value=" + data.radius + "";
          url += "&itemFilter(2).name=ExcludeCategory";
          url += "&itemFilter(2).value(0)=6028";
          url += "&itemFilter(2).value(1)=6030";
          url += "&itemFilter(2).value(2)=34998";
          url += "&itemFilter(2).value(3)=33701";
          url += "&descriptionSearch=false";
          url += "&paginationInput.entriesPerPage=100";

        return $http.jsonp(url).then(function(res){
          // console.log("hi111");
          // console.log(res);
          var carInfo = res.data;
          var cars = carInfo.findItemsByKeywordsResponse[0].searchResult[0].item || [];
          var urlList = '&itemID=';
          var loopCounter = 4;
          var resultsArray = [];
          var i = 0;
<<<<<<< HEAD

          while(i<99 || i<cars.length) {
=======

          while(i<99 || i<cars.length) {

>>>>>>> 332d2d1745639d9e7e83e2c6a12d38151cf8669c
            urlList = '&itemID=';

            for(i; i < cars.length-(loopCounter*20); i++){
              urlList += cars[i].itemId[0] + ',';
            }

            loopCounter=loopCounter-1;

            var newUrl = "http://open.api.ebay.com/shopping?";
<<<<<<< HEAD
              newUrl += "callname=GetMultipleItems";
              newUrl += "&version=963";
              newUrl += "&appid=MaryGrif-WDICarPr-PRD-42f839347-07238b74";
              newUrl += "&GLOBAL-ID=EBAY-US";
              newUrl += "&responseencoding=JSON";
              newUrl += "&callbackname=JSON_CALLBACK";
              newUrl += "&IncludeSelector=ItemSpecifics";
              newUrl += "&REST-PAYLOAD";
              newUrl += urlList;
=======
            newUrl += "callname=GetMultipleItems";
            newUrl += "&version=963";
            newUrl += "&appid=MaryGrif-WDICarPr-PRD-42f839347-07238b74";
            newUrl += "&GLOBAL-ID=EBAY-US";
            newUrl += "&responseencoding=JSON";
            newUrl += "&callbackname=JSON_CALLBACK";
            newUrl += "&IncludeSelector=ItemSpecifics";
            newUrl += "&REST-PAYLOAD";
            newUrl += urlList;
>>>>>>> 332d2d1745639d9e7e83e2c6a12d38151cf8669c

            console.log(newUrl);

            if (loopCounter == -1){
              return $http.jsonp(newUrl).then(function(res){
                console.log(res.data.Item)
                resultsArray.push(res.data.Item);
                return resultsArray
              });
            }
            else {
<<<<<<< HEAD
            $http.jsonp(newUrl).then(function(res){
=======
              $http.jsonp(newUrl).then(function(res){
>>>>>>> 332d2d1745639d9e7e83e2c6a12d38151cf8669c
                console.log(res.data.Item)
                resultsArray.push(res.data.Item);
              })
            }
          }
        });
      }
    }
  }
})();
