define(["require", "exports", "../../scripts/frame"], function (require, exports, frame_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterCreator extends frame_1.Frame {
        constructor() {
            super(...arguments);
            this.attrToDisplayName = {
                "intuition": "Intuition",
                "charisma": "Charisma",
                "luck": "Luck",
                "know_law": "Knowledge Law",
                "know_money": "Knowledge Money",
                "know_religion": "Knowledge Religion",
                "know_arms": "Knowledge Arms",
                "know_logistics": "Knowledge_Logistics"
            };
        }
        capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        genAttrWidget(attrName) {
            let displayStr = this.attrToDisplayName[attrName];
            return `
        <label for="${attrName}">${displayStr}:</label>
        <input type="number" name="${attrName}" id="${attrName}" value="0" style="width: 150px;" />
        `;
        }
        content() {
            let toReturn = this.genAttrWidget("intuition") +
                this.genAttrWidget("charisma") +
                this.genAttrWidget("luck") +
                this.genAttrWidget("know_law") +
                this.genAttrWidget("know_money") +
                this.genAttrWidget("know_religion") +
                this.genAttrWidget("know_arms") +
                this.genAttrWidget("know_logistics");
            return toReturn;
        }
        bindings() {
        }
        structure() {
            throw new Error("Method not implemented.");
        }
        style() {
            throw new Error("Method not implemented.");
        }
    }
    exports.CharacterCreator = CharacterCreator;
});
//# sourceMappingURL=characterCreator.js.map