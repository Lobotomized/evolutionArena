
export interface CardInterface {
    attack: number;
    health: number;
    maxHealth: number;
    defense: number;
    restMax: number;
    restCurrent: number;
    type?: string;
    onTurn: boolean;
    death: boolean;
    image: string;
    special: string;
    moveType?: string;
    die: () => void;
    takeDamage: (dmg, attacker: Card) => void;
    beforeAttack?(target): null;
}



export class Card implements CardInterface {
    attack: number;
    health: number;
    maxHealth: number;
    defense: number;
    restMax: number;
    restCurrent: number;
    type?: string;
    onTurn: boolean;
    death: boolean;
    image: string;
    special: string;
    moveType?: string;

    takeDamage(dmg, attacker: Card) {
        this.health -= dmg;
    }

    getHealed(power: number, healer: Card = null) {
        if (this.health + power >= this.maxHealth) {

            this.health = this.maxHealth;
        } else {
            this.health += power;
        }
    }

    armorBuff(power: number, buffer: Card = null) {
        this.defense += power;
    }

    die() {
        this.death = true;
    }
    beforeAttack?(target): null;
}

export class InterestedCrunch extends Card {

    constructor() {
        super();
        this.attack = 10;
        this.health = 25;
        this.maxHealth = 45;
        this.restMax = 0;
        this.restCurrent = 0;
        this.image = 'interested_crunch';
        this.special = 'Заинтересованата Крънч лекува с интерес';
        this.moveType = 'Heal';
        this.onTurn = false;
        this.death = false;
        this.defense = 25;
    }
}


export class YoungSasho extends Card {

    constructor() {
        super();
        this.attack = 5;
        this.health = 25;
        this.maxHealth = 25;
        this.restMax = 0;
        this.restCurrent = 0;
        this.image = 'early_sasho';
        this.special = 'Младият Сашо си почива по-бързо';
        this.moveType = 'Attack';
        this.onTurn = false;
        this.death = false;
        this.defense = 25;
    }
}

export class NakedGohi extends Card {

    constructor() {
        super();
        this.attack = 25;
        this.health = 10;
        this.maxHealth = 35;
        this.restMax = 1;
        this.restCurrent = 0;
        this.image = 'naked_gohi';
        this.special = 'Голият психопат Гохи удря силно';
        this.moveType = 'Attack';
        this.onTurn = false;
        this.death = false;
        this.defense = 25;
    }
}

export class MaskedAsen extends Card {

    constructor() {
        super();
        this.attack = 20;
        this.health = 35;
        this.maxHealth = 35;
        this.restMax = 2;
        this.restCurrent = 0;
        this.image = 'masked_asen';
        this.special = 'Осама Бин Асен атакува, но не се пази';
        this.moveType = 'Attack';
        this.onTurn = false;
        this.death = false;
        this.defense = 0;
    }
}

export class NatureSyiana extends Card {

    constructor() {
        super();
        this.attack = 4;
        this.health = 25;
        this.maxHealth = 25;
        this.restMax = 0;
        this.restCurrent = 0;
        this.image = 'nature_siyana';
        this.special = 'Природната Сияна вдига защитите';
        this.moveType = 'BuffArmor';
        this.onTurn = false;
        this.death = false;
        this.defense = 25;
    }
}

export class MagicTengy extends Card {

    constructor() {
        super();
        this.attack = 15;
        this.health = 50;
        this.maxHealth = 50;
        this.restMax = 2;
        this.restCurrent = 0;
        this.image = 'magic_tengy';
        this.special = 'Магическият Тенги вдига защитите.';
        this.moveType = 'BuffArmor';
        this.onTurn = false;
        this.death = false;
        this.defense = 10;
    }
}

export class SneakyAlex extends Card {

    constructor() {
        super();
        this.attack = 10;
        this.health = 25;
        this.maxHealth = 25;
        this.restMax = 1;
        this.restCurrent = 0;
        this.image = 'sneaky_alex';
        this.special = 'Коварният Алекс не пропуска.';
        this.moveType = 'NeverMiss';
        this.onTurn = false;
        this.death = false;
        this.defense = 10;
    }
}

export function CardFactory() {
    let card: Card;
    const random = Math.random();

    if (random > 8 / 10) {
        card = new NatureSyiana();
    } else if (random > 6 / 10) {
        card = new MaskedAsen();
    } else if (random > 4 / 10) {
        card = new NakedGohi();
    } else if (random > 2 / 10) {
        card = new InterestedCrunch();
    } else {
        card = new MagicTengy();
    }
    return card;
}

export function EnemyFactory() {
    let card: Card;
    const random = Math.random();

    if (random > 7 / 10) {
        card = new YoungSasho();
    } else if (random > 4 / 10) {
        card = new MaskedAsen();
    } else {
        card = new SneakyAlex();
    }

    return card;
}

