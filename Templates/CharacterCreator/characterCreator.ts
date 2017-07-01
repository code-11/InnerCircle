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

    private attrToDisplayName: HashTable<string> = {
        "intuition": "Intuition",
        "charisma": "Charisma",
        "luck": "Luck",
        "know_law": "Knowledge Law",
        "know_money": "Knowledge Money",
        "know_religion": "Knowledge Religion",
        "know_arms": "Knowledge Arms",
        "know_logistics" : "Knowledge Logistics"
    };

    private genAttrWidget(attrName: string): string {
        let displayStr: string = this.attrToDisplayName[attrName];
        return `<custom-spinner id="${attrName}" data-type="${displayStr}"> </custom-spinner>`;
    }

    public content(): String {
        let toReturn: string =
            this.genAttrWidget("intuition") +
            this.genAttrWidget("charisma") +
            this.genAttrWidget("luck") +
            this.genAttrWidget("know_law") +
            this.genAttrWidget("know_money") +
            this.genAttrWidget("know_religion") +
            this.genAttrWidget("know_arms") +
            this.genAttrWidget("know_logistics");
        return toReturn;
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