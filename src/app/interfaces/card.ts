
export interface Card {
    attack: number;
    health: number;
    defense: number;
    restMax: number;
    restCurrent: number;
    type?: string;
    onTurn: boolean;
    death: boolean;
    image: string;
    special: string;
    die: () => void;
    takeDamage: (dmg, attacker: Card) => void;
    beforeAttack?(target): null;
}

export function CardFactory() {
    let card: Card;
    const random = Math.random();

    if (random) {
        card = {
            attack: 10,
            health: 35,
            restMax: 1,
            defense: 15,
            restCurrent: 0,
            image: 'early_sasho',
            special: 'Младият Сашо си почива по-бързо.',
            onTurn: false,
            death: false,
            die: () => {
                card.death = true;
            },
            takeDamage(dmg, attacker: Card) {
                this.health -= dmg;
            }
        };
    } else if (random < 20 / 100) {
        card = {
            attack: 10,
            health: 25,
            restMax: 5,
            defense: 50,
            restCurrent: 0,
            image: 'interested_crunch',
            special: 'Заинтерсованата Крънч вкарва много Демидж ',
            onTurn: false,
            death: false,
            die: () => {
                card.death = true;
            },
            takeDamage(dmg, attacker: Card) {
                this.health -= dmg;
            }
        };
    } else if (random < 30 / 100) {
        card = {
            attack: 10,
            health: 25,
            restMax: 5,
            defense: 50,
            restCurrent: 0,
            image: 'masked_asen',
            special: 'Attacks',
            onTurn: false,
            death: false,
            die: () => {
                card.death = true;
            },
            takeDamage(dmg, attacker: Card) {
                this.health -= dmg;
            }
        };
    } else if (random < 40 / 100) {
        card = {
            attack: 10,
            health: 25,
            restMax: 5,
            defense: 50,
            restCurrent: 0,
            image: 'tiger_sasho',
            special: 'Attacks',
            onTurn: false,
            death: false,
            die: () => {
                card.death = true;
            },
            takeDamage(dmg, attacker: Card) {
                this.health -= dmg;
            }
        };
    } else if (random < 50 / 100) {
        card = {
            attack: 10,
            health: 25,
            restMax: 5,
            defense: 50,
            restCurrent: 0,
            image: 'school_siyana',
            special: 'Attacks',
            onTurn: false,
            death: false,
            die: () => {
                card.death = true;
            },
            takeDamage(dmg, attacker: Card) {
                this.health -= dmg;
            }
        };
    } else if (random <= 60 / 100) {
        card = {
            attack: 10,
            health: 25,
            restMax: 5,
            defense: 50,
            restCurrent: 0,
            image: 'paco_petya',
            special: 'Attacks',
            onTurn: false,
            death: false,
            die: () => {
                card.death = true;
            },
            takeDamage(dmg, attacker: Card) {
                this.health -= dmg;
            }
        };
    } else if (random <= 70 / 100) {
        card = {
            attack: 10,
            health: 25,
            restMax: 5,
            defense: 50,
            restCurrent: 0,
            image: 'queen_siyana',
            special: 'Attacks',
            onTurn: false,
            death: false,
            die: () => {
                card.death = true;
            },
            takeDamage(dmg, attacker: Card) {
                this.health -= dmg;
            }
        };
    } else if (random <= 80 / 100) {
        card = {
            attack: 10,
            health: 25,
            restMax: 5,
            defense: 50,
            restCurrent: 0,
            image: 'sea_petya',
            special: 'Attacks',
            onTurn: false,
            death: false,
            die: () => {
                card.death = true;
            },
            takeDamage(dmg, attacker: Card) {
                this.health -= dmg;
            }
        };
    } else if (random < 90 / 100) {
        card = {
            attack: 10,
            health: 25,
            restMax: 5,
            defense: 50,
            restCurrent: 0,
            image: 'sleep_asen',
            special: 'Attacks',
            onTurn: false,
            death: false,
            die: () => {
                card.death = true;
            },
            takeDamage(dmg, attacker: Card) {
                this.health -= dmg;
            }
        };
    } else if (random <= 1) {
        card = {
            attack: 10,
            health: 25,
            restMax: 5,
            defense: 50,
            restCurrent: 0,
            image: 'nature_siyana',
            special: 'Attacks',
            onTurn: false,
            death: false,
            die: () => {
                card.death = true;
            },
            takeDamage(dmg, attacker: Card) {
                this.health -= dmg;
            }
        };
    }

    return card;
}
