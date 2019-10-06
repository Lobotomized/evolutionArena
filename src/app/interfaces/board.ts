import { Card } from './card';
export interface Board {
    playerCards: {
        cardOne: Card,
        cardTwo: Card,
        cardThree: Card
    };
    enemyCards: {
        cardOne: Card,
        cardTwo: Card,
        cardThree: Card
    };
}
