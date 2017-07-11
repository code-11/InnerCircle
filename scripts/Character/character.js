define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //0->untrained
    //1->novice
    //2->some training
    //3->knowleable
    //4->professional
    //5->expert
    class Character {
        constructor(intuition = 1, charisma = 1, luck = 1, know_law = 1, know_money = 1, know_religion = 1, know_arms = 1, know_logistics = 1) {
            this.intuition = intuition;
            this.charisma = charisma;
            this.luck = luck;
            this.know_law = know_law;
            this.know_money = know_money;
            this.know_religion = know_religion;
            this.know_arms = know_arms;
            this.know_logistics = know_logistics;
        }
        static createRandomCharacter() {
            //let toReturn: Character = new Character();
            //toReturn.
            return null;
        }
        getIntuition() {
            return this.intuition;
        }
        getCharisma() {
            return this.charisma;
        }
        getLuck() {
            return this.luck;
        }
        getKnowLaw() {
            return this.know_law;
        }
        getKnowMoney() {
            return this.know_money;
        }
        getKnowReligion() {
            return this.know_religion;
        }
        getKnowArms() {
            return this.know_arms;
        }
        getKnowLogistics() {
            return this.know_logistics;
        }
        setIntuition(newVal) {
            this.intuition = newVal;
        }
        setCharisma(newVal) {
            this.charisma = newVal;
        }
        setLuck(newVal) {
            this.luck = newVal;
        }
        setKnowLaw(newVal) {
            this.know_law = newVal;
        }
        setKnowMoney(newVal) {
            this.know_money = newVal;
        }
        setKnowReligion(newVal) {
            this.know_religion = newVal;
        }
        setKnowArms(newVal) {
            this.know_arms = newVal;
        }
        setKnowLogistics(newVal) {
            this.know_logistics = newVal;
        }
    }
    exports.Character = Character;
});
//# sourceMappingURL=character.js.map