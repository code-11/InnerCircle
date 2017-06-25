define(["require", "exports", "../../scripts/frame", "../CharacterCreator/characterCreator"], function (require, exports, frame_1, characterCreator_1) {
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
            let self = this;
            $("#test").click(function () {
                self.switchFrame(new characterCreator_1.CharacterCreator());
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