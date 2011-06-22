/*global Backbone: true, ui: true, _:true */
"use strict";
var models={};
var AppController={
    init:function(){
        this.cardsIds=[];
        for(var i=1;i<=42;i++){
            this.cardsIds[i]=i;
        }
        //init views
        this.cardsView=new ui.CardsView();
        this.statisticView=new ui.StatisticView();
        this.toolbarView=new ui.ToolbarView();
    }
};
models.Card=Backbone.Model.extend({});
models.Cards=Backbone.Collection.extend({
    model:models.Card,
    generateGameCards:function(){
        var shuffledIds=_.shuffle(AppController.cardsIds),
            cards=[],
            i=0;
        for(;i<6;i++){
            cards[i]=new models.Card({
                cardId:shuffledIds[i],
                img:'cards/'+shuffledIds[i]+'.png'
            });
        }
        return cards;
    }
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
