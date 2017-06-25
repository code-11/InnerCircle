import { Frame } from "../../scripts/frame";
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
        $("#test").click(function () {
            console.log("link!");
        });
    }
    public structure(): String {
        throw new Error("Method not implemented.");
    }
    public style(): String {
        throw new Error("Method not implemented.");
    }
}

