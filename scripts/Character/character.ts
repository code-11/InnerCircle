//0->untrained
//1->novice
//2->some training
//3->knowleable
//4->professional
//5->expert
export class Character {
    private intuition: number;
    private charisma: number;
    private luck: number;

    private know_law: number;
    private know_money: number;
    private know_religion: number;
    private know_arms: number;
    private know_logistics: number;

    private rank: number;
    private favor: number;
    private honor: number;
    private money: number;
    private men: number;

    public constructor(
        intuition = 0,
        charisma = 0,
        luck = 0,
        know_law = 0,
        know_money = 0,
        know_religion = 0,
        know_arms = 0,
        know_logistics = 0
    ) {
        this.intuition = intuition;
        this.charisma = charisma;
        this.luck = luck;
        this.know_law = know_law;
        this.know_money = know_money;
        this.know_religion = know_religion;
        this.know_arms = know_arms;
        this.know_logistics = know_logistics;
    }

    public getIntuition(): number {
        return this.intuition;
    }

    public getCharisma(): number {
        return this.charisma;
    }

    public getLuck(): number {
        return this.luck;
    }

    public getKnowLaw(): number {
        return this.know_law;
    }

    public getKnowMoney(): number {
        return this.know_money;
    }

    public getKnowReligion(): number {
        return this.know_religion;
    }

    public getKnowArms(): number {
        return this.know_arms;
    }

    public getKnowLogistics(): number {
        return this.know_logistics;
    }

    public setIntuition(newVal: number): void {
        this.intuition = newVal;
    }

    public setCharisma(newVal: number): void {
        this.charisma = newVal;
    }

    public setLuck(newVal: number): void {
        this.luck = newVal;
    }

    public setKnowLaw(newVal: number): void {
        this.know_law = newVal;
    }

    public setKnowMoney(newVal: number): void {
        this.know_money = newVal;
    }

    public setKnowReligion(newVal: number): void {
        this.know_religion = newVal;
    }

    public setKnowArms(newVal: number): void {
        this.know_arms = newVal;
    }

    public setKnowLogistics(newVal: number): void {
        this.know_logistics = newVal;
    }
}