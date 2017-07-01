import { Frame } from "../../scripts/frame";
import { CharacterCreator } from "../CharacterCreator/characterCreator";
export class Menu extends Frame {

    public content(): String {
    return `
    <ol>
        <li id='test'>New Game</li>
        <li>Load Game</li>
        <li>About</li>
    </ol>
    `;
    }
    public bindings(): void {
        let self = this;
        $("#test").click(function () {
            self.switchFrame(new CharacterCreator());
        });
    }

    public structureFrame(): void {
    }
}

