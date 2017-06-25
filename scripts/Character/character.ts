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
        intuition: number,
        charisma: number,
        luck: number,
        know_law: number,
        know_money: number,
        know_religion: number,
        know_arms: number,
        know_logistics: number
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
}