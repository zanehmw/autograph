"use strict";

(function(){
  angular
  .module( "carGraphingApp" )
  .factory( "DatabaseFactory", [
    "$resource",
    FactoryFunction
  ]);

  function FactoryFunction($resource) {
    return $resource("https://autographapi.herokuapp.com/cars/:id", {}, {
      update: {method: "put"}
    });
  }
}());
