import { Component, OnInit } from '@angular/core';
import { Card, CardFactory } from '../interfaces/card';
import { Board } from '../interfaces/board';
import { findComponentView } from '@angular/core/src/render3/util';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit {

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

  private attack(attacker: Card, defender: Card) {
    if (attacker.beforeAttack) {
      attacker.beforeAttack(defender);
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

  async cardClick(defender: Card,component:CardComponent) {
    const attacker = this.getActiveCard();
    const yourTurn = Object.keys(this.board.playerCards).find((card) => {
      return this.board.playerCards[card] === attacker;
    });
    
    if (yourTurn) {
      this.attack(attacker, defender);

      await component.attackedAnimation();
      console.log(this.board)
    }
  }

  ngOnInit() {
  }

}
