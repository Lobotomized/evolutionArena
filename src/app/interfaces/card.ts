
export interface Card {
    attack: number;
    health: number;
    restMax: number;
    restCurrent: number;
    type?: string;
    onTurn: boolean;
    death: boolean;
    image: string;
    die: () => void;
    takeDamage: (dmg, attacker: Card) => void;
    beforeAttack?(target): null;
}

export function CardFactory() {
    const card: Card = {
        attack: 10,
        health: 25,
        restMax: 5,
        restCurrent: 0,
        image: '1',
        onTurn: false,
        death: false,
        die: () => {
            card.death = true;
        },
        takeDamage(dmg, attacker: Card) {
            this.health -= dmg;
        }
    };

    return card;

}
