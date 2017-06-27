import { Frame } from "../../scripts/frame";

interface HashTable<T> {
    [key: string]: T;
}

export class CharacterCreator extends Frame {

    private capitalizeFirstLetter(str:string) {
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

    private genAttrWidget(attrName: string) {
        let displayStr: string = this.attrToDisplayName[attrName];
        return `
        <label for="${attrName}">${displayStr}:</label>
        <input type="number" name="${attrName}" id="${attrName}" value="0" style="width: 150px;" />
        `;
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
            this.genAttrWidget("know_logistics") +
            `<custom-spinner></custom-spinner>`
        return toReturn;
    }
    public bindings(): void {
    }
    public structure(): String {
        throw new Error("Method not implemented.");
    }
    public style(): String {
        throw new Error("Method not implemented.");
    }

}