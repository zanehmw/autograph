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
    var historyVm = this;
    historyVm.histories = DatabaseFactory.query();
    historyVm.comments = CommentFactory.query();

    historyVm.destroy = function(obj){
      DatabaseFactory.delete({id: obj.id});
      window.location.reload();
    };

    historyVm.newcomment = new CommentFactory();
    historyVm.create = function(obj){
      this.newcomment.car_id = obj.id;
      this.newcomment.author = obj.author;
      this.newcomment.body = obj.body;
      this.newcomment.$save();
      window.location.reload();
    }

  }

}());
