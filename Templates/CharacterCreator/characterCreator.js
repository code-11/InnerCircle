define(["require", "exports", "../../scripts/frame", "../../scripts/CharacterCreatorModel/characterCreatorModel", "../../Elements/Spinner/spinner", "../../Elements/Journal/journal"], function (require, exports, frame_1, characterCreatorModel_1, spinner_1, journal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterCreator extends frame_1.Frame {
        constructor() {
            super();
            this.initWidgets();
            this.boxWidgets();
            this.charPointsLbl = document.createElement("div");
            this.charPointsLbl.innerText = "Character Points: ";
            this.charPoints = document.createElement("div");
            this.continueBtn = document.createElement("button");
            this.continueBtn.innerText = "Use Character";
            this.appendChild(this.charPointsLbl);
            this.appendChild(this.charPoints);
            this.appendChild(this.box);
            this.appendChild(this.continueBtn);
        }
        initializeModel() {
            this.setModel(new characterCreatorModel_1.CharacterCreatorModel());
            this.updatePoints();
        }
        static capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        genAttrWidget(attrName) {
            let displayStr = CharacterCreator.attrToDisplayName[attrName];
            let spinner = new spinner_1.Spinner();
            spinner.id = attrName;
            spinner.setAttribute("data-type", displayStr);
            return spinner;
        }
        initWidgets() {
            this.intuition = this.genAttrWidget("intuition");
            this.charisma = this.genAttrWidget("charisma");
            this.luck = this.genAttrWidget("luck");
            this.know_law = this.genAttrWidget("know_law");
            this.know_money = this.genAttrWidget("know_money");
            this.know_religion = this.genAttrWidget("know_religion");
            this.know_arms = this.genAttrWidget("know_arms");
            this.know_logistics = this.genAttrWidget("know_logistics");
        }
        boxWidgets() {
            let box = document.createElement("div");
            box.appendChild(this.intuition);
            box.appendChild(this.charisma);
            box.appendChild(this.luck);
            box.appendChild(this.know_law);
            box.appendChild(this.know_money);
            box.appendChild(this.know_religion);
            box.appendChild(this.know_arms);
            box.appendChild(this.know_logistics);
            this.box = box;
        }
        setModel(newModel) {
            this.model = newModel;
            this.intuition.setValLbl(newModel.getIntuition());
            this.charisma.setValLbl(newModel.getCharisma());
            this.luck.setValLbl(newModel.getLuck());
            this.know_law.setValLbl(newModel.getKnowLaw());
            this.know_money.setValLbl(newModel.getKnowMoney());
            this.know_religion.setValLbl(newModel.getKnowReligion());
            this.know_arms.setValLbl(newModel.getKnowArms());
            this.know_logistics.setValLbl(newModel.getKnowLogistics());
        }
        updatePoints() {
            this.charPoints.innerText = this.model.getPoints().toString();
        }
        bindings() {
            let theModel = this.model;
            this.continueBtn.onclick = function () {
                if (theModel.getPoints() == 0) {
                    journal_1.Journal.the.log(theModel.getResult().toString());
                }
            };
            this.intuition.assignDown(() => {
                if (theModel.canDecrementIntuition()) {
                    theModel.decrementIntuition();
                    this.intuition.setValLbl(theModel.getIntuition());
                    this.updatePoints();
                }
            });
            this.intuition.assignUp(() => {
                if (theModel.canIncrementIntuition()) {
                    theModel.incrementIntuition();
                    this.intuition.setValLbl(theModel.getIntuition());
                    this.updatePoints();
                }
            });
            this.charisma.assignDown(() => {
                if (theModel.canDecrementCharisma()) {
                    theModel.decrementCharisma();
                    this.charisma.setValLbl(theModel.getCharisma());
                    this.updatePoints();
                }
            });
            this.charisma.assignUp(() => {
                if (theModel.canIncrementCharisma()) {
                    theModel.incrementCharisma();
                    this.charisma.setValLbl(theModel.getCharisma());
                    this.updatePoints();
                }
            });
            this.luck.assignDown(() => {
                if (theModel.canDecrementLuck()) {
                    theModel.decrementLuck();
                    this.luck.setValLbl(theModel.getLuck());
                    this.updatePoints();
                }
            });
            this.luck.assignUp(() => {
                if (theModel.canIncrementLuck()) {
                    theModel.incrementLuck();
                    this.luck.setValLbl(theModel.getLuck());
                    this.updatePoints();
                }
            });
            this.know_law.assignDown(() => {
                if (theModel.canDecrementKnowLaw()) {
                    theModel.decrementKnowLaw();
                    this.know_law.setValLbl(theModel.getKnowLaw());
                    this.updatePoints();
                }
            });
            this.know_law.assignUp(() => {
                if (theModel.canIncrementKnowLaw()) {
                    theModel.incrementKnowLaw();
                    this.know_law.setValLbl(theModel.getKnowLaw());
                    this.updatePoints();
                }
            });
            this.know_money.assignDown(() => {
                if (theModel.canDecrementKnowMoney()) {
                    theModel.decrementKnowMoney();
                    this.know_money.setValLbl(theModel.getKnowMoney());
                    this.updatePoints();
                }
            });
            this.know_money.assignUp(() => {
                if (theModel.canIncrementKnowMoney()) {
                    theModel.incrementKnowMoney();
                    this.know_money.setValLbl(theModel.getKnowMoney());
                    this.updatePoints();
                }
            });
            this.know_religion.assignDown(() => {
                if (theModel.canDecrementKnowReligion()) {
                    theModel.decrementKnowReligion();
                    this.know_religion.setValLbl(theModel.getKnowReligion());
                    this.updatePoints();
                }
            });
            this.know_religion.assignUp(() => {
                if (theModel.canIncrementKnowReligion()) {
                    theModel.incrementKnowReligion();
                    this.know_religion.setValLbl(theModel.getKnowReligion());
                    this.updatePoints();
                }
            });
            this.know_arms.assignDown(() => {
                if (theModel.canDecrementKnowArms()) {
                    theModel.decrementKnowArms();
                    this.know_arms.setValLbl(theModel.getKnowArms());
                    this.updatePoints();
                }
            });
            this.know_arms.assignUp(() => {
                if (theModel.canIncrementKnowArms()) {
                    theModel.incrementKnowArms();
                    this.know_arms.setValLbl(theModel.getKnowArms());
                    this.updatePoints();
                }
            });
            this.know_logistics.assignDown(() => {
                if (theModel.canDecrementKnowLogistics()) {
                    theModel.decrementKnowLogistics();
                    this.know_logistics.setValLbl(theModel.getKnowLogistics());
                    this.updatePoints();
                }
            });
            this.know_logistics.assignUp(() => {
                if (theModel.canIncrementKnowLogistics()) {
                    theModel.incrementKnowLogistics();
                    this.know_logistics.setValLbl(theModel.getKnowLogistics());
                    this.updatePoints();
                }
            });
        }
        structureFrame() {
            let frameStyle = document.getElementById("main-frame").style;
            frameStyle.display = "inline-flex";
            frameStyle.flexDirection = "column";
        }
    }
    CharacterCreator.attrToDisplayName = {
        "intuition": "Intuition",
        "charisma": "Charisma",
        "luck": "Luck",
        "know_law": "Knowledge Law",
        "know_money": "Knowledge Money",
        "know_religion": "Knowledge Religion",
        "know_arms": "Knowledge Arms",
        "know_logistics": "Knowledge Logistics"
    };
    exports.CharacterCreator = CharacterCreator;
});
//# sourceMappingURL=characterCreator.js.map