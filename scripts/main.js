define(["require", "exports", "jquery", "split", "../Templates/Menu/menu", "frame", "../Elements/Spinner/spinner", "../Elements/Journal/journal"], function (require, exports, $, Split, menu_1, frame_1, spinner_1, journal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Main {
        static main() {
            let self = this;
            $(document).ready(function () {
                let mainMenu = new menu_1.Menu();
                frame_1.Frame.switchFrame(mainMenu);
                mainMenu.bindings();
                Split(["#main-frame", "#journal"], {
                    direction: 'vertical',
                    gutterSize: 8,
                    cursor: 'row-resize'
                });
            });
        }
    }
    exports.Main = Main;
    customElements.define("custom-spinner", spinner_1.Spinner);
    customElements.define("custom-journal", journal_1.Journal);
    document.body.style.margin = "0px";
    document.documentElement.style.height = "100vh";
    document.body.style.height = "100vh";
    document.body.style.width = "100vw";
    document.body.style.position = "fixed";
    let theJournal = new journal_1.Journal();
    document.body.appendChild(theJournal);
    Main.main();
});
//# sourceMappingURL=main.js.map