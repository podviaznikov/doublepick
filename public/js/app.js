/*global Backbone: true, ui: true */
"use strict";
var models={};
var AppController={
    init:function(){
        this.taskAttemptsCounter=0;
        this.cardsView=new ui.CardsView();
        this.cardsView.render();
        this.statisticView=new ui.StatisticView();
    }
};
models.Card=Backbone.Model.extend({

});
models.Cards=Backbone.Collection.extend({
    model:models.Card,
    url:'/cards'
});