/*global Backbone: true, ui: true */
"use strict";
var models={};
var AppController={
    init:function(){
        this.cardsView=new ui.CardsView();
        this.statisticView=new ui.StatisticView();
    }
};
models.Card=Backbone.Model.extend({

});
models.Cards=Backbone.Collection.extend({
    model:models.Card,
    url:'/cards'
});