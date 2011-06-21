"use strict";
var AppController={
    init:function(){
        this.taskAttemptsCounter=0;
        this.cardsView=new ui.CardsView();
        this.cardsView.render();
        this.statisticView=new ui.StatisticView();
    }
}
var models={};
models.Card=Backbone.Model.extend({

});