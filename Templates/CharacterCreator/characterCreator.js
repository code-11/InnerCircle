define(["require", "exports", "../../scripts/frame", "../../scripts/CharacterCreatorModel/characterCreatorModel"], function (require, exports, frame_1, characterCreatorModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterCreator extends frame_1.Frame {
        constructor() {
            super();
            this.model = new characterCreatorModel_1.CharacterCreatorModel();
        }
        static capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        genAttrWidget(attrName) {
            let displayStr = CharacterCreator.attrToDisplayName[attrName];
            let spinner = document.createElement("custom-spinner");
            spinner.id = attrName;
            spinner.setAttribute("data-type", displayStr);
            return spinner;
        }
        createContent() {
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