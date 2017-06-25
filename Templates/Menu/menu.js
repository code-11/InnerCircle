define(["require", "exports", "../../scripts/frame"], function (require, exports, frame_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Menu extends frame_1.Frame {
        content() {
            return `
    <ol>
        <li id='test'>New Game</li>
        <li>Load Game</li>
        <li>About</li>
    </ol>
    `;
        }
        bindings() {
            $("#test").click(function () {
                console.log("link!");
            });
        }
        structure() {
            throw new Error("Method not implemented.");
        }
        style() {
            throw new Error("Method not implemented.");
        }
    }
    exports.Menu = Menu;
});
//# sourceMappingURL=menu.js.map