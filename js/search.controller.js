"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .controller("searchController", [
  "SearchFactory",
  SearchControllerFunction]);

  function SearchControllerFunction(SearchFactory){
    var searchVm = this;

    this.search = function(){
    SearchFactory.sendData(this.searchTerms).then(function(res){
      searchVm.cars = [];
      searchVm.rawCars = res.data.Item;
      console.log("boop bip bip");
      console.log(res.data.Item);

      for(var i=0; i<searchVm.rawCars.length; i++){
         if (searchVm.rawCars[i].ItemSpecifics){
         var toParse = searchVm.rawCars[i].ItemSpecifics.NameValueList;
         searchVm.c = {}
         jQuery.grep(toParse, function(n){
           if (n.Name == "Make") {searchVm.c.model = n.Value[0]; console.log(n.Value[0]);}
           if (n.Name == "Model") {searchVm.c.make = n.Value[0]; console.log(n.Value[0]);}
           if (n.Name == "Year") {searchVm.c.year = n.Value[0]; console.log(n.Value[0]);}
           if (n.Name == "Mileage") {searchVm.c.mileage = n.Value[0]; console.log(n.Value[0]);}
         })

        console.log(i)

         searchVm.cars.push({
           make: searchVm.c.make,
           model: searchVm.c.model,
           price: searchVm.rawCars[i].ConvertedCurrentPrice.Value,
           year: searchVm.c.year,
           mileage: searchVm.c.mileage,
           location: searchVm.rawCars[i].Location,
           listing_url: searchVm.rawCars[i].ViewItemURLForNaturalSearch,
           picture_url: searchVm.rawCars[i].GalleryURL,
           condition: searchVm.rawCars[i].ConditionDisplayName
         })
        }
      }
    console.log(searchVm.cars[0]);
  })
    }
  }

}());
