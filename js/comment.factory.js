"use strict";

(function(){
  angular
  .module( "carGraphingApp" )
  .factory( "CommentFactory", [
    "$resource",
    FactoryFunction
  ]);

  function FactoryFunction($resource) {
    return $resource("http://localhost:3000/comments/:id", {}, {
      update: {method: "put"}
    });
  }
}());
