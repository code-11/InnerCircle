define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Menu {
        static binds() {
            $("#test").click(function () {
                console.log("link!");
            });
        }
    }
    Menu.menu = `
    <ol>
        <li id='test'>New Game</li>
        <li>Load Game</li>
        <li>About</li>
    </ol>
    `;
    exports.Menu = Menu;
});
//# sourceMappingURL=menu.js.map