define(["require", "exports", "../../scripts/frame", "../../scripts/CharacterCreatorModel/characterCreatorModel"], function (require, exports, frame_1, characterCreatorModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterCreator extends frame_1.Frame {
        constructor() {
            super();
            this.attrToDisplayName = {
                "intuition": "Intuition",
                "charisma": "Charisma",
                "luck": "Luck",
                "know_law": "Knowledge Law",
                "know_money": "Knowledge Money",
                "know_religion": "Knowledge Religion",
                "know_arms": "Knowledge Arms",
                "know_logistics": "Knowledge Logistics"
            };
            this.model = new characterCreatorModel_1.CharacterCreatorModel();
        }
        static capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        genAttrWidget(attrName) {
            let displayStr = this.attrToDisplayName[attrName];
            return `<custom-spinner id="${attrName}" data-type="${displayStr}"> </custom-spinner>`;
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
            let theModel = this.model;
            $("#intuition-up").click(() => {
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
        structureFrame() {
            let frameStyle = document.getElementById("main-frame").style;
            frameStyle.display = "inline-flex";
            frameStyle.flexDirection = "column";
        }
    }
    exports.CharacterCreator = CharacterCreator;
});
//# sourceMappingURL=characterCreator.js.map