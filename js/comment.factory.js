"use strict";

(function(){
  angular
  .module( "carGraphingApp" )
  .factory( "CommentFactory", [
    "$resource",
    FactoryFunction
  ]);

  function FactoryFunction($resource) {
    return $resource("https://autographapi.herokuapp.com/comments/:id", {}, {
      update: {method: "put"}
    });
  }
}());
