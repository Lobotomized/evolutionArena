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
    const cardEvil: Card  = CardFactory();
    this.addPlayerCard(card, 'cardOne');
    this.addEnemyCard(cardEvil, 'cardOne');
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

  private removePlayerCard(position: string) {
    this.board.playerCards[position] = {};
  }

  private attack(attacker: Card, defender: Card, miss?: boolean ) {
    if (miss) {
       this.changeTurn.next();
       return;
    }

    defender.takeDamage(attacker.attack, attacker);
    this.checkDeath();
    this.changeTurn.next();
  }

  private checkDeath() {
    if (Object(this.board.playerCards).keys) {
      Object(this.board.playerCards).keys.forEach((card) => {
        if (card.health <= 0) {
          card.die();
        }
      });
    }
  }




  private *giveTurn() {
    if (Object.keys(this.board.playerCards)) {
      for (const card of Object.keys(this.board.playerCards)) {
        if (this.board.playerCards[card]) {
          this.makeInactive();
          this.board.playerCards[card].onTurn = true;
          yield;
        }
      }
    }

    if (Object.keys(this.board.enemyCards)) {

      for (const card of Object.keys(this.board.enemyCards)) {
        if (this.board.enemyCards[card]) {
          this.makeInactive();
          this.board.enemyCards[card].onTurn = true;
          yield;
        }
      }
    }

    this.changeTurn = this.giveTurn();
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

  }

  private activeTeam() {
    const found = Object.keys(this.board.enemyCards).find((enemy) =>{
      if (this.board.enemyCards[enemy]) {
        return this.board.enemyCards[enemy].onTurn;

      }
    });
    if (found) {
      return 'enemy';
    } else {
      return 'player';
    }
  }
  private async AI() {
    //FIX LATER

    const component = this.cardOnePlayer;
    await delay(3000);
    const attacker = this.getActiveCard();
    const yourTurn = Object.keys(this.board.enemyCards).find((card) => {
      return this.board.enemyCards[card] === attacker;
    });


    if  (yourTurn)  {
      if (this.board.playerCards.cardOne) {
        this.playTurn(component,  attacker, this.board.playerCards.cardOne);
        this.changeTurn.next();
        return;
      }
      if (this.board.playerCards.cardTwo) {
        this.playTurn(component, attacker, this.board.playerCards.cardTwo);
        this.changeTurn.next();
        return;
      }
      if (this.board.playerCards.cardThree) {
        this.playTurn(component, attacker, this.board.playerCards.cardThree);
        this.changeTurn.next();
        return;
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
