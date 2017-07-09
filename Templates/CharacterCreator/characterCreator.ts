import { Frame } from "../../scripts/frame";
import { CharacterCreatorModel } from "../../scripts/CharacterCreatorModel/characterCreatorModel";
import { Spinner } from "../../Elements/Spinner/spinner";

interface HashTable<T> {
    [key: string]: T;
}

export class CharacterCreator extends Frame {

    private model: CharacterCreatorModel;

    private intuition: Spinner;
    private charisma: Spinner;
    private luck: Spinner;
    private know_law: Spinner;
    private know_money: Spinner;
    private know_religion: Spinner;
    private know_arms: Spinner;
    private know_logistics: Spinner;

    private charPoints: HTMLDivElement;
    private charPointsLbl: HTMLDivElement;

    private continueBtn: HTMLButtonElement;

    private box: HTMLElement;

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

    public initializeModel() {
        this.setModel(new CharacterCreatorModel());
        this.updatePoints();
    }

    private static capitalizeFirstLetter(str:string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private static attrToDisplayName: HashTable<string> = {
        "intuition": "Intuition",
        "charisma": "Charisma",
        "luck": "Luck",
        "know_law": "Knowledge Law",
        "know_money": "Knowledge Money",
        "know_religion": "Knowledge Religion",
        "know_arms": "Knowledge Arms",
        "know_logistics" : "Knowledge Logistics"
    };

    private genAttrWidget(attrName: string): Spinner {
        let displayStr: string = CharacterCreator.attrToDisplayName[attrName];
        let spinner: Spinner = new Spinner();
        spinner.id = attrName;
        spinner.setAttribute("data-type", displayStr);
        return spinner;
    }

    private initWidgets() : void {
        this.intuition = this.genAttrWidget("intuition");
        this.charisma = this.genAttrWidget("charisma");
        this.luck = this.genAttrWidget("luck");
        this.know_law = this.genAttrWidget("know_law");
        this.know_money = this.genAttrWidget("know_money");
        this.know_religion = this.genAttrWidget("know_religion");
        this.know_arms = this.genAttrWidget("know_arms");
        this.know_logistics = this.genAttrWidget("know_logistics");
    }

    private boxWidgets(): void{
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

    public setModel(newModel: CharacterCreatorModel): void {
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

    private updatePoints() {
        this.charPoints.innerText = this.model.getPoints().toString();
    }

    public bindings(): void {
        let theModel: CharacterCreatorModel = this.model;

        this.continueBtn.onclick = function () {
            if (theModel.getPoints() == 0) {
                console.log("Progressing");
            }
        }

        this.intuition.assignDown(
            () => {
                if (theModel.canDecrementIntuition()) {
                    theModel.decrementIntuition();
                    this.intuition.setValLbl(theModel.getIntuition());
                    this.updatePoints();
                }
            }
        )
        this.intuition.assignUp(
            () => {
                if (theModel.canIncrementIntuition()) {
                    theModel.incrementIntuition();
                    this.intuition.setValLbl(theModel.getIntuition());
                    this.updatePoints();
                }
            }
        )
        this.charisma.assignDown(
            () => {
                if (theModel.canDecrementCharisma()) {
                    theModel.decrementCharisma();
                    this.charisma.setValLbl(theModel.getCharisma());
                    this.updatePoints();
                }
            }
        )
        this.charisma.assignUp(
            () => {
                if (theModel.canIncrementCharisma()) {
                    theModel.incrementCharisma();
                    this.charisma.setValLbl(theModel.getCharisma());
                    this.updatePoints();
                }
            }
        )
        this.luck.assignDown(
            () => {
                if (theModel.canDecrementLuck()) {
                    theModel.decrementLuck();
                    this.luck.setValLbl(theModel.getLuck());
                    this.updatePoints();
                }
            }
        )
        this.luck.assignUp(
            () => {
                if (theModel.canIncrementLuck()) {
                    theModel.incrementLuck();
                    this.luck.setValLbl(theModel.getLuck());
                    this.updatePoints();
                }
            }
        )
        this.know_law.assignDown(
            () => {
                if (theModel.canDecrementKnowLaw()) {
                    theModel.decrementKnowLaw();
                    this.know_law.setValLbl(theModel.getKnowLaw());
                    this.updatePoints();
                }
            }
        )
        this.know_law.assignUp(
            () => {
                if (theModel.canIncrementKnowLaw()) {
                    theModel.incrementKnowLaw();
                    this.know_law.setValLbl(theModel.getKnowLaw());
                    this.updatePoints();
                }
            }
        )
        this.know_money.assignDown(
            () => {
                if (theModel.canDecrementKnowMoney()) {
                    theModel.decrementKnowMoney();
                    this.know_money.setValLbl(theModel.getKnowMoney());
                    this.updatePoints();
                }
            }
        )
        this.know_money.assignUp(
            () => {
                if (theModel.canIncrementKnowMoney()) {
                    theModel.incrementKnowMoney();
                    this.know_money.setValLbl(theModel.getKnowMoney());
                    this.updatePoints();
                }
            }
        )
        this.know_religion.assignDown(
            () => {
                if (theModel.canDecrementKnowReligion()) {
                    theModel.decrementKnowReligion();
                    this.know_religion.setValLbl(theModel.getKnowReligion());
                    this.updatePoints();
                }
            }
        )
        this.know_religion.assignUp(
            () => {
                if (theModel.canIncrementKnowReligion()) {
                    theModel.incrementKnowReligion();
                    this.know_religion.setValLbl(theModel.getKnowReligion());
                    this.updatePoints();
                }
            }
        )
        this.know_arms.assignDown(
            () => {
                if (theModel.canDecrementKnowArms()) {
                    theModel.decrementKnowArms();
                    this.know_arms.setValLbl(theModel.getKnowArms());
                    this.updatePoints();
                }
            }
        )
        this.know_arms.assignUp(
            () => {
                if (theModel.canIncrementKnowArms()) {
                    theModel.incrementKnowArms();
                    this.know_arms.setValLbl(theModel.getKnowArms());
                    this.updatePoints();
                }
            }
        )
        this.know_logistics.assignDown(
            () => {
                if (theModel.canDecrementKnowLogistics()) {
                    theModel.decrementKnowLogistics();
                    this.know_logistics.setValLbl(theModel.getKnowLogistics());
                    this.updatePoints();
                }
            }
        )
        this.know_logistics.assignUp(
            () => {
                if (theModel.canIncrementKnowLogistics()) {
                    theModel.incrementKnowLogistics();
                    this.know_logistics.setValLbl(theModel.getKnowLogistics());
                    this.updatePoints();
                }
            }
        )
    }

    public structureFrame(): void{
        let frameStyle: CSSStyleDeclaration = document.getElementById("main-frame").style;
        frameStyle.display = "inline-flex";
        frameStyle.flexDirection = "column";
    }

}