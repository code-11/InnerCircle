import * as $ from 'jquery';
import Split = require('split');
import { Menu } from '../Templates/Menu/menu';
import { Frame } from 'frame';
import { Spinner } from "../Elements/Spinner/spinner";
import { Journal } from "../Elements/Journal/journal";

export class Main {
    public static main(): void {
        let self = this;
        $(document).ready(function () {
            let mainMenu: Menu = new Menu();
            Frame.switchFrame(mainMenu);
            mainMenu.bindings();
            Split(["#main-frame", "#journal"], {
                direction: 'vertical',
                gutterSize: 8,
                cursor: 'row-resize'
            });
        });
    }
}

customElements.define("custom-spinner", Spinner);
customElements.define("custom-journal", Journal);
document.body.style.margin = "0px";
document.documentElement.style.height = "100vh";
document.body.style.height = "100vh";
document.body.style.width = "100vw";
document.body.style.position = "fixed";

let theJournal: Journal = new Journal();
document.body.appendChild(theJournal);

Main.main();
