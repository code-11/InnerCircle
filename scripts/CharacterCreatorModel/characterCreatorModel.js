define(["require", "exports", "../Character/character"], function (require, exports, character_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterCreatorModel {
        constructor(existingCharacter = new character_1.Character()) {
            this.base = existingCharacter;
            this.points = 10;
        }
        getResult() {
            return this.base;
        }
        enoughPoints(decr = 0) {
            return !(this.points - decr < 0);
        }
        aboveZero(attr) {
            return (attr > 0);
        }
        getPoints() {
            return this.points;
        }
        canIncrementIntuition() {
            return this.enoughPoints(1);
        }
        canDecrementIntuition() {
            return this.aboveZero(this.base.getIntuition() - 1);
        }
        canIncrementCharisma() {
            return this.enoughPoints(1);
        }
        canDecrementCharisma() {
            return this.aboveZero(this.base.getCharisma() - 1);
        }
        canIncrementLuck() {
            return this.enoughPoints(1);
        }
        canDecrementLuck() {
            return this.aboveZero(this.base.getLuck() - 1);
        }
        canIncrementKnowLaw() {
            return this.enoughPoints(1);
        }
        canDecrementKnowLaw() {
            return this.aboveZero(this.base.getKnowLaw() - 1);
        }
        canIncrementKnowMoney() {
            return this.enoughPoints(1);
        }
        canDecrementKnowMoney() {
            return this.aboveZero(this.base.getKnowMoney() - 1);
        }
        canIncrementKnowReligion() {
            return this.enoughPoints(1);
        }
        canDecrementKnowReligion() {
            return this.aboveZero(this.base.getKnowReligion() - 1);
        }
        canIncrementKnowArms() {
            return this.enoughPoints(1);
        }
        canDecrementKnowArms() {
            return this.aboveZero(this.base.getKnowArms() - 1);
        }
        canIncrementKnowLogistics() {
            return this.enoughPoints(1);
        }
        canDecrementKnowLogistics() {
            return this.aboveZero(this.base.getKnowLogistics() - 1);
        }
        decrementIntuition() {
            this.points += 1;
            this.base.setIntuition(this.base.getIntuition() - 1);
        }
        incrementIntuition() {
            this.points -= 1;
            this.base.setIntuition(this.base.getIntuition() + 1);
        }
        decrementCharisma() {
            this.points += 1;
            this.base.setCharisma(this.base.getCharisma() - 1);
        }
        incrementCharisma() {
            this.points -= 1;
            this.base.setCharisma(this.base.getCharisma() + 1);
        }
        decrementLuck() {
            this.points += 1;
            this.base.setLuck(this.base.getLuck() - 1);
        }
        incrementLuck() {
            this.points -= 1;
            this.base.setLuck(this.base.getLuck() + 1);
        }
        decrementKnowLaw() {
            this.points += 1;
            this.base.setKnowLaw(this.base.getKnowLaw() - 1);
        }
        incrementKnowLaw() {
            this.points -= 1;
            this.base.setKnowLaw(this.base.getKnowLaw() + 1);
        }
        decrementKnowMoney() {
            this.points += 1;
            this.base.setKnowMoney(this.base.getKnowMoney() - 1);
        }
        incrementKnowMoney() {
            this.points -= 1;
            this.base.setKnowMoney(this.base.getKnowMoney() + 1);
        }
        decrementKnowReligion() {
            this.points += 1;
            this.base.setKnowReligion(this.base.getKnowReligion() - 1);
        }
        incrementKnowReligion() {
            this.points -= 1;
            this.base.setKnowReligion(this.base.getKnowReligion() + 1);
        }
        decrementKnowArms() {
            this.points += 1;
            this.base.setKnowArms(this.base.getKnowArms() - 1);
        }
        incrementKnowArms() {
            this.points -= 1;
            this.base.setKnowArms(this.base.getKnowArms() + 1);
        }
        decrementKnowLogistics() {
            this.points += 1;
            this.base.setKnowLogistics(this.base.getKnowLogistics() - 1);
        }
        incrementKnowLogistics() {
            this.points -= 1;
            this.base.setKnowLogistics(this.base.getKnowLogistics() + 1);
        }
        getIntuition() {
            return this.base.getIntuition();
        }
        getCharisma() {
            return this.base.getCharisma();
        }
        getLuck() {
            return this.base.getLuck();
        }
        getKnowLaw() {
            return this.base.getKnowLaw();
        }
        getKnowMoney() {
            return this.base.getKnowMoney();
        }
        getKnowReligion() {
            return this.base.getKnowReligion();
        }
        getKnowArms() {
            return this.base.getKnowArms();
        }
        getKnowLogistics() {
            return this.base.getKnowLogistics();
        }
    }
    exports.CharacterCreatorModel = CharacterCreatorModel;
});
//# sourceMappingURL=characterCreatorModel.js.map