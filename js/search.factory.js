
"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .factory("SearchFactory", ["$http", SearchFactoryFunction])

  function SearchFactoryFunction($http, $q){
    var url=[];
    return {
      sendData: function(data){


        console.log(data);

         url = "http://svcs.ebay.com/services/search/FindingService/v1";
         url += "?OPERATION-NAME=findItemsByKeywords";
         url += "&SERVICE-VERSION=1.0.0";
         url += "&SECURITY-APPNAME=MaryGrif-WDICarPr-PRD-42f839347-07238b74";
         url += "&GLOBAL-ID=EBAY-MOTOR";
         url += "&responseencoding=JSON";
         url += "&callback=JSON_CALLBACK";
         url += "&keywords=" + data.carMake + "%20" + data.carModel + "";
         url += "&buyerPostalCode=" + data.zipCode + "";
         url += "&itemFilter(0).name=LocalSearchOnly";
         url += "&itemFilter(0).value=true";
         url += "&itemFilter(1).name=MaxDistance";
         url += "&itemFilter(1).value=" + data.radius + "";
         url += "&paginationInput.entriesPerPage=100";
         url += "&CategoryID=6001";

         console.log(url);

         return $http.jsonp(url).then(function(res){
                   console.log("hi111");
                   console.log(res);
                   var carInfo = res["data"];
                   var cars = carInfo.findItemsByKeywordsResponse[0].searchResult[0].item || [];
                   var urlList = '&itemID=';
                   var loopCounter = 4;
                   var resultsArray = [];
                   var i = 0;

                   while(i<99) {

                    console.log("initial I");
                    console.log(i);

                    console.log(cars.length-(loopCounter*20));
                     urlList = '&itemID=';

                     for(i; i < cars.length-(loopCounter*20); i++){
                       urlList += cars[i].itemId[0] + ',';
                     }

                     loopCounter=loopCounter-1;

                     console.log("what is 'i'");
                     console.log(i);
                     console.log(urlList);


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

                     console.log(newUrl);

                       $http.jsonp(newUrl).then(function(res){
                         resultsArray.push(res.data);

                         console.log("BYE111")
                         console.log(resultsArray.length)
                         console.log(resultsArray)

                         if (resultsArray.length==5) {
                            console.log("return")
                           console.log(resultsArray)
                           return resultsArray;
                         }


                       })



                  }

               });
       }
     };
   }

})();
