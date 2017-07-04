import { Frame } from "../../scripts/frame";
import { CharacterCreatorModel } from "../../scripts/CharacterCreatorModel/characterCreatorModel";

interface HashTable<T> {
    [key: string]: T;
}

export class CharacterCreator extends Frame {

    private model: CharacterCreatorModel;

    constructor() {
        super();
        this.model = new CharacterCreatorModel();
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

    private genAttrWidget(attrName: string): HTMLElement {
        let displayStr: string = CharacterCreator.attrToDisplayName[attrName];
        let spinner: HTMLElement = document.createElement("custom-spinner");
        spinner.id = attrName;
        spinner.setAttribute("data-type", displayStr);
        return spinner;
    }

    public createContent(): HTMLElement{
        let box = document.createElement("div");
        box.appendChild(this.genAttrWidget("intuition"));
        box.appendChild(this.genAttrWidget("charisma"));
        box.appendChild(this.genAttrWidget("luck"));
        box.appendChild(this.genAttrWidget("know_law"));
        box.appendChild(this.genAttrWidget("know_money"));
        box.appendChild(this.genAttrWidget("know_religion"));
        box.appendChild(this.genAttrWidget("know_arms"));
        box.appendChild(this.genAttrWidget("know_logistics"));
        return box;
    }

    public bindings(): void {
        let theModel: CharacterCreatorModel = this.model;
        $("#intuition-up").click(
            () => {
                if (theModel.canIncrementIntuition()) {
                    theModel.incrementIntuition();
                }
                $("#intuition-val").text(theModel.getIntuition().toString());
                console.log(theModel.getIntuition());
                console.log(theModel.getPoints());
            });
        //this.intuition.assignOnDown(
        //    () => {
        //        console.log("derp");
        //        if (theModel.canDecrementIntuition()) {
        //            theModel.decrementIntuition();
        //        }
        //    }
        //)
    }

    public structureFrame(): void{
        let frameStyle: CSSStyleDeclaration = document.getElementById("main-frame").style;
        frameStyle.display = "inline-flex";
        frameStyle.flexDirection = "column";
    }

}