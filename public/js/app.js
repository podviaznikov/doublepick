/*global Backbone: true, ui: true, _:true,localStorage : true */
"use strict";
var models={},AppStatistic,
    AppController={
    init:function(){
        this.cardsIds=[];
        this.initCards();
        //init views
        this.cardsView=new ui.CardsView();
        this.statisticView=new ui.StatisticView();
        this.loginView=new ui.LoginView();
    },
    initCards:function(){
        for(var i=1;i<=147;i++){
            this.cardsIds[i]=i;
        }        
    },
    nextGame:function(){
        //increase counter for played games. We count just made games
        AppController.statisticView.trigger('counter:game');
        
        AppController.cardsView.trigger('cards:clear');
        AppController.cardsView.trigger('cards:new');
    },
    settings:{
        saveUserName:function(userName){
            localStorage.setItem('userName',userName);
        },
        getUserName:function(){
            return localStorage.getItem('userName')||'';
        }
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
AppStatistic={
    getNumberOfGames:function(){
        var value=localStorage.getItem('number_of_games')||0;
        return parseInt(value,10);
    },
    addGame:function(){
        var newNumberOfGames=this.getNumberOfGames()+1;
        localStorage.setItem('number_of_games',newNumberOfGames);
    },
    getNumberOfClicks:function(){
        var value=localStorage.getItem('number_of_clicks')||'0';    
        return parseInt(value,10); 
    },
    addClick:function(){
        var newNumberOfClicks=this.getNumberOfClicks()+1;
        localStorage.setItem('number_of_clicks',newNumberOfClicks);
    },
    getAvgNumberOfClicks:function(){
        var numberOfClicks=this.getNumberOfClicks();
        return numberOfClicks===0?0:(numberOfClicks/this.getNumberOfGames()).toFixed(2);
    }
};
//extending libs
_.mixin({
    // the shuffle function
    shuffle:function(array){
        var tmp, current, top=array.length;
    
        if(top) while(--top){
            current=Math.floor(Math.random() * (top + 1));
            tmp=array[current];
            array[current]=array[top];
            array[top]=tmp;
        }
        return array;
    }
});