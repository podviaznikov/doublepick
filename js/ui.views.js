"use strict";
var ui={};
$(function(){
    ui.CardView=Backbone.View.extend({
        className:'card',
        tpl:$('#card_tpl').html(),
        events:{
            'click':'clickOnCard',
            'mouseout':'leaveCard'
        },
        initialize:function(){
            _.bindAll(this,'clickOnCard','leaveCard');
        },
        render:function(){
            this.$(this.el).html(_.template(this.tpl,{
                cardId:'1',
                image:'picker/bleach_chlorine.png'
            }));
            return this;
        },
        clickOnCard:function(){
            this.$(this.el).addClass('active');
            AppController.taskAttemptsCounter++;
            AppController.statisticView.update(AppController.taskAttemptsCounter);
        },
        leaveCard:function(){
            this.$(this.el).removeClass('active');
        }
    });
    ui.CardsView=Backbone.View.extend({
        el:$('#cards_container'),
        firstColumn:$('#first_column'),
        secondColumn:$('#second_column'),
        thirdColumn:$('#thord_column'),
        fourthColumn:$('#fourth_column'),
        render:function(){
            this.$(this.firstColumn).append(new ui.CardView().render().el);
            this.$(this.firstColumn).append(new ui.CardView().render().el);
            this.$(this.secondColumn).append(new ui.CardView().render().el);
            return this;
        },
    });
    ui.StatisticView=Backbone.View.extend({
        el:$('#statistic_view'),
        render:function(){
            return this;
        },
        update:function(v){
            this.$(this.el).html(v);
        }
    });

});