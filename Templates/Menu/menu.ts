import { Frame } from "../../scripts/frame";
import { CharacterCreator } from "../CharacterCreator/characterCreator";
export class Menu extends Frame {

    constructor() {
        super();
        this.appendChild(this.createContent());
    }

    public createContent(): HTMLElement {
        let mainMenu: HTMLElement = document.createElement("ol");
        let newGameOption: HTMLElement = document.createElement("li");
        let loadGameOption: HTMLElement = document.createElement("li");
        let aboutOption: HTMLElement = document.createElement("li");

        newGameOption.textContent = "New Game";
        newGameOption.id = "test";

        loadGameOption.textContent = "Load Game";

        aboutOption.textContent = "About";

        mainMenu.appendChild(newGameOption);
        mainMenu.appendChild(loadGameOption);
        mainMenu.appendChild(aboutOption);

        return mainMenu;
    }

    public bindings(): void {
        $("#test").click(function () {
            console.log("making character creator");
            let cc: CharacterCreator = new CharacterCreator();
            Frame.switchFrame(cc);
            cc.initializeModel();
            cc.bindings();
        });
    }

    public structureFrame(): void {
    }
}

