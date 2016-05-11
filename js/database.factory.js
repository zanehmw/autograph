"use strict";

(function(){
  angular
  .module( "carGraphingApp" )
  .factory( "DatabaseFactory", [
    "$resource",
    FactoryFunction
  ]);

  function FactoryFunction($resource) {
    return $resource("http://localhost:3000/cars/:id", {}, {
      update: {method: "put"}
    });
  }
}());
