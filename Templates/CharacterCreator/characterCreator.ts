import { Frame } from "../../scripts/frame";

export class CharacterCreator extends Frame {
    public content(): String {
        return `
                <label for="intuition">Intuition:</label>
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
    public bindings(): void {
    }
    public structure(): String {
        throw new Error("Method not implemented.");
    }
    public style(): String {
        throw new Error("Method not implemented.");
    }

}