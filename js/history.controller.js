"use strict";

(function(){
  angular
  .module("carGraphingApp")
  .controller("historyController", [
    "DatabaseFactory",
    "$stateParams",
    "$window",
    "CommentFactory",
    ControllerFunction
  ]);

  function ControllerFunction(DatabaseFactory, $stateParams, $window, CommentFactory) {
    this.histories = DatabaseFactory.query();
    this.comments = CommentFactory.query();

    this.destroy = function(obj){
      DatabaseFactory.delete({id: obj.id});
      window.location.reload();
    };

    this.newcomment = new CommentFactory();
    this.create = function(obj){
      this.newcomment.car_id = obj.id;
      this.newcomment.author = obj.author;
      this.newcomment.body = obj.body;
      this.newcomment.$save();
      window.location.reload();
    }

  }

}());
