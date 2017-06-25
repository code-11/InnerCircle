define(["require", "exports", "../../scripts/frame"], function (require, exports, frame_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterCreator extends frame_1.Frame {
        content() {
            return `<label for="intuition">Intuition:</label>
                <input type="number" name="intuition" id="intuition" value="0" style="width: 150px;" />

                <label for="charisma">Charisma:</label>
                <input type="number" name="charisma" id="charisma" value="0" style="width: 150px;" />;

                <label for="luck" > Luck:</label>
                <input type= "number" name= "luck" id= "luck" value= "0" style= "width: 150px;" />;

                <label for="know_law">Knowledge-Law:</label>
                <input type="number" name="know_law" id="know_law" value="0" style="width: 150px;" />;

                <label for="know_money" > Knowledge-Money:</label>
                <input type= "number" name= "know_money" id= "know_money" value= "0" style= "width: 150px;" />;

                <label for="know_religion">Knowledge-Religion:</label>
                <input type="number" name="know_religion" id="know_religion" value="0" style="width: 150px;" />;

                <label for="know_arms" > Knowledge-Arms:</label>
                <input type= "number" name= "know_arms" id= "know_arms" value= "0" style= "width: 150px;" />;

                <label for="know_logistics">Knowledge-Logistics:</label>
                <input type="number" name="know_logistics" id="know_logistics" value="0" style="width: 150px;" />`;
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