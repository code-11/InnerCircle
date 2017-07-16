import { RandomUtils } from "../Utils/randomUtils";
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
    private fame: number;
    private money: number;
    private men: number;

    public constructor(
        intuition = 1,
        charisma = 1,
        luck = 1,
        know_law = 1,
        know_money = 1,
        know_religion = 1,
        know_arms = 1,
        know_logistics = 1
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

    public static createRandomCharacter(points: number = 10): Character {
        let scores: Array<number> = RandomUtils.constrainedAdditive(8, points);
        let toReturn: Character = new Character();
        toReturn.intuition = scores[0];
        toReturn.charisma = scores[1];
        toReturn.luck = scores[2];
        toReturn.know_law = scores[3];
        toReturn.know_money = scores[4];
        toReturn.know_religion = scores[5];
        toReturn.know_arms = scores[6];
        toReturn.know_logistics = scores[7];
        return toReturn;
    }

    public toString(): string{
        return "Intuition:" + this.intuition + "\n" +
            "Charisma:" + this.charisma + "\n" +
            "Luck:" + this.luck + "\n" +
            "Knowledge Law:" + this.know_law + "\n" +
            "Knowledge Money:" + this.know_money + "\n" +
            "Knowledge Religion:" + this.know_religion + "\n" +
            "Knowledge Arms:" + this.know_arms + "\n" +
            "Knowledge Logistics:" + this.know_logistics;
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