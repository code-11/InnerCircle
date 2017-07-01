import { Character} from "../Character/character";
export class CharacterCreatorModel {
    private base: Character;
    private points: number;
    public constructor() {
        this.base = new Character();
        this.points = 10;
    }

    private enoughPoints(decr: number = 0): boolean {
        return !(this.points - decr < 0);
    }

    private aboveZero(attr: number): boolean {
        return (attr > 0);
    }

    public getPoints(): number {
        return this.points;
    }

    public canIncrementIntuition(): boolean {
        return this.enoughPoints(1);
    }

    public canDecrementIntuition(): boolean {
        return this.aboveZero(this.base.getIntuition() - 1);
    }

    public canIncrementCharisma(): boolean {
        return this.enoughPoints(1);
    }

    public canDecrementCharisma(): boolean {
        return this.aboveZero(this.base.getCharisma() - 1);
    }

    public canIncrementLuck(): boolean {
        return this.enoughPoints(1);
    }

    public canDecrementLuck(): boolean {
        return this.aboveZero(this.base.getLuck() - 1);
    }

    public canIncrementKnowLaw(): boolean {
        return this.enoughPoints(1);
    }

    public canDecrementKnowLaw(): boolean {
        return this.aboveZero(this.base.getKnowLaw() - 1);
    }

    public canIncrementKnowMoney(): boolean {
        return this.enoughPoints(1);
    }

    public canDecrementKnowMoney(): boolean {
        return this.aboveZero(this.base.getKnowMoney() - 1);
    }

    public canIncrementKnowReligion(): boolean {
        return this.enoughPoints(1);
    }

    public canDecrementKnowReligion(): boolean {
        return this.aboveZero(this.base.getKnowReligion() - 1);
    }

    public canIncrementKnowArms(): boolean {
        return this.enoughPoints(1);
    }

    public canDecrementKnowArms(): boolean {
        return this.aboveZero(this.base.getKnowArms() - 1);
    }

    public canIncrementKnowLogistics(): boolean {
        return this.enoughPoints(1);
    }

    public canDecrementKnowLogistics(): boolean {
        return this.aboveZero(this.base.getKnowLogistics() - 1);
    }

    public decrementIntuition(): void {
        this.points += 1;
        this.base.setIntuition(this.base.getIntuition() - 1);
    }

    public incrementIntuition(): void {
        this.points -= 1;
        this.base.setIntuition(this.base.getIntuition() + 1);
    }

    public decrementCharisma(): void {
        this.points += 1;
        this.base.setCharisma(this.base.getCharisma() - 1);
    }

    public incrementCharisma(): void {
        this.points -= 1;
        this.base.setCharisma(this.base.getCharisma() + 1);
    }

    public decrementLuck(): void {
        this.points += 1;
        this.base.setLuck(this.base.getLuck() - 1);
    }

    public incrementLuck(): void {
        this.points -= 1;
        this.base.setLuck(this.base.getLuck() + 1);
    }

    public decrementKnowLaw(): void {
        this.points += 1;
        this.base.setKnowLaw(this.base.getKnowLaw() - 1);
    }

    public incrementKnowLaw(): void {
        this.points -= 1;
        this.base.setKnowLaw(this.base.getKnowLaw() + 1);
    }

    public decrementKnowMoney(): void {
        this.points += 1;
        this.base.setKnowMoney(this.base.getKnowMoney() - 1);
    }

    public incrementKnowMoney(): void {
        this.points -= 1;
        this.base.setKnowMoney(this.base.getKnowMoney() + 1);
    }

    public decrementKnowReligion(): void {
        this.points += 1;
        this.base.setKnowReligion(this.base.getKnowReligion() - 1);
    }

    public incrementKnowReligion(): void {
        this.points -= 1;
        this.base.setKnowReligion(this.base.getKnowReligion() + 1);
    }

    public decrementKnowArms(): void {
        this.points += 1;
        this.base.setKnowArms(this.base.getKnowArms() - 1);
    }

    public incrementKnowArms(): void {
        this.points -= 1;
        this.base.setKnowArms(this.base.getKnowArms() + 1);
    }

    public decrementKnowLogistics(): void {
        this.points += 1;
        this.base.setKnowLogistics(this.base.getKnowLogistics() - 1);
    }

    public incrementKnowLogistics(): void {
        this.points -= 1;
        this.base.setKnowLogistics(this.base.getKnowLogistics() + 1);
    }

    public getIntuition(): number {
        return this.base.getIntuition();
    }
}