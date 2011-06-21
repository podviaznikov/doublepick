/*global Backbone: true, $: true, _: true, AppController: true, models:true */
var ui={};
// The shuffle function
var shuffle = function(array) {
    var tmp, current, top = array.length;

    if(top) while(--top){
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
};
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
            AppController.statisticView.trigger('updateCounter');
        },
        leaveCard:function(){
            this.$(this.el).removeClass('active');
        }
    });
    ui.CardsView=Backbone.View.extend({
        el:$('#cards_container'),
        firstColumn:$('#first_column'),
        secondColumn:$('#second_column'),
        thirdColumn:$('#third_column'),
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
        addCard:function(card,index){
            var html=new ui.CardView({model:card}).render().el;
            if(index>=0 && index<3){
                this.$(this.firstColumn).append(html);
            }
            else if(index>=3 && index<6){
                this.$(this.secondColumn).append(html);
            }
            else if(index>=6 && index<9){
                this.$(this.thirdColumn).append(html);
            }
            else{
                this.$(this.fourthColumn).append(html);
            }
        },
        addCards:function(){
            //this.cards.each(this.addCard);
            var cards=this.cards.models,
                doubledCards=cards.concat(cards),
                shuffledCards=shuffle(doubledCards);
            _.each(shuffledCards,this.addCard);    
        }
    });
    ui.StatisticView=Backbone.View.extend({
        el:$('#statistic_view'),
        initialize:function(){
            this.taskAttemptsCounter=0;
            _.bind(this,'render','updateCounter');
            this.bind('updateCounter',this.updateCounter);
        },
        render:function(){
            return this;
        },
        updateCounter:function(){
            this.taskAttemptsCounter++;
            this.$(this.el).html(this.taskAttemptsCounter);
        }
    });

});