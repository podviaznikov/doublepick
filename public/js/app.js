/*global Backbone: true, ui: true, _:true */
"use strict";
var models={};
var AppController={
    init:function(){
        //init views
        this.cardsView=new ui.CardsView();
        this.statisticView=new ui.StatisticView();
    }
};
models.Card=Backbone.Model.extend({});
models.Cards=Backbone.Collection.extend({
    model:models.Card,
    url:'/cards'
});
//extending libs
_.mixin({
    // the shuffle function
    shuffle:function(array){
        var tmp, current, top = array.length;
    
        if(top) while(--top){
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array;
    }
});
