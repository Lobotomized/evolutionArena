import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Card, CardFactory } from '../interfaces/card';
import { Board } from '../interfaces/board';
import { CardComponent } from '../card/card.component';
import { delay } from '../helpers/delay';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})



export class BoardComponent implements OnInit {
  @ViewChild('cardOnePlayer') cardOnePlayer: CardComponent;
  @ViewChild('cardTwoPlayer') cardTwoPlayer: CardComponent;
  @ViewChild('cardThreePlayer') cardThreePlayer: CardComponent;


  @ViewChild('cardOneEnemy') cardOneEnemy: CardComponent;
  @ViewChild('cardTwoEnemy') cardTwoEnemy: CardComponent;
  @ViewChild('cardThreeEnemy') cardThreeEnemy: CardComponent;


  board: Board = {
    playerCards: {
      cardOne: null,
      cardTwo: null,
      cardThree: null
    },
    enemyCards: {
      cardOne: null,
      cardTwo: null,
      cardThree: null
    }
  };

  changeTurn: any;

  constructor() {
    const card: Card  = CardFactory();
    const cardTwo: Card  = CardFactory();
    const cardEvil: Card  = CardFactory();
    const cardEvilTwo: Card  = CardFactory();
    this.addPlayerCard(card, 'cardOne');
    this.addPlayerCard(cardTwo, 'cardTwo');
    this.addEnemyCard(cardEvil, 'cardOne');
    this.addEnemyCard(cardEvilTwo, 'cardTwo');
    this.changeTurn = this.giveTurn();
    this.changeTurn.next();
  }

  private addPlayerCard(card: Card, position: string) {
    this.board.playerCards[position] = card;
    this.checkDeath();
  }

  private addEnemyCard(card: Card, position: string) {
    this.board.enemyCards[position] = card;
    this.checkDeath();
  }

  private removeCard(position: string, enemy:boolean) {
    if(enemy){
      this.board.enemyCards[position] = null
    }
    else{
      this.board.playerCards[position] = null;
    }
  }


  private attack(attacker: Card, defender: Card, miss?: boolean ) {
    if (miss) {
       return;
    }

    defender.takeDamage(attacker.attack, attacker);
    this.checkDeath();
  }

  private checkDeath() {
    if (Object.keys(this.board.playerCards)) {
      Object.keys(this.board.playerCards).forEach((card) => {
        if(this.board.playerCards[card]){
          if (this.board.playerCards[card].health <= 0) {
            this.board.playerCards[card].die();
          }
        }
      });
    }

    if (Object.keys(this.board.enemyCards)) {
      Object.keys(this.board.enemyCards).forEach((card) => {
        if(this.board.enemyCards[card]){
          if (this.board.enemyCards[card].health <= 0) {
            this.board.enemyCards[card].die();
          }
        }
      });
    }
  }




  private *giveTurn() {
    console.log('otna4alo')
    if (Object.keys(this.board.playerCards)) {
      for (let card of Object.keys(this.board.playerCards)) {
        if (this.board.playerCards[card]) {
          this.makeInactive();

          if(!this.board.playerCards[card].death){
            this.board.playerCards[card].onTurn = true;

            yield;
          }
          
        }
      }
    }

    if (Object.keys(this.board.enemyCards)) {

      for (let card of Object.keys(this.board.enemyCards)) {
        if (this.board.enemyCards[card]) {
          this.makeInactive();
          if(!this.board.enemyCards[card].death){
            this.board.enemyCards[card].onTurn = true;
            yield;
          }
        }
      }
    }
    this.changeTurn = this.giveTurn();
    yield;
    
  }

  private makeInactive() {
    for (const card of Object.keys(this.board.playerCards)) {
      if (this.board.enemyCards[card]) {
        this.board.playerCards[card].onTurn = false;
      }
    }

    for (const card of Object.keys(this.board.enemyCards)) {
      if (this.board.enemyCards[card]) {
        this.board.enemyCards[card].onTurn = false;
      }
    }
  }

  private getActiveCard() {

    for (const card of Object.keys(this.board.playerCards)) {
      if (this.board.playerCards[card]) {
        if (this.board.playerCards[card].onTurn) {
          return this.board.playerCards[card];

        }
      }
    }
    for (const card of Object.keys(this.board.enemyCards)) {
      if (this.board.enemyCards[card]) {
        if (this.board.enemyCards[card].onTurn) {
          return this.board.enemyCards[card];

        }
      }
    }
  }

  private async playTurn(component: CardComponent, attacker: Card, defender: Card) {
    const random = Math.random();
    if (random >= defender.defense / 100) {
      await component.attackedAnimation(() => {this.attack(attacker, defender); });
    } else {
      await component.missAnimation(() => {this.attack(attacker, defender, true); });
    }
    this.AI();
    this.checkDeath()
    this.changeTurn.next();
  }


  private async AI() {
    //Repeated Code to be fixed

    await delay(3000);
    const attacker = this.getActiveCard();
    const yourTurn = Object.keys(this.board.enemyCards).find((card) => {
      return this.board.enemyCards[card] === attacker;
    });


    if  (yourTurn)  {
      if (this.board.playerCards.cardOne) {
        if(!this.board.playerCards.cardOne.death){
          const componentToAttack = this.cardOnePlayer;

          this.playTurn(componentToAttack,  attacker, this.board.playerCards.cardOne);
          return;
        }

      }
      if (this.board.playerCards.cardTwo) {
        if(!this.board.playerCards.cardTwo.death){
          const componentToAttack = this.cardTwoPlayer;

          this.playTurn(componentToAttack, attacker, this.board.playerCards.cardTwo);
          return;
        }

      }
      if (this.board.playerCards.cardThree) {
        if(!this.board.playerCards.cardThree.death){
          const componentToAttack = this.cardThreePlayer;
          this.playTurn(componentToAttack , attacker, this.board.playerCards.cardThree);
          return;
        }

      }
    }

  }


  // Public Methods

  cardClick(defender: Card, component: CardComponent) {
    const attacker = this.getActiveCard();
    const yourTurn = Object.keys(this.board.playerCards).find((card) => {
      return this.board.playerCards[card] === attacker;
    });

    if (yourTurn) {
      this.playTurn(component, attacker, defender);
    }
  }


  ngOnInit() {
  }

}
