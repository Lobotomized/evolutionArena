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
  openForClicks = true;

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

  private removeCard(position: string, enemy: boolean) {
    if (enemy) {
      this.board.enemyCards[position] = null;
    } else {
      this.board.playerCards[position] = null;
    }
  }


  private attack(attacker: Card, defender: Card, miss?: boolean ) {
    if (miss) {
       return;
    }
    attacker.restCurrent = 0;
    defender.takeDamage(attacker.attack, attacker);
    this.checkDeath();
  }

  private rest(attacker: Card) {
    attacker.restCurrent++;
  }

  private checkDeath() {
    if (Object.keys(this.board.playerCards)) {
      Object.keys(this.board.playerCards).forEach((card) => {
        if (this.board.playerCards[card]) {
          if (this.board.playerCards[card].health <= 0) {
            this.board.playerCards[card].die();
          }
        }
      });
    }

    if (Object.keys(this.board.enemyCards)) {
      Object.keys(this.board.enemyCards).forEach((card) => {
        if (this.board.enemyCards[card]) {
          if (this.board.enemyCards[card].health <= 0) {
            this.board.enemyCards[card].die();
          }
        }
      });
    }
  }




  private *giveTurn() {
    if (Object.keys(this.board.playerCards)) {
      for (const card of Object.keys(this.board.playerCards)) {
        const importantCard = this.board.playerCards[card];
        if (importantCard) {
          this.makeInactive();
          if (!importantCard.death) {
            importantCard.onTurn = true;
            yield;
          }
        }
      }
    }
    if (Object.keys(this.board.enemyCards)) {
      for (const card of Object.keys(this.board.enemyCards)) {
        const importantCard = this.board.enemyCards[card];

        if (importantCard) {
          this.makeInactive();
          if (!importantCard.death) {
            importantCard.onTurn = true;
            yield;
          }
        }
      }
    }

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

  private async playTurn(component: CardComponent, attackerComponent: CardComponent, attacker: Card, defender: Card) {
    const doneChecker =  await this.changeTurn.next();
    if (!doneChecker.done) {
      if (!attacker.death) {
        if  (attacker.restCurrent >= attacker.restMax) {
          const random = Math.random();
          if (random >= defender.defense / 100) {
            await component.attackedAnimation(() => { this.attack(attacker, defender); });
          } else {
            await component.missAnimation(() => { this.attack(attacker, defender, true); });
          }
        } else {
          await attackerComponent.restAnimation(() => { this.rest(attacker); });
        }

        await this.AI();
        await this.checkDeath();
        return;
      } else {
        await this.AI();
        await this.checkDeath();
        return;
      }
    } else {
      this.changeTurn = await this.giveTurn();
      await this.changeTurn.next();
      return;
    }

  }

  private getCardPosition(card: Card) {

    if (this.board.enemyCards.cardOne === card) {
      return {key: 'cardOne', player: false };
    } else if (this.board.enemyCards.cardTwo === card) {
      return {key: 'cardTwo', player: false };
    } else if (this.board.enemyCards.cardThree === card) {
      return {key: 'cardThree', player: false };
    }

    if (this.board.playerCards.cardOne === card) {
      return {key: 'cardOne', player: true };
    } else if (this.board.playerCards.cardTwo === card) {
      return {key: 'cardTwo', player: true };
    } else if (this.board.playerCards.cardThree === card) {
      return {key: 'cardThree', player: true };
    }

    Object.keys(this.board.enemyCards).forEach((ec) => {
      if (this.board.enemyCards[ec] === card) {
        return {key: ec, player: false};
      } else {
        return {key: 'none', player: false};
      }
    });

    Object.keys(this.board.playerCards).forEach((ec) => {
      if (this.board.playerCards[ec] === card) {
        return {key: ec, player: true};
      } else {
        return {key: 'none', player: true};
      }
    });
    return {key: 'none', player: false};
  }

  private getComponentByCard(card: Card) {
    const position = this.getCardPosition(card);
    switch (position.key) {
      case 'cardOne':
        if (position.player) {
          return this.cardOnePlayer;
        } else {
          return this.cardOneEnemy;
        }
      case 'cardTwo':
          if (position.player) {
            return this.cardTwoPlayer;
          } else {
            return this.cardTwoEnemy;
          }
      case 'cardThree':
          if (position.player) {
            return this.cardThreePlayer;
          } else {
            return this.cardThreeEnemy;
          }
    }
  }

  private async AI() {
    //Repeated Code to be fixed
    const attacker = this.getActiveCard();
    const yourTurn = Object.keys(this.board.enemyCards).find((card) => {
      if (this.board.enemyCards[card] && !this.board.enemyCards[card].death) {
        return this.board.enemyCards[card] === attacker;
      }
    });

    if  (yourTurn)  {
      await delay(1000);
      const attackerComponent = this.getComponentByCard(attacker);

      if (this.board.playerCards.cardOne) {
        if (!this.board.playerCards.cardOne.death) {
          const componentToAttack = this.cardOnePlayer;
          await this.playTurn(componentToAttack, attackerComponent,  attacker, this.board.playerCards.cardOne);
          return;
        }

      }
      if (this.board.playerCards.cardTwo) {
        if (!this.board.playerCards.cardTwo.death) {
          const componentToAttack = this.cardTwoPlayer;

          await this.playTurn(componentToAttack, attackerComponent, attacker, this.board.playerCards.cardTwo);
          return;
        }

      }
      if (this.board.playerCards.cardThree) {
        if (!this.board.playerCards.cardThree.death) {
          const componentToAttack = this.cardThreePlayer;
          await this.playTurn(componentToAttack, attackerComponent, attacker, this.board.playerCards.cardThree);
          return;
        }

      }

      return;
    } else {
      return;
    }

  }


  // Public Methods

  cardClick(defender: Card, clickedComponent: CardComponent) {
    if (this.openForClicks) {
      const attacker = this.getActiveCard();
      const yourTurn = Object.keys(this.board.playerCards).find((card) => {
        return this.board.playerCards[card] === attacker;
      });
      this.openForClicks = false;
      if (yourTurn) {
        const attackerComponent = this.getComponentByCard(attacker);

        this.playTurn(clickedComponent, attackerComponent, attacker, defender).then(() => {
          this.openForClicks = true;
        });
      }
    }
  }


  ngOnInit() {
  }

}
