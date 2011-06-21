/*global Backbone: true, $: true, _: true, AppController: true, models:true */
var ui={};
$(function(){
    "use strict";
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
                cardId:this.model.get('cardId'),
                image:this.model.get('img')
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
        initialize:function(){
            _.bindAll(this,'render','addCard','addCards');
            this.cards=new models.Cards();
            this.cards.bind('add',this.addCard);
            this.cards.bind('refresh',this.addCards);
            this.cards.fetch();
        },
        render:function(){
            return this;
        },
        addCard:function(card){
            this.$(this.firstColumn).append(new ui.CardView({model:card}).render().el);    
        },
        addCards:function(){
            this.cards.each(this.addCard);
        }
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