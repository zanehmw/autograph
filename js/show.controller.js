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
      carShowVm.cars = [];
      carShowVm.rawCars = res.data.Item;
      for(var i=0; i<carShowVm.rawCars.length; i++){
        var toParse = carShowVm.rawCars[i]["ItemSpecifics"]["NameValueList"];
        carShowVm.c = {}
        jQuery.grep(toParse, function(n){
          if (n.Name == "Make") {carShowVm.c.model = n.Value[0]}
          if (n.Name == "Model") {carShowVm.c.make = n.Value[0]}
          if (n.Name == "Year") {carShowVm.c.year = n.Value[0]}
          if (n.Name == "Mileage") {carShowVm.c.mileage = n.Value[0]}
        })
        carShowVm.cars.push({
          make: carShowVm.c.make,
          model: carShowVm.c.model,
          price: carShowVm.rawCars[i].ConvertedCurrentPrice.Value,
          year: carShowVm.c.year,
          mileage: carShowVm.c.mileage,
          location: carShowVm.rawCars[i].Location,
          listing_url: carShowVm.rawCars[i].ViewItemURLForNaturalSearch,
          picture_url: carShowVm.rawCars[i].GalleryURL,
          condition: carShowVm.rawCars[i].ConditionDisplayName
        })
      }
    })
  }
}());
