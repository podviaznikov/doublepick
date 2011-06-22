/*global Backbone: true, $: true, _: true, AppController: true, models:true */
var ui={};
$(function(){
    "use strict";
    ui.CardView=Backbone.View.extend({
        className:'card',
        tagName:'section',
        tpl:$('#card_tpl').html(),
        events:{
            'click':'clickOnCard',
            'mouseleave':'leaveCard'
        },
        initialize:function(){
            _.bindAll(this,'clickOnCard','leaveCard');
        },
        render:function(){
            this.$(this.el).html(_.template(this.tpl,{
                image:this.model.get('img')
            }));
            this.$(this.el).attr('data-card-id',this.model.get('cardId'));
            return this;
        },
        clickOnCard:function(){
            this.$(this.el).addClass('active');
            AppController.cardsView.trigger('card:selected',this.model);
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
            _.bindAll(this,'render','addCard','newCards','removeCards',
                'handleCardSelection');
            this.correctAnswersCounter=0;    
            this.bind('card:selected',this.handleCardSelection);
            this.bind('cards:clear',this.removeCards);
            this.bind('cards:new',this.newCards);
            this.previosCard=null;
            this.cards=new models.Cards();
            //retrieve cards immediately to start game
            this.newCards();
        },
        render:function(){
            return this;
        },
        addCard:function(card,index){
            card.set({countId:index});
            var view=new ui.CardView({model:card}),
                html=view.render().el;
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
        newCards:function(){
            //generate 6 unique cards
            var cards=this.cards.generateGameCards(),
                //copy array of cards to new array
                doubledCards=cards;
             //clone each model from initial array and put into doubled cards array   
            _.each(cards,function(card){
                doubledCards.push(card.clone()); 
            });
            //shuffle cards
            var shuffledCards=_.shuffle(doubledCards);
            _.each(shuffledCards,this.addCard);    
        },
        handleCardSelection:function(card){
            //trigger statistic update
            AppController.statisticView.trigger('counter:update');
            if(this.previosCard){
                if(card.get('cardId')===this.previosCard.get('cardId') && 
                card.get('countId')!==this.previosCard.get('countId')){
                    this.$(".card[data-card-id='"+card.get('cardId')+"']").addClass('finished');
                    this.correctAnswersCounter++;
                    if(this.correctAnswersCounter===6){
                        this.$('.card').addClass('all_finished');
                    }
                }
            }
            this.previosCard=card;
        },
        removeCards:function(){
            this.$('.card').remove();
        }
    });
    //statistics view. Shows number of made attempt
    ui.StatisticView=Backbone.View.extend({
        el:$('#statistic_view'),
        counterEl:$('#statistic_view section'),
        initialize:function(){
            this.taskAttemptsCounter=0;
            _.bind(this,'resetCounter','updateCounter');
            this.bind('counter:update',this.updateCounter);
            this.bind('counter:reset',this.resetCounter);
        },
        //increment counter on 1
        updateCounter:function(){
            this.taskAttemptsCounter++;
            this.$(this.counterEl).html(this.taskAttemptsCounter);
        },
        //reset counter to 0
        resetCounter:function(){
            this.taskAttemptsCounter=0;
            this.$(this.counterEl).html(this.taskAttemptsCounter);
        }
    });
    ui.ToolbarView=Backbone.View.extend({
        el:$('#toolbar'),
        events:{
            'click #next_round':'startNextRound'
        },
        initialize:function(){
            _.bindAll(this,'startNextRound');
        },
        startNextRound:function(){
            AppController.statisticView.trigger('counter:reset');
            AppController.cardsView.trigger('cards:clear');
            AppController.cardsView.trigger('cards:new');
        }
    });
});